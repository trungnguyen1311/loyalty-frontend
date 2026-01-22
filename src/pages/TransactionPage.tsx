import { Receipt } from "lucide-react";

export function TransactionPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold mb-1">Giao dịch</h1>
        <p className="text-muted-foreground">Quản lý danh sách giao dịch</p>
      </div>

      {/* Empty state */}
      <div className="bg-card rounded-2xl border border-border p-8 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
          <Receipt className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold mb-1">Chưa có giao dịch</h3>
        <p className="text-sm text-muted-foreground">
          Các giao dịch sẽ xuất hiện ở đây
        </p>
      </div>
    </div>
  );
}
