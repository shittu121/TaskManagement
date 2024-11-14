"use client"; // Ensure this is a client-side hook

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { auth } from "@/config/FirebaseConfig"; // Import Firebase auth instance

const RedirectIfNotLoggedIn = () => {
  const router = useRouter(); // Use router for redirection

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // No user is logged in, redirect to the homepage
        router.push("/");
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [router]);

  // No UI rendering is needed here, just return null
  return null;
};

export default RedirectIfNotLoggedIn;
