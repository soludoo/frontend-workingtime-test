"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";

const formatDate = (date?: Date) =>
  date ? date.toLocaleDateString("en-GB") : "";

type Props = {
  startName: string;
  endName: string;
  label?: string;
  placeholder?: string;
  className?: string;
  classNameWrapper?: string;
  classNameLabel?: string;
  disabled?: boolean;
};

const DateRangePicker = ({
  startName,
  endName,
  label,
  placeholder = "Select date range",
  className,
  classNameWrapper,
  classNameLabel,
  disabled = false,
}: Props) => {
  const form = useFormContext();
  const [open, setOpen] = React.useState(false);
  const startDate = form.watch(startName);
  const endDate = form.watch(endName);

  const range: DateRange | undefined =
    startDate || endDate
      ? {
          from: startDate ? new Date(startDate) : undefined,
          to: endDate ? new Date(endDate) : undefined,
        }
      : undefined;

  const displayValue =
    range?.from && range?.to
      ? `${formatDate(range.from)} - ${formatDate(range.to)}`
      : placeholder;

  return (
    <FormItem className={cn("flex flex-col gap-2 w-full", classNameWrapper)}>
      {label && (
        <FormLabel
          className={cn("font-medium text-xs text-black", classNameLabel)}
        >
          {label}
        </FormLabel>
      )}
      <FormControl>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-between font-normal rounded-2xl border border-primary hover:bg-transparent hover:text-black",
                !range?.from && "text-body text-sm",
                className
              )}
              disabled={disabled}
            >
              {displayValue}
              <CalendarIcon className="ml-2 h-4 w-4 opacity-70" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={range}
              captionLayout="dropdown"
              onSelect={(selected) => {
                if (!selected) return;
                form.setValue(startName, selected.from?.toISOString() ?? "");
                form.setValue(endName, selected.to?.toISOString() ?? "");
                if (selected.from && selected.to) {
                  setOpen(false);
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </FormControl>
      {(form.formState.errors[startName] || form.formState.errors[endName]) && (
        <FormMessage>
          {String(
            form.formState.errors[startName]?.message ||
              form.formState.errors[endName]?.message ||
              ""
          )}
        </FormMessage>
      )}
    </FormItem>
  );
};

export default DateRangePicker;
