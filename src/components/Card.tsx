"use client"
import { GlareCard } from "@/components/ui/glare-card";
import { GoProjectSymlink } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { ChartDashboard } from "./DashboardChart";

export function Card() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 relative gap-y-2 lg:gap-10 py-10">
      <GlareCard className="px-5 py-8 lg:px-8 lg:py-8 md:px-8 md:py-8 space-y-3 text-white">
        <div className="flex gap-2 flex-row items-center">
        <GoProjectSymlink className="h-6 w-6 text-white" />
        <h1>Projects</h1>
        </div>
        <div className="flex items-center">
        <h1 className="font-bold text-2xl">2040</h1>
        <ChartDashboard />

        </div>

      </GlareCard>

      <GlareCard className="text-white p-8 space-y-4">
      <div className="flex gap-2 flex-row items-center">
        <FaRegUser className="w-6 h-6 text-white" />
        <h1>Clients</h1>
        </div>
        <div className="flex items-center">
        <h1 className="font-bold text-2xl">158</h1>
        <ChartDashboard lineColor="rgb(255, 99, 132)" />

        </div>
      </GlareCard>
      <GlareCard className="text-white p-8 space-y-4">
      <div className="flex gap-2 flex-row items-center">
        <FaSackDollar className="w-6 h-6 text-white" />
        <h1>Revenue</h1>
        </div>
        <div className="flex items-center">
        <h1 className="font-bold text-2xl">$75K</h1>
        <ChartDashboard lineColor="#4caf50" />

        </div>
      </GlareCard>
    </div>
  );
}
