/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Check, Eye, X } from "lucide-react";

export const columns = (onRefresh: () => void): ColumnDef<any>[] => [
  {
    accessorKey: "name",
    header: "Employee name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            "rounded-full px-2.5 py-[3px] font-medium text-xs w-fit",
            row.original.status === "Pending"
              ? "bg-yellow/10 text-yellow"
              : row.original.status === "Approved"
              ? "bg-green/10 text-green"
              : "bg-red/10 text-red"
          )}
        >
          {row.original.status}
        </div>
      );
    },
  },
  {
    accessorKey: "submitted",
    header: "Submitted",
  },
  {
    accessorKey: "action",
    header: () => {
      return <p className="text-center">Actions</p>;
    },
    cell: () => {
      return (
        <div className="flex items-center justify-center gap-3">
          <Eye className="size-5 cursor-pointer" />
          <Check className="size-5 cursor-pointer" />
          <X className="size-5 cursor-pointer text-red" />
        </div>
      );
    },
  },
];
