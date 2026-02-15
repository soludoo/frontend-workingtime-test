"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Separator } from "../ui/separator";

type Option = {
  key: string | number;
  label: string;
};

const SelectDrawerWithForm = ({
  options,
  label,
  name,
  placeholder = "Select option",
  classNameWrapper,
  className,
  classNameLabel,
  disabled,
}: {
  options: Option[];
  label?: string;
  name: string;
  placeholder?: string;
  classNameWrapper?: string;
  className?: string;
  classNameLabel?: string;
  disabled?: boolean;
}) => {
  const form = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const selected = options.find(
          (opt) => String(opt.key) === String(field.value),
        );

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
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={disabled}
                    className={cn(
                      "w-full justify-between text-black text-sm font-medium border-primary rounded-2xl hover:bg-transparent hover:text-black",
                      !field.value && "text-muted-foreground",
                      className,
                    )}
                  >
                    <div className="flex w-full items-center gap-3 justify-between">
                      {selected?.label || placeholder}
                      <motion.span
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{
                          duration: 0.25,
                          ease: "easeInOut",
                        }}
                        className="flex items-center"
                      >
                        <ChevronDown className="size-5" />
                      </motion.span>
                    </div>
                  </Button>
                </FormControl>
              </DrawerTrigger>
              <DrawerContent className="px-4 pb-6">
                <DrawerHeader>
                  <DrawerTitle>{label}</DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col gap-1 mt-4  overflow-auto">
                  {options.map((item, index) => {
                    const isSelected = String(field.value) === String(item.key);
                    const isLast = index === options.length - 1;

                    return (
                      <div key={item.key} className="flex flex-col gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            field.onChange(String(item.key));
                            setOpen(false);
                          }}
                          className={cn(
                            "flex items-center justify-between rounded-xl px-4 py-3 text-left transition w-full",
                            isSelected
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-muted",
                          )}
                        >
                          <span>{item.label}</span>
                          {isSelected && <Check className="h-4 w-4" />}
                        </button>

                        {!isLast && <Separator />}
                      </div>
                    );
                  })}
                </div>
              </DrawerContent>
            </Drawer>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default SelectDrawerWithForm;
