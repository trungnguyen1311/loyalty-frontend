import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { LoginPage } from "@/pages/LoginPage";
import { HomePage } from "@/pages/HomePage";
import { ScanVoucherPage } from "@/pages/ScanVoucherPage";
import { TransactionPage } from "@/pages/TransactionPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { NewTransactionPage } from "@/pages/NewTransactionPage";
import { UsePointsPage } from "@/pages/UsePointsPage";

// Bootstrap component to handle /me call
function AppBootstrap() {
  const navigate = useNavigate();
  const { fetchMe, logout, isLoading } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Bootstrap: call /me on app load
    const bootstrap = async () => {
      try {
        await fetchMe();
        // On success, user will be set and can access protected routes
      } catch {
        // On failure (401), clear auth and redirect to login
        logout();
        navigate("/login", { replace: true });
      } finally {
        setIsInitialized(true);
      }
    };

    bootstrap();

    // Listen for logout events from axios interceptor
    const handleLogout = () => {
      logout();
      navigate("/login", { replace: true });
    };

    window.addEventListener("auth:logout", handleLogout);
    return () => window.removeEventListener("auth:logout", handleLogout);
  }, [fetchMe, logout, navigate]);

  // Show loading while bootstrapping
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen min-h-dvh flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes with layout */}
      <Route element={<ProtectedRoute />}>
        {/* Full-screen routes (no bottom nav) */}
        <Route path="/scan-voucher" element={<ScanVoucherPage />} />
        <Route path="/transactions/new" element={<NewTransactionPage />} />
        <Route path="/use-points" element={<UsePointsPage />} />

        {/* Routes with AppLayout (bottom nav) */}
        <Route element={<AppLayout />}>
          <Route path="/home" element={<HomePage />} />

          {/* Manager-only routes */}
          <Route element={<ProtectedRoute requireManager />}>
            <Route path="/transactions" element={<TransactionPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Route>
      </Route>

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppBootstrap />
    </BrowserRouter>
  );
}

export default App;
