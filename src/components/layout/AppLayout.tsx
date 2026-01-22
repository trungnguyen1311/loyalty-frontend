import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";

export function AppLayout() {
  return (
    <div className="min-h-screen min-h-dvh flex flex-col bg-white relative overflow-hidden">
      {/* Background blur elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-blur-info rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] translate-x-1/2 -translate-y-1/2 bg-blur-primary rounded-full pointer-events-none" />

      {/* Main content area */}
      <main className="flex-1 pb-24 overflow-auto relative z-10">
        <Outlet />
      </main>

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
}
