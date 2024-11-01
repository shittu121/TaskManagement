"use client";
import React, { useState } from 'react'
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import Togglesm from "@/components/SmToggle"
import { ModeToggle } from './ui/Darkmode'
import { SearchCommand } from '@/components/SearchCommand'





const HeaderSm = () => {
    const placeholders = [
        "What's the first rule of Fight Club?",
        "Who is Tyler Durden?",
        "Where is Andrew Laeddis Hiding?",
        "Write a Javascript method to reverse a string",
        "How to assemble your own PC?",
      ];

      const [isSearchOpen, setSearchOpen] = useState(false);
     
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
      };
      const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchOpen(true);
        console.log("submitted");
      };
  return (
    <div className='h-24 z-[1000] border flex bg-white dark:bg-[#121212] dark:border-[#353232] w-full'>
        <div className="h-[40rem] w-[16rem] px-4 mt-5">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />

            {isSearchOpen && (
              <SearchCommand
                onClose={() => setSearchOpen(false)} // Add a way to close the modal
              />
            )}
        </div>
        <div className="mt-7 sm-hidden">
          <ModeToggle />
        </div>
        <Togglesm />
    </div>
  )
}

export default HeaderSm
