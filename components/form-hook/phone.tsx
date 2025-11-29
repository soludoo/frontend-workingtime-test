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
import { ChevronDown } from "lucide-react";
import { PHONECODE } from "@/constants/phone-code";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useState } from "react";

const PhoneInputWithForm = ({
  name,
  label,
  type = "text",
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
}) => {
  const form = useFormContext();
  const [open, setOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState(
    PHONECODE.find((code) => code.code == "US")
  );

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
                onChange={(e) => {
                  field.onChange(
                    `${selectedCode?.dial_code} ${e.target.value}`
                  );
                }}
                value={
                  field.value?.replace(selectedCode?.dial_code + " ", "") ?? ""
                }
                autoComplete="off"
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
              />
              <InputGroupAddon className="min-w-[68px] border-r border-border h-6 pr-px">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="w-full flex items-center justify-between gap-1"
                >
                  <span className="text-base">{selectedCode?.emoji}</span>
                  <span className="text-sm font-medium text-black">
                    {selectedCode?.dial_code}
                  </span>
                  <ChevronDown className="size-5 text-black" />
                </button>
                <CommandDialog open={open} onOpenChange={setOpen}>
                  <CommandInput placeholder="Type your country.." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {PHONECODE.map((code, idx) => (
                      <CommandItem
                        key={idx}
                        onSelect={() => {
                          setSelectedCode(code);
                          const currentNumber = field.value?.replace(
                            /^[+]\d+\s?/,
                            ""
                          );
                          field.onChange(`${code.dial_code} ${currentNumber}`);
                          setOpen(false);
                        }}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2 flex-1">
                          {code.emoji}
                          <p>{code.name}</p>
                        </div>
                        {code.dial_code}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandDialog>
              </InputGroupAddon>
            </InputGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PhoneInputWithForm;
