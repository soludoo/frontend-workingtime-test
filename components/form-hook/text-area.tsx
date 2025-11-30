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
import { Textarea } from "../ui/textarea";

const TextAreaWithForm = ({
  name,
  label,
  className,
  classNameWrapper,
  placeholder,
  disabled = false,
  classNameLabel,
  readOnly,
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
            <Textarea
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

export default TextAreaWithForm;
