import { memo, useCallback, useEffect, useState } from "react";
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

// bundle-barrel-imports: Direct imports instead of barrel

// Bootstrap component to handle /me call
const AppBootstrap = memo(() => {
  const navigate = useNavigate();
  const { fetchMe, logout, isLoading } = useAuthStore();
  // rerender-lazy-state-init: Use function for expensive initial values
  const [isInitialized, setIsInitialized] = useState(() => false);

  // rerender-defer-reads: Extract event handlers to useCallback
  const handleLogout = useCallback(() => {
    logout();
    navigate("/login", { replace: true });
  }, [logout, navigate]);

  useEffect(() => {
    // async-parallel: Start promises early, await late
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
    window.addEventListener("auth:logout", handleLogout);
    return () => window.removeEventListener("auth:logout", handleLogout);
  }, [fetchMe, logout, navigate, handleLogout]);

  // Show loading while bootstrapping
  if (!isInitialized || isLoading) {
    return (
      <div
        className="min-h-screen min-h-dvh flex items-center justify-center bg-background"
        role="status"
        aria-live="polite"
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent"
            aria-hidden="true"
          />
          <p className="text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/scan-voucher" element={<ScanVoucherPage />} />
          <Route path="/transactions/new" element={<NewTransactionPage />} />
          <Route path="/use-points" element={<UsePointsPage />} />

          {/* Manager-only routes */}
          <Route path="/transactions" element={<TransactionPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Route>

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
});

AppBootstrap.displayName = "AppBootstrap";

const App = memo(() => {
  return (
    <BrowserRouter>
      <AppBootstrap />
    </BrowserRouter>
  );
});

App.displayName = "App";

export default App;
