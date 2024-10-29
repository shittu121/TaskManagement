"use client";
import React from 'react'
import { ModeToggle } from './ui/Darkmode'
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import Headersm from "@/components/SmHeader"

const Header = () => {
    const placeholders = [
        "What's the first rule of Fight Club?",
        "Who is Tyler Durden?",
        "Where is Andrew Laeddis Hiding?",
        "Write a Javascript method to reverse a string",
        "How to assemble your own PC?",
      ];
     
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
      };
      const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted");
      };
  return (
    <div className='h-24 border flex bg-white dark:bg-[#121212] dark:border-[#353232] w-full'>
        <div className="h-[40rem] w-full px-4 mt-5">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
        </div>
        <div className="sm-hidden md:hidden lg:flex">
          <ModeToggle />
        </div>
        <Headersm />
    </div>
  )
}

export default Header
