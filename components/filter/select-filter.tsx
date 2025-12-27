"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";

interface SelectFilterProps {
  options: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const SelectFilter = ({
  options,
  placeholder,
  className,
  value,
  onChange,
}: SelectFilterProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        size="sm"
        className={cn("rounded-[10px] text-body", className)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem value={option.value} key={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectFilter;
