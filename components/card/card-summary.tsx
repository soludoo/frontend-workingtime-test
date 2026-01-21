import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React from "react";

const cardSummaryVariants = cva("border rounded-2xl px-4 py-[13px]", {
  variants: {
    variant: {
      default: "flex items-center gap-2",
      column: "flex flex-col gap-3 items-center",
    },
    size: {
      sm: "py-2 px-3",
      md: "py-[13px] px-4",
      lg: "py-4 px-5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

interface CardSummaryProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardSummaryVariants> {
  icons: React.ReactNode;
  time: string;
  title: string;
  classNameWrapper?: string;
  medium?: boolean;
}

const CardSummary = ({
  icons,
  time,
  title,
  variant,
  size,
  className,
  classNameWrapper,
  medium = false,
  ...props
}: CardSummaryProps) => {
  return (
    <div
      className={cn(cardSummaryVariants({ variant, size }), className)}
      {...props}
    >
      {icons}
      <div className={cn("flex flex-col", classNameWrapper)}>
        <h4 className="font-medium text-black">{time}</h4>
        <p className={cn("text-body text-[10px]", medium && "text-sm")}>
          {title}
        </p>
      </div>
    </div>
  );
};

export default CardSummary;
