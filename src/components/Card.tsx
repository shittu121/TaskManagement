"use client"
import { GlareCard } from "@/components/ui/glare-card";
import { GoProjectSymlink } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { ChartDashboard } from "./DashboardChart";

export function Card() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 relative gap-2 lg:gap-10 py-10">
      <GlareCard className="flex flex-col justify-center lg:px-8 lg:py-8 md:px-8 md:py-8 space-y-3 text-white">
        <div className="flex gap-2 mx-auto lg:mx-0 md:mx-0 flex-row items-center">
        <GoProjectSymlink className="h-6 w-6 text-white" />
        <h1 className="font-bold text-sm lg:text-2xl md:text-xl">Projects</h1>
        </div>
        <div className="flex items-center mx-2 lg:mx-0 md:mx-0">
        <h1 className="font-bold text-sm lg:text-2xl md:text-xl">2040</h1>
        <ChartDashboard />

        </div>

      </GlareCard>

      <GlareCard className="flex flex-col justify-center lg:px-8 lg:py-8 md:px-8 md:py-8 space-y-3 text-white">
      <div className="flex gap-2 mx-auto lg:mx-0 md:mx-0 flex-row items-center">
        <FaRegUser className="w-6 h-6 text-white" />
        <h1 className="font-bold text-sm lg:text-2xl md:text-xl">Clients</h1>
        </div>
        <div className="flex items-center mx-2 lg:mx-0 md:mx-0">
        <h1 className="font-bold text-sm lg:text-2xl md:text-xl">158</h1>
        <ChartDashboard lineColor="rgb(255, 99, 132)" />

        </div>
      </GlareCard>
      <GlareCard className="flex flex-col justify-center lg:px-8 lg:py-8 md:px-8 md:py-8 space-y-3 text-white">
      <div className="flex gap-2 mx-auto lg:mx-0 md:mx-0 flex-row items-center">
        <FaSackDollar className="w-6 h-6 text-white" />
        <h1 className="font-bold text-sm lg:text-2xl md:text-xl">Revenue</h1>
        </div>
        <div className="flex items-center mx-2 lg:mx-0 md:mx-0">
        <h1 className="font-bold text-sm lg:text-2xl md:text-xl">$75K</h1>
        <ChartDashboard lineColor="#4caf50" />

        </div>
      </GlareCard>
    </div>
  );
}
