// components/ProtectedRoute.tsx
"use client"; // This makes sure the component runs on the client side
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for the app router
import { auth } from "@/config/FirebaseConfig"; // Ensure you have your Firebase auth instance
import { toast } from "react-toastify"; // Import toast

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true); // User is authenticated
      } else {
        setIsAuthenticated(false); // User is not authenticated
      }
      setLoading(false); // Stop loading once we know the auth state
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return; // Don't navigate while loading

    if (isAuthenticated === false) {
      // Show toast message and redirect if not authenticated
      toast.error("You have to log in"); // Display the toast message
      router.push("/"); // Redirect to homepage
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

  return <>{isAuthenticated ? children : null}</>; // Render children if authenticated
};

export default ProtectedRoute;
