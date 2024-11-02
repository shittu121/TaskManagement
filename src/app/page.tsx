import Auth from "@/components/Auth";
import { Card } from "@/components/Card";
import { DashboardCalendar } from "@/components/Calender";
export default function Home() {
  return (
    <div className="">
       <h1 className="text-base md:text-xl lg:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Dashboard</h1>
       <Auth />
       <div className="block lg:flex items-center gap-5">
       <Card />
       <DashboardCalendar />
       </div>

    </div>
  );
}
