"use client"
import React, { useEffect, useState } from 'react'
import { auth } from "@/config/FirebaseConfig"; // Ensure you import the Firebase auth instance
import { User } from "firebase/auth"; // Import the User type from Firebase
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "@/config/FirebaseConfig"; // Import Firestore database instance


const Auth = () => {
    const [user, setUser] = useState<User | null>(null); // Set the user type to User or null
    const [userInfo, setUserInfo] = useState<{ firstname: string; lastname: string } | null>(null);

    // Sign out handler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSignOut = () => {
    auth.signOut().then(() => {
      console.log("User signed out");
      setUserInfo(null); // Clear user info on sign out
    }).catch((error) => {
      console.error("Sign out error:", error);
    });
  };

  // Listen for changes in auth state (whether user is signed in or not)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user); // User is signed in

        // Fetch user information from Firestore
        const userDoc = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
          setUserInfo(userSnap.data() as { firstname: string; lastname: string });
        } else {
          console.log("No such document!");
        }
      } else {
        setUser(null); // No user is signed in
        setUserInfo(null); // Clear user info
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="lg:hidden md:hidden">
        {user ? (
          <div className="flex items-center space-x-4">
            <h1 className="text-lg flex-shrink-0">Welcome, {userInfo?.firstname}</h1> {/* Display the user's first name */}
            
          </div>
        ) : (
          <>
           
          </>
        )}
      </div>
  )
}

export default Auth
