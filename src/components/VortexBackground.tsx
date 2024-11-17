import React from "react";
import { Vortex } from "@/components/ui/vortex"; // Ensure Vortex is imported correctly
import Link from "next/link";
// import { Global } from "./Global";

export function VortexBg() {
  return (
    <div className="w-full h-screen overflow-hidden"> {/* Changed width to full */}
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={120}
        className="flex items-center flex-col justify-center w-full py-0 my-0 h-full"
      >
        {/* <Global /> */}
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          Welcome to TaskFlow
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          TaskFlow is your go-to solution for managing projects, assigning tasks, 
          and collaborating with your team in real-time. 
          Create projects, assign tasks, track progress, and stay organized effortlessly.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <Link href="/tasks">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            Get Started
          </button>
          </Link>
        </div>
      </Vortex>
    </div>
  );
}
