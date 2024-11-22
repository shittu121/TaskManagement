"use client";

import React, { useState, useEffect, useCallback } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
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
  deadline: string;
}

const Progress = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<{ firstname: string; email: string } | null>(null);

  // Fetch tasks based on user role and status
  const fetchTasks = useCallback(async (user: User | null, isAdmin: boolean) => {
    if (!user) return;

    setLoading(true);
    try {
      const taskQuery = isAdmin
        ? collection(db, "tasks") // Admin sees all tasks
        : query(
            collection(db, "tasks"),
            where("assignedTo", "array-contains", user.email)
          ); // Users see tasks assigned to them

      const querySnapshot = await getDocs(taskQuery);

      const fetchedTasks: Task[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title || "No Title",
        description: doc.data().description || "No Description",
        projectName: doc.data().projectName || "No Project",
        assignedTo: doc.data().assignedTo || [],
        status: doc.data().status || "Pending",
        createdAt: doc.data().createdAt?.toDate().toLocaleString() || "Unknown",
        createdBy: doc.data().adminAddedBy || "Unknown",
        deadline: doc.data().deadline?.toDate().toLocaleString() || "UnKnown",
      }));

      setTasks(fetchedTasks);

    //   if (fetchedTasks.length === 0) {
    //     toast.info("No tasks found.");
    //   }

    } catch (error) {
      toast.error("Error fetching tasks.");
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Check if user is an admin
  const checkIfAdmin = useCallback(async (currentUser: User | null) => {
    if (currentUser) {
      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists() && userDoc.data()?.role === "Admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      setIsAdmin(false);
    }
  }, []);

  // Update task status in Firestore and state
  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "tasks", taskId), { status: newStatus });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
      toast.success(`Task status updated to "${newStatus}"`);
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status.");
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUserInfo(userDoc.data() as { firstname: string; email: string });
        }
      } else {
        setUserInfo(null);
        setTasks([]); // Clear tasks on logout
      }
      await checkIfAdmin(currentUser);
    });
    return () => unsubscribe();
  }, [checkIfAdmin]);

  // Fetch tasks when user or admin status changes
  useEffect(() => {
    if (user && userInfo) {
      fetchTasks(user, isAdmin);
    }
  }, [user, isAdmin, userInfo, fetchTasks]);

  return (
    <div>
      <ProtectedRoute>
        <div className="w-full p-8 bg-white dark:bg-black shadow-input rounded-md">
          <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-6">
            {isAdmin ? "All Tasks Progress" : "My Tasks Progress"}
          </h2>

          {loading ? (
            <div>Loading tasks...</div>
          ) : (
            <div className="space-y-6">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-6 bg-gray-100 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 dark:bg-gray-800 rounded-lg shadow-md mb-6"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {task.title}
                    </h3>
                    <p className="text-gray-800 font-medium dark:text-gray-300">
                      Description: {task.description}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Project: {task.projectName}
                    </p>
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
                      Assigned by: {task.createdBy}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Created at: {task.createdAt}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Deadline: {task.deadline}
                    </p>
                    <div className="flex items-center my-2">
                      <label className="text-gray-600 dark:text-gray-300 mr-2">
                        Status:
                      </label>
                      <select
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                        className="border border-gray-300 rounded-md px-2 py-1 dark:bg-gray-700 dark:text-gray-300"
                      >
                        <option value="Pending">Pending</option>
                        <option value="InProgress">InProgress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
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

export default Progress;
