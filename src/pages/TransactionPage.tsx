import { useState } from "react";
import { TransactionFilters } from "@/components/transaction/transaction-filters";
import { Transaction } from "@/components/transaction/transaction-table";
import {
  TableTransaction,
  Transaction as TableTransactionItem,
} from "@/components/tables/TableTransaction";

// Mock data matching Figma design
const mockTransactions: Transaction[] = [
  {
    id: "1",
    staffName: "Megan Roberts",
    customerName: "Olsen, Heidi",
    customerEmail: "abc@gmail.com",
    bill: 100,
    currency: "€",
    date: "22 Oct 2025",
    time: "3:30 PM",
    status: "completed",
  },
  {
    id: "2",
    staffName: "Jonathan Smith",
    customerName: "Smith, John",
    customerEmail: "john.smith@gmail.com",
    bill: 100,
    currency: "€",
    date: "22 Oct 2025",
    time: "3:30 PM",
    status: "voided",
  },
  {
    id: "3",
    staffName: "Emily Johnson",
    customerName: "Johnson, Emma",
    customerEmail: "emma.johnson@yahoo.com",
    bill: 100,
    currency: "€",
    date: "22 Oct 2025",
    time: "3:30 PM",
    status: "completed",
  },
  {
    id: "4",
    staffName: "Michael Brown",
    customerName: "Brown, Michael",
    customerEmail: "michael.brown@hotmail.com",
    bill: 100,
    currency: "€",
    date: "22 Oct 2025",
    time: "3:30 PM",
    status: "completed",
  },
  {
    id: "5",
    staffName: "Sarah Davis",
    customerName: "Taylor, Olivia",
    customerEmail: "olivia.taylor@outlook.com",
    bill: 100,
    currency: "€",
    date: "22 Oct 2025",
    time: "3:30 PM",
    status: "completed",
  },
  {
    id: "6",
    staffName: "David Wilson",
    customerName: "Davis, William",
    customerEmail: "william.davis@gmail.com",
    bill: 100,
    currency: "€",
    date: "22 Oct 2025",
    time: "3:30 PM",
    status: "completed",
  },
  {
    id: "7",
    staffName: "Jessica Garcia",
    customerName: "Miller, Sophia",
    customerEmail: "sophia.miller@icloud.com",
    bill: 100,
    currency: "€",
    date: "22 Oct 2025",
    time: "3:30 PM",
    status: "completed",
  },
  {
    id: "8",
    staffName: "James Martinez",
    customerName: "Wilson, James",
    customerEmail: "james.wilson@gmail.com",
    bill: 100,
    currency: "€",
    date: "22 Oct 2025",
    time: "3:30 PM",
    status: "voided",
  },
  {
    id: "9",
    staffName: "Linda Rodriguez",
    customerName: "Moore, Ava",
    customerEmail: "ava.moore@yahoo.com",
    bill: 100,
    currency: "€",
    date: "22 Oct 2025",
    time: "3:30 PM",
    status: "voided",
  },
  {
    id: "10",
    staffName: "William Lee",
    customerName: "Taylor, Daniel",
    customerEmail: "daniel.taylor@hotmail.com",
    bill: 100,
    currency: "€",
    date: "22 Oct 2025",
    time: "3:30 PM",
    status: "voided",
  },
];

export const TransactionPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);

  const handleView = (id: string) => {
    console.log("View transaction:", id);
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
    customerName: t.customerName,
    customerEmail: t.customerEmail,
    billAmount: `${t.currency}${t.bill}`,
    date: `${t.date}, ${t.time}`,
    status: t.status === "completed" ? "Completed" : "Voiced",
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-[#0A0C11]">
          Old Table (Reference)
        </h1>
        <TransactionFilters
          onSearchChange={(value) => console.log("Search:", value)}
          onStaffChange={(value) => console.log("Staff:", value)}
          onDateRangeChange={(range) => console.log("Date range:", range)}
        />
      </div>

      <div className="pt-10 border-t border-dashed border-gray-300">
        <h1 className="text-2xl font-semibold mb-6 text-[#0A0C11]">
          New TableTransaction (Figma 1:1)
        </h1>
        <TableTransaction
          data={tableData}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleCancel}
        />
      </div>
    </div>
  );
};
