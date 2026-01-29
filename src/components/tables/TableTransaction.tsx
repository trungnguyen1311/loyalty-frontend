import { Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Transaction {
  id: string;
  staffName: string;
  customerName: string;
  customerEmail: string;
  billAmount: string;
  date: string;
  status: "Completed" | "Voided";
}

interface TableTransactionProps {
  data: Transaction[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function TableTransaction({
  data,
  onView,
  onEdit,
  onDelete,
}: TableTransactionProps) {
  return (
    <div className="w-full space-y-4">
      <div className="rounded-md border border-[#E5E7EB] overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-[#F9FAFB]">
            <TableRow>
              <TableHead className="py-3 px-4 font-medium text-[#0A0C11] text-sm">
                Staffs
              </TableHead>
              <TableHead className="py-3 px-4 font-medium text-[#0A0C11] text-sm">
                Customer name
              </TableHead>
              <TableHead className="py-3 px-4 font-medium text-[#0A0C11] text-sm">
                Bill
              </TableHead>
              <TableHead className="py-3 px-4 font-medium text-[#0A0C11] text-sm">
                Date
              </TableHead>
              <TableHead className="py-3 px-4 font-medium text-[#0A0C11] text-sm">
                Status
              </TableHead>
              <TableHead className="py-3 px-4 font-medium text-[#0A0C11] text-sm text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="py-4 px-4 text-sm text-[#0A0C11] h-[55px]">
                  {item.staffName}
                </TableCell>
                <TableCell className="py-2 px-4 h-[55px]">
                  <div className="flex flex-col">
                    <span className="text-sm font-normal text-[#0A0C11]">
                      {item.customerName}
                    </span>
                    <span className="text-sm font-normal text-[#5B616D]">
                      {item.customerEmail}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-4 text-sm text-[#0A0C11] font-normal h-[55px]">
                  {item.billAmount}
                </TableCell>
                <TableCell className="py-4 px-4 text-sm text-[#0A0C11] font-normal h-[55px]">
                  {item.date}
                </TableCell>
                <TableCell className="py-4 px-4 h-[55px]">
                  <Badge
                    variant="outline"
                    className={cn(
                      "font-medium px-2 py-1 h-6 rounded-lg border-0 shadow-none",
                      item.status === "Completed"
                        ? "bg-surfaceSuccessBaseEmAlpha text-outlineSuccessHighEm hover:bg-surfaceSuccessBaseEmAlpha"
                        : "bg-[#ED4030]/15 text-[#DF2917] hover:bg-[#ED4030]/25",
                    )}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 px-4 h-[55px]">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8 rounded-lg border-[#0000000F] shadow-sm bg-white hover:bg-gray-50 p-1.5"
                      onClick={() => onView?.(item.id)}
                    >
                      <Eye className="size-4 text-[#5B616D]" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8 rounded-lg border-[#0000000F] shadow-sm bg-white hover:bg-gray-50 p-1.5"
                      onClick={() => onEdit?.(item.id)}
                    >
                      <Pencil className="size-4 text-[#5B616D]" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8 rounded-lg border-[#0000000F] shadow-sm bg-white hover:bg-gray-50 p-1.5"
                      onClick={() => onDelete?.(item.id)}
                    >
                      <Trash2 className="size-4 text-[#5B616D]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between border-t border-[#00000008] pt-3 px-4">
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="icon"
            className="size-8 rounded-lg border-[#0000000F] shadow-sm bg-white hover:bg-gray-50"
          >
            <ChevronLeft className="size-4 text-[#5B616D]" />
          </Button>
          <div className="flex items-center gap-1">
            <Button
              variant="secondary"
              className="size-8 p-0 text-sm font-medium bg-[#F2F2F4CC] text-[#0A0C11] rounded-lg border-0"
            >
              1
            </Button>
            <Button
              variant="ghost"
              className="size-8 p-0 text-sm font-medium text-[#5B616D] hover:bg-gray-50 rounded-lg"
            >
              2
            </Button>
            <Button
              variant="ghost"
              className="size-8 p-0 text-sm font-medium text-[#5B616D] hover:bg-gray-50 rounded-lg"
            >
              3
            </Button>
            <Button
              variant="ghost"
              className="size-8 p-0 text-sm font-medium text-[#5B616D] hover:bg-gray-50 rounded-lg"
            >
              4
            </Button>
            <Button
              variant="ghost"
              className="size-8 p-0 text-sm font-medium text-[#5B616D] hover:bg-gray-50 rounded-lg"
            >
              5
            </Button>
            <span className="px-1 text-[#5B616D]">...</span>
            <Button
              variant="ghost"
              className="size-8 p-0 text-sm font-medium text-[#5B616D] hover:bg-gray-50 rounded-lg"
            >
              10
            </Button>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="size-8 rounded-lg border-[#0000000F] shadow-sm bg-white hover:bg-gray-50"
          >
            <ChevronRight className="size-4 text-[#5B616D]" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#8C929C]">Results per page:</span>
          <select className="text-sm font-medium bg-white border border-[#0000000F] rounded-lg px-2 py-1 outline-none shadow-sm cursor-pointer hover:bg-gray-50">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
      </div>
    </div>
  );
}
