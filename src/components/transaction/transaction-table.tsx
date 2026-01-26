import { Eye, Pencil, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./status-badge";

export interface Transaction {
  id: string;
  staffName: string;
  customerName: string;
  customerEmail: string;
  bill: number;
  currency: string;
  date: string;
  time: string;
  status: "completed" | "voided";
}

interface TransactionTableProps {
  transactions: Transaction[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onCancel?: (id: string) => void;
}

export function TransactionTable({
  transactions,
  onView,
  onEdit,
  onCancel,
}: TransactionTableProps) {
  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
            <TableHead className="h-[45px] text-muted-foreground font-medium w-[157px]">
              Staffs
            </TableHead>
            <TableHead className="h-[45px] text-muted-foreground font-medium w-[250px]">
              Customer name
            </TableHead>
            <TableHead className="h-[45px] text-muted-foreground font-medium w-[100px]">
              Bill
            </TableHead>
            <TableHead className="h-[45px] text-muted-foreground font-medium w-[180px]">
              Date
            </TableHead>
            <TableHead className="h-[45px] text-muted-foreground font-medium w-[120px]">
              Status
            </TableHead>
            <TableHead className="h-[45px] text-muted-foreground font-medium w-[120px]">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} className="h-[55px]">
              <TableCell className="font-medium">
                {transaction.staffName}
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">
                    {transaction.customerName}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {transaction.customerEmail}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {transaction.currency}
                {transaction.bill}
              </TableCell>
              <TableCell>
                {transaction.date}, {transaction.time}
              </TableCell>
              <TableCell>
                <StatusBadge status={transaction.status} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => onView?.(transaction.id)}
                    aria-label="View transaction"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => onEdit?.(transaction.id)}
                    aria-label="Edit transaction"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => onCancel?.(transaction.id)}
                    aria-label="Cancel transaction"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
