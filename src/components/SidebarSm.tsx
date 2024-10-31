"use client";

import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ModeTogglesm } from './ui/DarkmodeSm';
import { IoMdClose } from "react-icons/io";
import { auth } from "@/config/FirebaseConfig"; 
import { User } from "firebase/auth"; 
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "@/config/FirebaseConfig"; 

export const Sidebarsm = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userInfo, setUserInfo] = useState<{ firstname: string; lastname: string } | null>(null);

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
    });

    return () => unsubscribe();
  }, []);

  // Dynamically update the links array based on authentication state
  const links = user
    ? [
        { label: "Dashboard", href: "/", icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> },
        { label: "Task Tracker", href: "/task-tracker", icon: <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> },
        { label: "Progress", href: "#", icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> },
        { label: "Team Members", href: "#", icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> },
        { label: "Messages", href: "#", icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> },
        // Logout link without an href so it won't navigate
        { 
          label: "Logout", 
          href: "#", 
          icon: <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
        },
      ]
    : [
        { label: "Dashboard", href: "/", icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> },
        { label: "Sign up", href: "/sign-up", icon: <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> },
        { label: "Sign in", href: "/sign-in", icon: <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> },
      ];

  const Logo = () => {
    return (
      <Link href="#" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
        <Image src={'/globe.svg'} alt="logo" width={50} height={50} />
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium text-black dark:text-white whitespace-pre">
        </motion.span>
      </Link>
    );
  };

  const LogoIcon = () => {
    return (
      <Link href="#" className="font-normal flex items-center text-sm text-black py-1 relative z-20">
        <Image src={'/globe.svg'} alt="logo" width={50} height={50} className="h-5 w-5" />
      </Link>
    );
  };

  return (
    <div className={cn("rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen")}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 overflow-hidden">
          <div className="flex flex-col flex-1 pt-8 overflow-y-hidden overflow-x-hidden">
            <div className="flex items-center justify-between">
              {open ? <Logo /> : <LogoIcon />}
              {open && (
                <IoMdClose
                  onClick={() => setOpen(false)}
                  className="text-black h-7 w-7 dark:text-neutral-200 cursor-pointer"
                />
              )}
            </div>
            <div className="mt-10 flex flex-col gap-2">
              {links.map((link, idx) => (
                <Link 
                  key={idx} 
                  href={link.href} 
                  className="flex items-center space-x-2"
                  onClick={link.label === "Logout" ? (e) => {
                    e.preventDefault(); // Prevent default link behavior
                    handleSignOut(); // Call the sign-out function
                  } : undefined}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="font-normal flex space-x-3.5 pb-16 items-center text-sm h-7 w-7 text-black py-1 relative z-20">
            <ModeTogglesm />
            <label className="flex-shrink-0">Switch Mode</label>
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
};
