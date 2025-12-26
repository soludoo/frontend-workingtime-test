"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

const CheckboxBorderWithForm = ({
  name,
  label,
  type = "text",
  className,
  classNameWrapper,
  placeholder,
  isCurrency = false,
  disabled = false,
  classNameLabel,
  readOnly,
  isPhone = false,
}: {
  name: string;
  label?: string;
  type?: string;
  className?: string;
  classNameWrapper?: string;
  placeholder?: string;
  isCurrency?: boolean;
  disabled?: boolean;
  classNameLabel?: string;
  readOnly?: boolean;
  isPhone?: boolean;
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
          <FormControl className={cn("w-full", className)}>
            <Input
              type={type}
              {...field}
              value={field.value || ""}
              autoComplete="off"
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CheckboxBorderWithForm;
