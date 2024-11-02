"use client"
import React, { useState } from "react";
import { navlinks } from "@/constants/navlinks";
import { Navlink } from "@/types/navlink";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { isMobile } from "@/lib/mobileUtils";
import { AnimatePresence, motion } from "framer-motion";
import { IconLayoutSidebarRightCollapse } from "@tabler/icons-react";
import Image from "next/image";
import Profile from "../../public/TaskFlow.png";

export const Sidebar = () => {
  const [open, setOpen] = useState(isMobile() ? false : true);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.2, ease: "linear" }}
            exit={{ x: -200 }}
            className="px-6  z-[100] bg-white border dark:bg-[#121212] dark:border-[#353232] py-10 max-w-[20rem] lg:w-[15rem]  fixed lg:relative  h-screen left-0 flex flex-col justify-between"
          >
            <div className="flex-1 overflow-hidden -mt-5">
              <SidebarHeader />
              <Navigation setOpen={setOpen} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className="fixed lg:hidden bottom-4 right-4 h-8 w-8 border border-neutral-200 rounded-full backdrop-blur-sm flex items-center justify-center z-50"
        onClick={() => setOpen(!open)}
      >
        <IconLayoutSidebarRightCollapse className="h-4 w-4 text-secondary" />
      </button>
    </>
  );
};

export const Navigation = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex flex-col my-10 relative z-[100] text-white">
      {navlinks.map((link: Navlink) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => isMobile() && setOpen(false)}
          className={twMerge(
            "text-black dark:text-white hover:text-gray-500 transition duration-200  flex items-center space-x-2 py-5 px-2 rounded-md text-sm",
            isActive(link.href) && "bg-gray-200 dark:text-black"
          )}
        >
          {/* Check if link.icon is defined before rendering */}
          {link.icon && (
            <link.icon
              className={twMerge(
                "h-4 w-4 flex-shrink-0",
                isActive(link.href) && "text-sky-500"
              )}
            />
          )}
          <span>{link.label}</span>
        </Link>
      ))}
    </div>
  );
};

const SidebarHeader = () => {
  return (
    <div className="flex space-x-2 z-50 -mt-5">
      <Image
        src={Profile}
        alt="Avatar"
        height="70"
        width="100"
        className="object-cover mx-auto h-32  w-32 object-top flex-shrink-0"
      />
    </div>
  );
};
