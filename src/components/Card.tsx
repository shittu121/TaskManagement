"use client"
import { GlareCard } from "@/components/ui/glare-card";

export function Card() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 relative gap-10 lg:gap-10 py-10">
      <GlareCard className="p-8 space-y-4 text-white">
        <div className="flex gap-2 flex-row items-center">
        <svg
          width="66"
          height="65"
          viewBox="0 0 66 65"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
        >
          <path
            d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
            stroke="currentColor"
            strokeWidth="15"
            strokeMiterlimit="3.86874"
            strokeLinecap="round"
          />
        </svg>
        <h1>Projects</h1>
        </div>
        <h1 className="font-bold text-2xl">2040</h1>
      </GlareCard>
      <GlareCard className="text-white p-8 space-y-4">
      <div className="flex gap-2 flex-row items-center">
        <svg
          width="66"
          height="65"
          viewBox="0 0 66 65"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
        >
          <path
            d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
            stroke="currentColor"
            strokeWidth="15"
            strokeMiterlimit="3.86874"
            strokeLinecap="round"
          />
        </svg>
        <h1>Clients</h1>
        </div>
        <h1 className="font-bold text-2xl">158</h1>
      </GlareCard>
      <GlareCard className="text-white p-8 space-y-4">
      <div className="flex gap-2 flex-row items-center">
        <svg
          width="66"
          height="65"
          viewBox="0 0 66 65"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
        >
          <path
            d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
            stroke="currentColor"
            strokeWidth="15"
            strokeMiterlimit="3.86874"
            strokeLinecap="round"
          />
        </svg>
        <h1>Revenue</h1>
        </div>
        <h1 className="font-bold text-2xl">$75K</h1>
      </GlareCard>
    </div>
  );
}
