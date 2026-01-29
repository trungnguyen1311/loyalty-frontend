import { useState } from "react";
import { TransactionFilters } from "@/components/transaction/transaction-filters";
import {
  TableTransaction,
  Transaction as TableTransactionItem,
} from "@/components/tables/TableTransaction";
import { CardTransaction } from "@/components/transactions/CardTransaction";
import { TransactionDetailsDialog } from "@/components/dialogs/TransactionDetailsDialog";
import { VoidTransactionDialog } from "@/components/dialogs/VoidTransactionDialog";

// Unified mock data type for better consistency across components
export interface MockTransaction {
  id: string;
  staffName: string;
  customer: {
    name: string;
    email: string;
    level: "Gold" | "Silver" | "Bronze";
    points: string;
    avatarUrl?: string;
  };
  bill: {
    amount: number;
    currency: string;
  };
  voucher?: string;
  pointsEarned: string;
  pointsSpent: string;
  date: string;
  time: string;
  status: "completed" | "voided";
  editHistory?: {
    reason: string;
    description: string;
    updatedBy: string;
    date: string;
  };
}

// Mock data matching Figma design
const mockTransactions: MockTransaction[] = [
  {
    id: "1",
    staffName: "Megan Roberts",
    customer: {
      name: "Olsen, Heidi",
      email: "abc@gmail.com",
      level: "Gold",
      points: "2,500",
      avatarUrl: "https://i.pravatar.cc/150?u=heidi",
    },
    bill: { amount: 100, currency: "€" },
    voucher: "15%",
    pointsEarned: "+2",
    pointsSpent: "-10",
    date: "22 Oct 2025",
    time: "3:30 PM",
    status: "completed",
  },
  {
    id: "2",
    staffName: "Jonathan Smith",
    customer: {
      name: "Smith, John",
      email: "john.smith@gmail.com",
      level: "Silver",
      points: "1,200",
    },
    bill: { amount: 100, currency: "€" },
    pointsEarned: "+2",
    pointsSpent: "0",
    date: "22 Oct 2025",
    time: "3:30 PM",
    status: "completed",
    editHistory: {
      reason: "Incorrect Bill Amount",
      description: "Change bill value from €110 to €100",
      updatedBy: "David Johnson",
      date: "22 Oct 2025, 3:40 PM",
    },
  },
  {
    id: "3",
    staffName: "Emily Johnson",
    customer: {
      name: "Johnson, Emma",
      email: "emma.johnson@yahoo.com",
      level: "Bronze",
      points: "500",
    },
    bill: { amount: 100, currency: "€" },
    pointsEarned: "+2",
    pointsSpent: "-10",
    date: "22 Oct 2025",
    time: "3:30 PM",
    status: "voided",
  },
];

export const TransactionPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isVoidOpen, setIsVoidOpen] = useState(false);
  const [selectedTxId, setSelectedTxId] = useState<string | null>(null);

  const selectedTransaction = mockTransactions.find(
    (t) => t.id === selectedTxId,
  );

  const handleView = (id: string) => {
    setSelectedTxId(id);
    setIsDetailsOpen(true);
  };

  const handleEdit = (id: string) => {
    console.log("Edit transaction:", id);
  };

  const handleCancel = (id: string) => {
    console.log("Cancel transaction:", id);
  };

  // Map to format expected by the new TableTransaction
  const tableData: TableTransactionItem[] = mockTransactions.map((t) => ({
    id: t.id,
    staffName: t.staffName,
    customerName: t.customer.name,
    customerEmail: t.customer.email,
    billAmount: `${t.bill.currency}${t.bill.amount}`,
    date: `${t.date}, ${t.time}`,
    status: t.status === "completed" ? "Completed" : "Voided",
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <TransactionFilters
          onSearchChange={(value) => console.log("Search:", value)}
          onStaffChange={(value) => console.log("Staff:", value)}
          onDateRangeChange={(range) => console.log("Date range:", range)}
        />
      </div>

      {/* Desktop: Show Table */}
      <div className="hidden md:block mt-5">
        <TableTransaction
          data={tableData}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleCancel}
        />
      </div>

      {/* Mobile: Show Cards */}
      <div className="flex flex-col gap-3 md:hidden mt-5">
        {tableData.map((transaction) => (
          <CardTransaction
            key={transaction.id}
            data={transaction}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleCancel}
          />
        ))}
      </div>

      <TransactionDetailsDialog
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        onEdit={() => {
          console.log("Edit from dialog:", selectedTxId);
          setIsDetailsOpen(false);
        }}
        onVoid={() => {
          setIsDetailsOpen(false);
          setIsVoidOpen(true);
        }}
        transactionData={selectedTransaction}
      />

      <VoidTransactionDialog
        open={isVoidOpen}
        onOpenChange={setIsVoidOpen}
        onConfirm={() => {
          console.log("Confirmed void for:", selectedTxId);
          // Add actual void logic here
          setIsVoidOpen(false);
        }}
        customerName={selectedTransaction?.customer.name}
      />
    </div>
  );
};
