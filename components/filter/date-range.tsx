"use client";

import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

interface DateRangeFilterProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  className?: string;
}

const DateRangeFilter = ({
  value,
  onChange,
  placeholder = "Date Range",
  className,
}: DateRangeFilterProps) => {
  const [open, setOpen] = React.useState(false);

  const label =
    value?.from && value?.to
      ? `${format(value.from, "dd/MM/yyyy")} - ${format(
          value.to,
          "dd/MM/yyyy"
        )}`
      : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-fit h-10 rounded-[10px] hover:bg-transparent hover:text-muted-foreground text-muted-foreground text-sm justify-between font-normal",
            className
          )}
        >
          {label}
          <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="end">
        <Calendar
          mode="range"
          selected={value}
          captionLayout="dropdown"
          onSelect={(range) => {
            onChange?.(range);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateRangeFilter;
