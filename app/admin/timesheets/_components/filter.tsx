import DateRangeFilter from "@/components/filter/date-range";
import SelectFilter from "@/components/filter/select-filter";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

const Filter = () => {
  const [filters, setFilters] = useState({
    status: "",
    type: "",
    date: undefined as DateRange | undefined,
  });

  return (
    <div className="flex items-center justify-between gap-10">
      <InputGroup className="border-border shadow-none h-10">
        <InputGroupInput
          placeholder="Search employees..."
          className="w-[335px]"
        />
        <InputGroupAddon>
          <Search className="size-5" />
        </InputGroupAddon>
      </InputGroup>
      <div className="flex items-center gap-3">
        <SelectFilter
          className="w-[120px]"
          placeholder="All Status"
          value={filters.status}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, status: value }))
          }
          options={[
            { label: "Pending", value: "pending" },
            { label: "Approved", value: "approved" },
            { label: "Rejected", value: "rejected" },
          ]}
        />
        <DateRangeFilter
          value={filters.date}
          onChange={(date) => setFilters((prev) => ({ ...prev, date }))}
        />
      </div>
    </div>
  );
};

export default Filter;
