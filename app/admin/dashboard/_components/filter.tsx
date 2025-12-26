"use client";

import React from "react";
import SelectFilter from "@/components/filter/select-filter";
import DateRangeFilter from "@/components/filter/date-range";
import { DateRange } from "react-day-picker";

const Filter = () => {
  const [filters, setFilters] = React.useState({
    status: "",
    type: "",
    date: undefined as DateRange | undefined,
  });

  return (
    <div className="flex items-center gap-3">
      <SelectFilter
        className="w-[120px]"
        placeholder="All Status"
        value={filters.status}
        onChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
        options={[
          { label: "Pending", value: "pending" },
          { label: "Approved", value: "approved" },
          { label: "Rejected", value: "rejected" },
        ]}
      />
      <SelectFilter
        placeholder="Request Type"
        value={filters.type}
        onChange={(value) => setFilters((prev) => ({ ...prev, type: value }))}
        options={[
          { label: "Vacation", value: "vacation" },
          { label: "Correction", value: "correction" },
        ]}
      />
      <DateRangeFilter
        value={filters.date}
        onChange={(date) => setFilters((prev) => ({ ...prev, date }))}
      />
    </div>
  );
};

export default Filter;
