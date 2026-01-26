import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "completed" | "voided";
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium border-0 px-3 py-1",
        status === "completed" && "bg-green-50 text-green-600",
        status === "voided" && "bg-red-50 text-red-500",
        className,
      )}
    >
      {status === "completed" ? "Completed" : "Voided"}
    </Badge>
  );
}
