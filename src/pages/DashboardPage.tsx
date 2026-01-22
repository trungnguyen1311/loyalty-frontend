import { BarChart3 } from "lucide-react";

export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold mb-1">Dashboard</h1>
        <p className="text-muted-foreground">Thống kê cửa hàng</p>
      </div>

      {/* Empty state */}
      <div className="bg-card rounded-2xl border border-border p-8 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
          <BarChart3 className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold mb-1">Dashboard</h3>
        <p className="text-sm text-muted-foreground">
          Thống kê sẽ xuất hiện ở đây
        </p>
      </div>
    </div>
  );
}
