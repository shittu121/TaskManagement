"use client"; // Ensure this is a client-side hook

import React, { ReactNode, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/config/FirebaseConfig"; // Import Firebase auth
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig"; // Import Firestore db object

interface RequireAdminProps {
  children: ReactNode;
}

const RequireAdmin = ({ children }: RequireAdminProps) => {
  const [isAdmin, setIsAdmin] = useState(false); // Track if the user is an admin
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any | null>(null); // Store user data
  const [loading, setLoading] = useState(true); // Loading state for ensuring we check auth
  const router = useRouter(); // For redirecting non-admin users

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkIfAdmin = useCallback(async (currentUser: any) => {
    if (currentUser) {
      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("Fetched user data:", userData); // Log to check the data
          
          // Check if the role is 'Admin' (case-sensitive)
          if (userData?.role === "Admin") {
            setIsAdmin(true);
            console.log("User is an Admin");
          } else {
            setIsAdmin(false);
            console.log("User is NOT an Admin");
          }
        } else {
          setIsAdmin(false);
          console.log("No user document found for UID:", currentUser.uid);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false); // Reset if no user is logged in
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser); // Update user state
      if (currentUser) {
        await checkIfAdmin(currentUser); // Check if the logged-in user is an admin
      } else {
        setIsAdmin(false); // Reset if user is not logged in
      }
      setLoading(false); // Set loading to false once auth state is checked
    });

    return () => unsubscribe();
  }, [checkIfAdmin]);

  useEffect(() => {
    if (loading) {
      // If still loading, don't attempt to redirect or render content
      return;
    }

    if (!user) {
      // If no user is logged in, redirect to the login page
      console.log("No user logged in, redirecting to login");
      router.push("/"); // Ensure the correct route for login
    } else if (!isAdmin) {
      // If the user is not an admin, redirect to not-authorized page
      console.log("User is not an admin, redirecting to not authorized");
      router.push("/unauthorized"); // Ensure the correct route for non-admin users
    }
  }, [isAdmin, user, router, loading]);

  if (loading) {
    return <div>Loading...</div>; // Optionally show a loading message until auth state is checked
  }

  if (!user || !isAdmin) {
    return null; // Do not render anything if the user is not authorized
  }

  return <>{children}</>; // Render wrapped content for admin users
};

export default RequireAdmin;
