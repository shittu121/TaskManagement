"use client"
import React, { useState, useEffect, useCallback } from "react";
import { getDoc, doc } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "@/config/FirebaseConfig";
import { toast } from "react-toastify";
import { User } from "firebase/auth";
import ProtectedRoute from "@/components/ProtectedRoute";


interface Task {
  id: string;
  title: string;
  description: string;
  projectName: string;
  assignedTo: string[];
  status: string;
  createdAt: string;
  createdBy: string; // Admin's name
}

const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<{ firstname: string; email: string } | null>(null);

  // Function to fetch tasks
  const fetchTasks = useCallback(async (user: User | null, isAdmin: boolean) => {
    if (!user) {
      console.log("No user logged in");
      return;
    }

    setLoading(true);
    try {
      console.log("Fetching tasks for user:", user.email);

      const taskQuery = isAdmin
        ? query(collection(db, "tasks"), where("adminAddedBy", "==", userInfo?.firstname)) // Admin view their own tasks
        : query(collection(db, "tasks"), where("assignedTo", "array-contains", user.email)); // User sees tasks assigned to them

      const querySnapshot = await getDocs(taskQuery);
      console.log("Tasks query snapshot:", querySnapshot.empty);

      const fetchedTasks: Task[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title || "No Title",
        description: doc.data().description || "No Description",
        projectName: doc.data().projectName || "No Project",
        assignedTo: doc.data().assignedTo || [],
        status: doc.data().status || "Pending",
        createdAt: doc.data().createdAt?.toDate().toLocaleString() || "Unknown",
        createdBy: doc.data().adminAddedBy || "Unknown", // Admin's name
      }));

      console.log("Fetched tasks:", fetchedTasks);

      if (fetchedTasks.length === 0) {
        toast.info("No tasks found.");
      }

      setTasks(fetchedTasks);
    } catch (error) {
      toast.error("Error fetching tasks.");
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  }, [userInfo]); // userInfo is now a dependency

  // Check if the user is an admin when their state changes
  const checkIfAdmin = useCallback(async (currentUser: User | null) => {
    if (currentUser) {
      console.log("Checking if the user is an admin, user UID:", currentUser.uid);
      
      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        console.log("User document snapshot:", userDoc);
  
        if (!userDoc.exists()) {
          console.log("No user document found for UID:", currentUser.uid);
          setIsAdmin(false);
        } else {
          const userData = userDoc.data();
          console.log("User data fetched:", userData);
  
          if (userData?.role === "Admin") {
            setIsAdmin(true);
            console.log("User is an admin");
          } else {
            setIsAdmin(false);
            console.log("User is NOT an admin");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      setIsAdmin(false);
      console.log("No current user found");
    }
  }, []);
  

  // Listen for changes in auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      console.log("Auth state changed:", currentUser ? "User signed in" : "No user signed in");
      setUser(currentUser);

      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUserInfo(userDoc.data() as { firstname: string; email: string });
        } else {
          console.log("No user data found in Firestore for this user");
        }
      } else {
        setUserInfo(null);
        setTasks([]); // Clear tasks if user logs out
      }

      // Check if the user is an admin and fetch tasks accordingly
      await checkIfAdmin(currentUser);
    });

    return () => unsubscribe();
  }, [checkIfAdmin]); // Removed the unnecessary dependency array

  // Fetch tasks when user or isAdmin or userInfo changes
  useEffect(() => {
    if (user && userInfo) {
      console.log("Fetching tasks for user with email:", user.email); // Log email of the user
      fetchTasks(user, isAdmin);
    }
  }, [user, isAdmin, userInfo, fetchTasks]); // Added userInfo as a dependency

  return (
    <div className="">
      <ProtectedRoute>
      <div className="w-full p-8 bg-white dark:bg-black shadow-input rounded-md">
      <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-6">
        {isAdmin ? "All Tasks" : "My Tasks"}
      </h2>

      {loading ? (
        <div>Loading tasks...</div>
      ) : (
        <div className="space-y-6">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task.id}
                className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md mb-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{task.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{task.description}</p>
                <p className="text-gray-600 dark:text-gray-300">Project: {task.projectName}</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Assigned to:{" "}
                  {task.assignedTo.map((userEmail, index) => (
                    <span key={index}>
                      {userEmail}
                      {index < task.assignedTo.length - 1 && ", "}
                    </span>
                  ))}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Created by: {task.createdBy} {/* Admin's name */}
                </p>
                <p className="text-gray-600 dark:text-gray-300">Created at: {task.createdAt}</p>
              </div>
            ))
          ) : (
            <div>No tasks found for you.</div>
          )}
        </div>
      )}
      </div>
      </ProtectedRoute>
    </div>
  );
};

export default TaskPage;
