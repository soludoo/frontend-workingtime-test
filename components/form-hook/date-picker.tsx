"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";

const DatePickerWithForm = ({
  name,
  label,
  placeholder = "Select date",
  className,
  classNameWrapper,
  classNameLabel,
  disabled = false,
}: {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  classNameWrapper?: string;
  classNameLabel?: string;
  disabled?: boolean;
}) => {
  const form = useFormContext();
  const [open, setOpen] = React.useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn("flex flex-col gap-2 w-full", classNameWrapper)}
        >
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
                    "w-full justify-between font-normal rounded-2xl border border-primary",
                    !field.value && "text-body text-sm",
                    className
                  )}
                  disabled={disabled}
                >
                  {field.value
                    ? new Date(field.value).toLocaleDateString("en-GB")
                    : placeholder}
                  <ChevronDownIcon className="ml-2 h-4 w-4 opacity-70" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  captionLayout="dropdown"
                  onSelect={(value) => {
                    field.onChange(value?.toISOString() || "");
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DatePickerWithForm;
