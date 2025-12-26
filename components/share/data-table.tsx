"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import PaginationWithSize from "./pagination";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalData?: number;
  size?: 10 | 20 | 50 | 100;
  page?: number;
  onChangeSize?: (size: 10 | 20 | 50 | 100) => void;
  onChangePage?: (page: number) => void;
  noDataCustomUI?: React.ReactNode;
  isPagination?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalData,
  size,
  onChangeSize,
  page,
  onChangePage,
  noDataCustomUI,
  isPagination = true,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const hasData = table.getRowModel().rows?.length > 0;
  const rows = table.getRowModel().rows;

  return (
    <div className="overflow-hidden rounded-xl bg-white py-2">
      <Table className="rounded-xl border-separate border-spacing-0">
        {table.getRowModel().rows?.length > 0 && (
          <TableHeader className="bg-[#fafafa] border-[#EFEFEF] text-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="rounded-xl text-sm ">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="px-4 text-sm border-t border-b first:border-l last:border-r border-[#EFEFEF] first:rounded-tl-xl last:rounded-tr-xl"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
        )}
        <TableBody>
          {table.getRowModel().rows?.length ? (
            rows.map((row, rowIndex) => {
              const isLastRow = rowIndex === rows.length - 1;

              return (
                <TableRow key={row.id} className="h-[60px]">
                  {row.getVisibleCells().map((cell, cellIndex) => {
                    const isFirstCell = cellIndex === 0;
                    const isLastCell =
                      cellIndex === row.getVisibleCells().length - 1;

                    return (
                      <TableCell
                        key={cell.id}
                        style={{ width: cell.column.getSize() }}
                        className={cn(
                          "text-sm text-[#292929] border-b border-[#F5F5F5] px-4",
                          isFirstCell && "border-l",
                          isLastCell && "border-r",
                          isLastRow && isFirstCell && "rounded-bl-xl",
                          isLastRow && isLastCell && "rounded-br-xl"
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {noDataCustomUI ?? "No results."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isPagination && hasData && (
        <PaginationWithSize
          totalData={totalData as number}
          size={size as 10 | 20 | 50 | 100}
          page={page as number}
          onChangeSize={onChangeSize as (size: 10 | 20 | 50 | 100) => void}
          onChangePage={onChangePage as (page: number) => void}
        />
      )}
    </div>
  );
}
