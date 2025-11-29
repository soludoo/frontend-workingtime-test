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
import { EyeClosed, EyeIcon } from "lucide-react";
import { useState } from "react";

const PasswordInputWithForm = ({
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
  className?: string;
  classNameWrapper?: string;
  placeholder?: string;
  isCurrency?: boolean;
  disabled?: boolean;
  classNameLabel?: string;
  readOnly?: boolean;
}) => {
  const form = useFormContext();
  const [type, setType] = useState<"password" | "text">("password");

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
            <InputGroup>
              <InputGroupInput
                type={type}
                {...field}
                value={field.value || ""}
                autoComplete="off"
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
              />
              <InputGroupAddon align={"inline-end"}>
                {type === "password" ? (
                  <EyeIcon onClick={() => setType("text")} />
                ) : (
                  <EyeClosed onClick={() => setType("password")} />
                )}
              </InputGroupAddon>
            </InputGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordInputWithForm;
