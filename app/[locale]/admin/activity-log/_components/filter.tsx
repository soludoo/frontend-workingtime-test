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
          placeholder="Search by employee, action or keyword..."
          className="w-[360px]"
          type="search"
        />
        <InputGroupAddon>
          <Search className="size-5" />
        </InputGroupAddon>
      </InputGroup>
      <div className="flex items-center gap-3">
        <SelectFilter
          className="w-fit"
          placeholder="Category"
          value={filters.status}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, status: value }))
          }
          options={[
            { label: "All Categories", value: "all" },
            { label: "Requests", value: "requests" },
            { label: "Timesheets", value: "timesheets" },
            { label: "Employees", value: "employees" },
            { label: "Company Setting", value: "company_setting" },
            { label: "System", value: "system" },
          ]}
        />
        <SelectFilter
          placeholder="Actor"
          className="w-fit"
          value={filters.type}
          onChange={(value) => setFilters((prev) => ({ ...prev, type: value }))}
          options={[
            { label: "Employee", value: "employee" },
            { label: "Manager", value: "manager" },
            { label: "Admin", value: "admin" },
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
