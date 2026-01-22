import { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

// bundle-barrel-imports: Direct imports instead of barrel

interface ProtectedRouteProps {
  requireManager?: boolean;
}

export const ProtectedRoute = memo(({
  requireManager = false,
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const isManager = user?.role === "manager";

  // Show nothing while loading
  if (isLoading) {
    return (
      <div 
        className="min-h-screen min-h-dvh flex items-center justify-center"
        role="status"
        aria-live="polite"
      >
        <div 
          className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" 
          aria-hidden="true"
        />
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
});

ProtectedRoute.displayName = 'ProtectedRoute';
