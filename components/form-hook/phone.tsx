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
  classNameInput,
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
  classNameInput?: string;
}) => {
  const form = useFormContext();
  const [open, setOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState(
    PHONECODE.find((code) => code.code == "US")
  );

  const splitPhoneValue = (value?: string) => {
    if (!value) return { dialCode: "", number: "" };

    const parts = value.split(" ");
    return {
      dialCode: parts[0] ?? "",
      number:
        parts.slice(1).join(" ") === "undefined"
          ? ""
          : parts.slice(1).join(" "),
    };
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const { number } = splitPhoneValue(field.value);
        return (
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
              <InputGroup className={classNameInput}>
                <InputGroupInput
                  type={type}
                  value={number}
                  onChange={(e) => {
                    field.onChange(
                      `${selectedCode?.dial_code} ${e.target.value}`
                    );
                  }}
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
                  <CommandDialog
                    open={open}
                    onOpenChange={setOpen}
                    className="w-[90%] max-w-md"
                  >
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
                            field.onChange(
                              `${code.dial_code} ${currentNumber}`
                            );
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
        );
      }}
    />
  );
};

export default PhoneInputWithForm;
