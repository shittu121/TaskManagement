import ProtectedRoute from "@/components/ProtectedRoute";
import AddTask from "@/components/AddTask";
import RequireAdmin from "@/components/AdminAuth";

export default function TaskTracker() {
    return (
      <div className="px-6 py-8">
        <ProtectedRoute>
          <RequireAdmin>
            <AddTask />
        </RequireAdmin>
         </ProtectedRoute>
      </div>
    );
  }
