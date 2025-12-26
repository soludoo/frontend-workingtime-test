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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { ReactNode } from "react";

const InputGroupWithForm = ({
  name,
  label,
  type = "text",
  className,
  classNameWrapper,
  placeholder,
  disabled = false,
  classNameLabel,
  readOnly,
  icon,
}: {
  name: string;
  label?: string;
  type?: string;
  className?: string;
  classNameWrapper?: string;
  placeholder?: string;
  disabled?: boolean;
  classNameLabel?: string;
  readOnly?: boolean;
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
          <FormControl className={cn("w-full", className)}>
            <InputGroup className="border-border shadow-none h-12">
              <InputGroupInput
                type={type}
                {...field}
                value={field.value || ""}
                autoComplete="off"
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
              />
              <InputGroupAddon>{icon}</InputGroupAddon>
            </InputGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputGroupWithForm;
