"use client"
import React, { useState, useEffect } from "react";
import { collection, addDoc, query, where, getDocs, Timestamp, doc, getDoc } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/FirebaseConfig"; // Firebase auth config

interface User {
  uid: string;
  email: string;
  firstname: string;
}

const AddTask = () => {
  const router = useRouter();
  const [user] = useAuthState(auth); // Get the currently logged-in user (admin)
  const [adminInfo, setAdminInfo] = useState<User | null>(null); // State for admin details

  // State to hold form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectName: "",
    status: "Pending",
    deadline: "",
  });

  const [emailSearch, setEmailSearch] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch the admin (logged-in user) details from Firestore
  useEffect(() => {
    const fetchAdminDetails = async () => {
      if (user) {
        const adminDocRef = doc(db, "users", user.uid);
        const adminDocSnap = await getDoc(adminDocRef);
        if (adminDocSnap.exists()) {
          const adminData = adminDocSnap.data();
          setAdminInfo({
            uid: user.uid,
            email: adminData.email,
            firstname: adminData.firstname || "Unnamed Admin",
          });
        }
      }
    };

    fetchAdminDetails();
  }, [user]);

  // Search users by email
  const searchUsers = async () => {
    if (!emailSearch) return;
    try {
      const q = query(collection(db, "users"), where("email", "==", emailSearch));
      const querySnapshot = await getDocs(q);
      const users: User[] = querySnapshot.docs.map((doc) => ({
        uid: doc.id,
        email: doc.data().email,
        firstname: doc.data().firstname || "Unnamed",
      }));

      if (users.length === 0) {
        toast.info("No users found");
      } else {
        setSearchResults(users);
      }
    } catch (error) {
      toast.error("Error searching users");
      console.error("Error searching users:", error);
    }
  };

  // Handle user selection
  const handleUserSelect = (user: User) => {
    if (!selectedUsers.some((u) => u.uid === user.uid)) {
      setSelectedUsers((prevUsers) => [...prevUsers, user]);
    }
    setSearchResults([]);
    setEmailSearch("");
  };

  // Remove user from selected list
  const removeUser = (uid: string) => {
    setSelectedUsers((prevUsers) => prevUsers.filter((user) => user.uid !== uid));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  
    const { title, description, projectName, status, deadline } = formData;
  
    try {
      if (!title || !description || !projectName || selectedUsers.length === 0 || !deadline || !adminInfo) {
        toast.error("All fields are required.");
        setLoading(false);
        return;
      }
  
      // Parse the deadline date as Timestamp
      const deadlineTimestamp = new Date(deadline).getTime();
      const currentTimestamp = new Date().getTime();
      if (deadlineTimestamp < currentTimestamp) {
        toast.error("Deadline must be in the future.");
        setLoading(false);
        return;
      }
  
      // Prepare the assigned users list as email addresses only
      const assignedTo = selectedUsers.map((user) => user.email);
  
      // Add the task to Firestore
      await addDoc(collection(db, "tasks"), {
        title,
        description,
        assignedTo, // Storing only emails now
        projectName,
        status,
        deadline: Timestamp.fromMillis(deadlineTimestamp),
        createdAt: Timestamp.now(),
        adminAddedBy: adminInfo.firstname, // Only storing admin's name
      });
  
      toast.success("Task added successfully!");
      router.push("/tasks"); // Redirect to tasks page after adding
    } catch (error) {
      toast.error("Error adding task");
      console.error("Error adding task:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="w-full p-8 bg-white dark:bg-black shadow-input rounded-md">
      <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-6">Add New Task</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Task Title */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="title">Task Title</label>
          <Input
            id="title"
            placeholder="Task title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            disabled={loading}
          />
        </div>

        {/* Task Description */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="description">Task Description</label>
          <textarea
            id="description"
            placeholder="Task description"
            value={formData.description}
            onChange={handleInputChange}
            disabled={loading}
            className="h-10 resize-none"
          />
        </div>

        {/* Project Name */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="projectName">Project Name</label>
          <Input
            id="projectName"
            placeholder="Enter project name"
            type="text"
            value={formData.projectName}
            onChange={handleInputChange}
            disabled={loading}
          />
        </div>

        {/* Search and Add Users */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="emailSearch">Search Users by Email</label>
          <div className="flex space-x-2">
            <Input
              id="emailSearch"
              placeholder="Enter user email"
              type="text"
              value={emailSearch}
              onChange={(e) => setEmailSearch(e.target.value)}
              disabled={loading}
            />
            <button
              type="button"
              onClick={searchUsers}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              disabled={loading}
            >
              Search
            </button>
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-4">
            <h3>Search Results:</h3>
            {searchResults.map((user) => (
              <div key={user.uid} className="flex justify-between">
                <span>{user.firstname} ({user.email})</span>
                <button
                  type="button"
                  onClick={() => handleUserSelect(user)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Selected Team Members */}
        {selectedUsers.length > 0 && (
          <div className="space-y-4">
            <h3>Selected Users:</h3>
            {selectedUsers.map((user) => (
              <div key={user.uid} className="flex justify-between">
                <span>{user.firstname} ({user.email})</span>
                <button
                  type="button"
                  onClick={() => removeUser(user.uid)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Deadline Picker */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="deadline">Deadline</label>
          <input
            id="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleInputChange}
            disabled={loading}
            min={new Date().toISOString().split("T")[0]} // Prevent selecting past dates
            className="border border-neutral-300 px-4 py-2 rounded-md"
          />
        </div>

        {/* Task Status */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="status">Task Status</label>
          <select
            id="status"
            value={formData.status}
            onChange={handleInputChange}
            disabled={loading}
            className="border border-neutral-300 px-4 py-2 rounded-md"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
