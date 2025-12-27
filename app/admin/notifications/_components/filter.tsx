import SelectFilter from "@/components/filter/select-filter";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { DateRange } from "react-day-picker";

const TYPES = ["All", "Request", "Timesheets", "Employees", "System"];

const Filter = () => {
  const [filters, setFilters] = useState({
    status: "",
    type: "All",
    date: undefined as DateRange | undefined,
  });

  return (
    <div className="flex items-center justify-between gap-10">
      <div className="flex items-center gap-3">
        {TYPES.map((item) => (
          <button
            key={item}
            className={cn(
              "px-3 py-2.5 rounded-[12px] bg-white border text-sm",
              filters.type === item
                ? "border-primary-admin text-black"
                : "border-border text-body",
              item === "All" ? "min-w-[72px]" : "min-w-[100px]"
            )}
            onClick={() =>
              setFilters({
                ...filters,
                type: item,
              })
            }
          >
            {item}
          </button>
        ))}
      </div>
      <SelectFilter
        className="w-fit"
        placeholder="Sort by: Latest"
        value={filters.status}
        onChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
        options={[
          { label: "Pending", value: "pending" },
          { label: "Approved", value: "approved" },
          { label: "Rejected", value: "rejected" },
        ]}
      />
    </div>
  );
};

export default Filter;
