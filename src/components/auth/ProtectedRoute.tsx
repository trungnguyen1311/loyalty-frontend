import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

interface ProtectedRouteProps {
  requireManager?: boolean;
}

export function ProtectedRoute({
  requireManager = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const isManager = user?.role === "manager";

  // Show nothing while loading
  if (isLoading) {
    return (
      <div className="min-h-screen min-h-dvh flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to home if manager access required but user is not manager
  if (requireManager && !isManager) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}
