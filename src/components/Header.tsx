"use client";
import React, { useState, useEffect } from "react";
import { ModeToggle } from "./ui/Darkmode";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import Togglesm from "@/components/SmToggle";
import { SignUpModal } from "./RegisterModal";
import { LogInModal } from "./LoginModal";
import { SearchCommand } from "@/components/SearchCommand";
import { auth } from "@/config/FirebaseConfig";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import Image from "next/image"

const Header = () => {
  const placeholders = [
    "Who are my Team Members?",
    "Who is Tyler Durden?",
    "Where is Task Progress Hiding?",
    "Wanna Add Team Members",
    "Need Help?",
  ];

  const [isSearchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<{ firstname: string; lastname: string } | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchOpen(true);
    console.log("submitted");
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      console.log("User signed out");
      setUserInfo(null);
    }).catch((error) => {
      console.error("Sign out error:", error);
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const userDoc = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
          setUserInfo(userSnap.data() as { firstname: string; lastname: string });
        } else {
          console.log("No such document!");
        }
      } else {
        setUser(null);
        setUserInfo(null);
      }
      setLoading(false); // Set loading to false after checking auth state
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="dark:bg-[#121212] dark:text-white">Loading...</div>; // Optionally display a loading state
  }

  return (
    <div className="h-24 border flex justify-between bg-white dark:bg-[#121212] dark:border-[#353232] w-full">
      <Image
        src="/TaskFlow.png"
        alt="Avatar"
        height="70"
        width="70"
        className="object-cover mx-auto lg:hidden dark:text-white h-24  w-24 object-top flex-shrink-0"
      />
      <div className="h-[40rem] w-full px-4 mt-5 lg:ml">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />

        {isSearchOpen && (
          <SearchCommand onClose={() => setSearchOpen(false)} />
        )}
      </div>

      <div className="sm-hidden md:hidden lg:flex">
        {user ? (
          <div className="flex items-center space-x-4 sm-hidden">
            <h1 className="text-lg flex-shrink-0 -ml-64">Welcome, {userInfo?.firstname}</h1>
            <button
              onClick={handleSignOut}
              className="bg-red-500 dark:bg-white dark:hover:bg-red-500 dark:text-black flex-shrink-0 text-white px-4 py-2 rounded-2xl"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex sm-hidden space-x-5">
            <SignUpModal />
            <LogInModal />
          </div>
        )}
      </div>

      <div className="flex mt-7 lg:mt-0 md:mt-7">
        <ModeToggle />
      </div>

      <Togglesm />
    </div>
  );
};

export default Header;
