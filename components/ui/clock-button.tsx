import React from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const clockVariantsOuter = cva("", {
  variants: {
    color: {
      green: "bg-green-50 dark:bg-green-700",
      yellow: "bg-yellow-50 dark:bg-yellow-700",
      blue: "bg-blue-50 dark:bg-blue-700",
      red: "bg-red-50 dark:bg-red-700",
    },
  },
  defaultVariants: { color: "green" },
});

const clockVariantsMiddle = cva("", {
  variants: {
    color: {
      green: "bg-green-100 dark:bg-green-600",
      yellow: "bg-yellow-100 dark:bg-yellow-600",
      blue: "bg-blue-100 dark:bg-blue-600",
      red: "bg-red-100 dark:bg-red-600",
    },
  },
  defaultVariants: { color: "green" },
});

const clockVariantsInner = cva("", {
  variants: {
    color: {
      green: "bg-green",
      yellow: "bg-yellow",
      blue: "bg-blue",
      red: "bg-red",
    },
  },
  defaultVariants: { color: "green" },
});

type ClockVariantProps = VariantProps<typeof clockVariantsOuter>;

type ClockButtonProps = {
  title: string;
  icon: React.ReactNode;
} & ClockVariantProps &
  React.ComponentProps<"button">;

const ClockButton = ({ title, icon, color, ...props }: ClockButtonProps) => {
  return (
    <div
      className={cn(
        "size-[220px] rounded-full flex items-center justify-center",
        clockVariantsOuter({ color })
      )}
    >
      <div
        className={cn(
          "size-[190px] rounded-full flex items-center justify-center",
          clockVariantsMiddle({ color })
        )}
      >
        <Button
          variant="rounded"
          size="big"
          className={cn(
            "flex flex-col gap-2 dark:text-black",
            clockVariantsInner({ color })
          )}
          {...props}
        >
          {icon}
          {title}
        </Button>
      </div>
    </div>
  );
};

export default ClockButton;
