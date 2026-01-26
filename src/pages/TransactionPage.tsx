import { useState } from "react";
import { TransactionFilters } from "@/components/transaction/transaction-filters";
import {
  TransactionTable,
  Transaction,
} from "@/components/transaction/transaction-table";
import { TransactionPagination } from "@/components/transaction/transaction-pagination";

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

  return (
    <div className="space-y-6">
      {/* Filters */}
      <TransactionFilters
        onSearchChange={(value) => console.log("Search:", value)}
        onStaffChange={(value) => console.log("Staff:", value)}
        onDateRangeChange={(range) => console.log("Date range:", range)}
      />

      {/* Table */}
      <TransactionTable
        transactions={mockTransactions}
        onView={handleView}
        onEdit={handleEdit}
        onCancel={handleCancel}
      />

      {/* Pagination */}
      <TransactionPagination
        currentPage={currentPage}
        totalPages={10}
        resultsPerPage={resultsPerPage}
        onPageChange={setCurrentPage}
        onResultsPerPageChange={setResultsPerPage}
      />
    </div>
  );
};
