"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Switch } from "../ui/switch";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface SwitchBorderWithFormProps {
  name: string;
  label?: string;
  className?: string;
  classNameWrapper?: string;
  classNameLabel?: string;
  disabled?: boolean;
}

const SwitchBorderWithForm = ({
  name,
  label,
  className,
  classNameWrapper,
  classNameLabel,
  disabled = false,
}: SwitchBorderWithFormProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex items-center justify-between rounded-2xl border border-border px-4 py-3 w-full h-14",
            classNameWrapper
          )}
        >
          {label && (
            <FormLabel
              className={cn(
                "text-sm text-black cursor-pointer",
                classNameLabel
              )}
            >
              {label}
            </FormLabel>
          )}
          <FormControl>
            <Switch
              checked={!!field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
              className={className}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SwitchBorderWithForm;
