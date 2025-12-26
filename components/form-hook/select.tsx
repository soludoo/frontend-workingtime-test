/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const SelectWithForm = ({
  options,
  label,
  name,
  placeholder,
  classNameWrapper,
  className,
  classNameLabel,
  disabled,
  customOnChange,
  icon,
}: {
  options: {
    key: string | number;
    label: string;
  }[];
  label?: string;
  name: string;
  placeholder?: string;
  classNameWrapper?: string;
  className?: string;
  classNameLabel?: string;
  disabled?: boolean;
  customOnChange?: (e: any) => void;
  icon?: ReactNode;
}) => {
  const form = useFormContext();

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
          <Select
            onValueChange={customOnChange ? customOnChange : field.onChange}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger
                disabled={disabled}
                className={cn("w-full font-medium", className)}
              >
                <div className="flex items-center gap-3">
                  {icon}
                  <SelectValue
                    placeholder={placeholder}
                    className="font-medium"
                  />
                </div>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options?.map((item) => (
                <SelectItem key={item.key} value={String(item.key)}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectWithForm;
