"use client";

import { FileClock, Plus, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Footer = () => {
  const pathname = usePathname();
  return (
    <footer className="max-w-md mx-auto w-full bg-white fixed bottom-0 h-[75px] left-1/2 -translate-x-1/2">
      <div className="flex items-center justify-between gap-5 px-8 pb-6 border-t border-border h-full">
        <Link
          href={"/"}
          className={cn(
            "flex flex-col gap-1 items-center text-xs md:text-base h-full pt-3",
            pathname === "/"
              ? "text-primary border-t-2 border-primary"
              : "text-secondary"
          )}
        >
          <FileClock className="size-6" />
          Overview
        </Link>
        <Button variant={"rounded"} size={"icon-lg"}>
          <Plus />
        </Button>
        <Link
          href={"/"}
          className={cn(
            "flex flex-col gap-1 items-center text-xs md:text-base h-full pt-3",
            pathname === "/settings"
              ? "text-primary border-t-2 border-primary"
              : "text-secondary"
          )}
        >
          <Settings className="size-6" />
          Settings
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
