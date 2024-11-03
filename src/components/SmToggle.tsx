import React, { useState, useEffect } from "react";
import { FiAlignJustify, FiLogIn, FiUserPlus, FiLogOut } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { navlinks } from "@/constants/navlinks";
import { Navlink } from "@/types/navlink";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { auth } from "@/config/FirebaseConfig"; // Import Firebase auth
import { onAuthStateChanged, signOut } from "firebase/auth";

const Togglesm = () => {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null); // State to manage the authenticated user
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // User is signed in
      } else {
        setUser(null); // No user is signed in
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="lg:hidden mx-4">
      <div className="flex md:mx-5 py-4 text-sm items-center justify-between">
        {/* Mobile Toggle Button */}
        <div className="cursor-pointer mt-5" onClick={handleToggle}>
          {isOpen ? (
            <IoMdClose className="h-7 w-7 dark:text-white" />
          ) : (
            <FiAlignJustify className="h-7 w-7" />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <ul
        className={`transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } fixed top-0 right-0 h-full w-3/4 bg-white text-sm dark:bg-neutral-800 shadow-lg flex flex-col items-center py-20 px-10 space-y-4 z-[100]`}
      >
        <IoMdClose onClick={handleToggle} className="h-8 w-8 fixed top-5 right-5" />

        {navlinks.map((link: Navlink) => (
          <li key={link.href} className="w-full">
            <Link
              href={link.href}
              onClick={handleToggle} // Close modal on nav link click
              className={twMerge(
                "flex items-center gap-4 text-lg font-medium text-black dark:text-white hover:text-blue-500 dark:hover:text-gray-400",
                isActive(link.href) && "text-blue-500 dark:text-sky-500"
              )}
            >
              {link.icon && (
                <link.icon
                  size={24}
                  className={twMerge(
                    "flex-shrink-0 h-[24px] w-[24px]",
                    isActive(link.href) && "text-sky-500 text-sm dark:text-sky-500"
                  )}
                />
              )}
              {link.label}
            </Link>
          </li>
        ))}

        {/* Authentication Links */}
        <li className="w-full">
          {user ? (
            <button
              onClick={handleLogout}
              className={twMerge(
                "flex items-center gap-4 text-lg font-medium text-black dark:text-white hover:text-red-500 dark:hover:text-red-400 w-full"
              )}
            >
              <FiLogOut size={24} />
              Logout
            </button>
          ) : (
            <div className="space-y-4">
              <Link
                href="/sign-in"
                onClick={handleToggle}
                className={twMerge(
                  "flex items-center gap-4 text-lg font-medium text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-400 w-full",
                  isActive("/sign-in") && "text-blue-500 dark:text-sky-500"
                )}
              >
                <FiLogIn size={24} />
                Sign In
              </Link>
              <Link
                href="/sign-up"
                onClick={handleToggle}
                className={twMerge(
                  "flex items-center gap-4 text-lg font-medium text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-400 w-full",
                  isActive("/sign-up") && "text-blue-500 dark:text-sky-500"
                )}
              >
                <FiUserPlus size={24} />
                Sign Up
              </Link>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Togglesm;
