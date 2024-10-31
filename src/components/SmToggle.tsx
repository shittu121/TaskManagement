import React, { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { navlinks } from "@/constants/navlinks";
import { Navlink } from "@/types/navlink";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { twMerge } from "tailwind-merge";


const Togglesm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="lg:hidden z-[100]">
      <div className="flex md:mx-5 py-4 items-center justify-between">

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
        } fixed top-0 right-0 h-full w-3/4 bg-white dark:bg-neutral-800 shadow-lg flex flex-col items-center py-20 px-10 space-y-4 z-[100]`}
      >
        <IoMdClose onClick={handleToggle} className="h-8 w-8 fixed top-5 right-5" />

        {navlinks.map((link: Navlink) => (
          <li key={link.href} className="w-full">
            <Link
              href={link.href}
              onClick={handleToggle} // Close modal on nav link click
              className={twMerge(
                "flex items-center gap-4 text-xl font-medium text-black dark:text-white hover:text-blue-500 dark:hover:text-gray-400",
                isActive(link.href) && "text-blue-500 dark:text-sky-500"
              )}
            >
              {/* Use icon as a React component */}
              {link.icon && <link.icon
                size={26}
                className={twMerge(
                  "flex-shrink-0 h-[26px] w-[26px]",
                  isActive(link.href) && "text-sky-500 dark:text-sky-500"
                )}
              />}
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Togglesm;
