import ProtectedRoute from "@/components/ProtectedRoute";

export default function TaskTracker() {
    return (
      <div className="px-6 py-8">
        <ProtectedRoute>
         Task Tracker
         </ProtectedRoute>
      </div>
    );
  }
