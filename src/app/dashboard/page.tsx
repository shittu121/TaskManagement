import Auth from "@/components/Auth";
import { Card } from "@/components/Card";
import { DashboardCalendar } from "@/components/Calender";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  return (
    <div className="py-8">
      <ProtectedRoute>
       <h1 className="text-xl md:text-2xl lg:text-4xl px-6 font-semibold">Dashboard</h1>
       <div className="px-6">
         <Auth />
       </div>
       <div className="px-6">
         <Card />
       </div>
       <div className="px-6">
       <DashboardCalendar />
       </div>
      </ProtectedRoute>
    </div>
  );
}
