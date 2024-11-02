import Auth from "@/components/Auth";
import { Card } from "@/components/Card";
import { DashboardCalendar } from "@/components/Calender";
export default function Home() {
  return (
    <div className="py-8 mx-10">
       <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold">Dashboard</h1>
       <Auth />
       <div className="">
       <Card />
       <DashboardCalendar />
       </div>

    </div>
  );
}
