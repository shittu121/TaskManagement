"use client";
import React from 'react'
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import Togglesm from "@/components/SmToggle"
import { ModeToggle } from './ui/Darkmode'




const HeaderSm = () => {
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
    <div className='h-24 border flex z-[9999] bg-white dark:bg-[#121212] dark:border-[#353232] w-full'>
        <div className="h-[40rem] px-4 mt-5">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
        </div>
        <div className="mt-7 sm-hidden">
          <ModeToggle />
        </div>
        <Togglesm />
    </div>
  )
}

export default HeaderSm
