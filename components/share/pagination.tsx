import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";

const PaginationWithSize = ({
  totalData,
  size,
  onChangeSize,
  page,
  onChangePage,
}: {
  totalData: number;
  size: 10 | 20 | 50 | 100;
  page: number;
  onChangeSize: (size: 10 | 20 | 50 | 100) => void;
  onChangePage: (page: number) => void;
}) => {
  const totalPages = Math.ceil(totalData / size);

  const renderPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page > 2) pages.push(1, "ellipsis");
      for (
        let i = Math.max(1, page - 1);
        i <= Math.min(totalPages, page + 1);
        i++
      ) {
        pages.push(i);
      }
      if (page < totalPages - 1) pages.push("ellipsis", totalPages);
    }

    return pages.map((p, idx) =>
      p === "ellipsis" ? (
        <PaginationItem key={p + idx}>
          <PaginationEllipsis />
        </PaginationItem>
      ) : (
        <PaginationItem key={p + idx}>
          <PaginationLink
            href="#"
            className={cn(
              "size-9 text-sm shadow-none border-none",
              page !== p
                ? "text-[#989898]"
                : "text-white bg-primary-admin hover:bg-primary-admin"
            )}
            isActive={page === p}
            onClick={(e) => {
              e.preventDefault();
              onChangePage(p);
            }}
          >
            {p}
          </PaginationLink>
        </PaginationItem>
      )
    );
  };
  return (
    <div className="lg:grid lg:grid-cols-3 flex flex-wrap gap-y-4 items-center justify-between lg:py-4 mt-1 lg:mt-0">
      <div className="lg:hidden w-full h-px bg-gray-100" />
      <p className="order-1 text-sm text-gray-600">
        Total <span className="text-gray-900 font-medium">{totalData}</span>
      </p>
      <Pagination className="justify-center md:order-2 order-3 md:w-fit">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page > 1) onChangePage(page - 1);
              }}
              aria-disabled={page === 1}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page < totalPages) onChangePage(page + 1);
              }}
              aria-disabled={page === totalPages}
              className={
                page === totalPages ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className="order-2 md:order-3 flex items-center gap-3 justify-end">
        <p className="text-sm text-gray-600">Showing :</p>
        <Select
          value={String(size)}
          onValueChange={(e) => onChangeSize(Number(e) as 10 | 20 | 50 | 100)}
        >
          <SelectTrigger className="w-20">
            <SelectValue placeholder={size} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PaginationWithSize;
