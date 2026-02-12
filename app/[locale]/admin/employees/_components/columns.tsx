/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { MoreHorizontalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const columns = (onRefresh: () => void): ColumnDef<any>[] => [
  {
    accessorKey: "name",
    header: "Employee name",
    cell: ({ row }) => {
      return (
        <Link
          href={`/admin/employees/${row.original.id}`}
          className="hover:underline"
        >
          {row.original.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            "rounded-full px-2.5 py-[3px] font-medium text-xs w-fit",
            row.original.status === "Active"
              ? "bg-green/10 text-green"
              : "bg-[#F1F3F6] text-black"
          )}
        >
          {row.original.status}
        </div>
      );
    },
  },
  {
    accessorKey: "date_joined",
    header: "Date Joined",
  },
  {
    accessorKey: "action",
    header: () => {
      return <p className="text-center">Actions</p>;
    },
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="flex items-center justify-center"
          >
            <Button
              variant="outline-admin"
              size="icon"
              aria-label="More Options"
              className="mx-auto"
            >
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuGroup>
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit employee</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Deactive employee</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
