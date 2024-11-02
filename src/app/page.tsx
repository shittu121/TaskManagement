import Auth from "@/components/Auth";
import { Card } from "@/components/Card";
import { DashboardCalendar } from "@/components/Calender";
export default function Home() {
  return (
    <div className="py-8 pl-8 lg:pl-0 md:pl-0 mx-0 lg:mx-6 md:mx-6">
       <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold">Dashboard</h1>
       <Auth />
       <Card />
       <div className="px-4">
       <DashboardCalendar />
       </div>

    </div>
  );
}
