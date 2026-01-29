import { memo, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import { BottomNav } from "./BottomNav";
import { Header } from "./Header";
import styles from "./AppLayout.module.scss";

// List of routes that should be full width
const FULL_WIDTH_ROUTES = ["/dashboard", "/transactions"];

export const AppLayout = memo(() => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  // Check if current path starts with any of the full-width routes
  const isFullWidth = useMemo(() => {
    return FULL_WIDTH_ROUTES.some((route) =>
      location.pathname.startsWith(route),
    );
  }, [location.pathname]);

  // Common container class to sync Header and Content
  const containerClass = isFullWidth
    ? "max-w-full px-4 md:px-10"
    : "max-w-[830px] mx-auto w-full px-4 md:px-10";

  return (
    <div className={cn(styles["app-layout"], "pt-[72px]")}>
      {/* Header */}
      <Header containerClass={containerClass} />

      {/* Main content area */}
      <main
        className={cn(
          styles["main-content"],
          containerClass,
          !isAuthenticated && "pb-0", // Remove bottom padding if no BottomNav
        )}
        role="main"
      >
        <Outlet />
      </main>

      {/* Bottom navigation - Only show when authenticated */}
      {isAuthenticated && <BottomNav />}
    </div>
  );
});

AppLayout.displayName = "AppLayout";
