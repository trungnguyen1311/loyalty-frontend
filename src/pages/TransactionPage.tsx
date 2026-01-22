import { Receipt } from "lucide-react";

// bundle-barrel-imports: Direct imports instead of barrel

export const TransactionPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <section>
        <h1 className="text-xl font-bold mb-1">Giao dịch</h1>
        <p className="text-muted-foreground">Quản lý danh sách giao dịch</p>
      </section>

      {/* Empty state */}
      <section className="bg-card rounded-2xl border border-border p-8 flex flex-col items-center justify-center text-center" role="status" aria-live="polite">
        <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
          <Receipt className="w-8 h-8 text-muted-foreground" aria-hidden="true" />
        </div>
        <h2 className="font-semibold mb-1">Chưa có giao dịch</h2>
        <p className="text-sm text-muted-foreground">
          Các giao dịch sẽ xuất hiện ở đây
        </p>
      </section>
    </div>
  );
};

// No displayName needed for regular function component
