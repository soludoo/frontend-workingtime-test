"use client";
import { FileClock, Plus, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import QuickActionsDrawer from "../modals/quick-actions";

const Footer = () => {
  const pathname = usePathname();
  const [isDrawer, setIsDrawer] = React.useState(false);
  return (
    <>
      <QuickActionsDrawer open={isDrawer} onClose={() => setIsDrawer(false)} />
      <footer className="max-w-md mx-auto w-full bg-white fixed bottom-0 h-[75px] left-1/2 -translate-x-1/2">
        <div className="flex items-center justify-evenly gap-5 px-8 border-t border-border h-full">
          <Link
            href={"/"}
            className={cn(
              "flex flex-col gap-1 items-center text-xs h-full pt-3",
              pathname === "/"
                ? "text-primary border-t-2 border-primary dark:border-black dark:text-black"
                : "text-body"
            )}
          >
            <FileClock className="min-w-6 min-h-6 size-6" />
            Overview
          </Link>
          <Button
            onClick={() => setIsDrawer(true)}
            variant={"rounded"}
            size={"icon-lg"}
          >
            <Plus />
          </Button>
          <Link
            href={"/settings"}
            className={cn(
              "flex flex-col gap-1 items-center text-xs h-full pt-3",
              pathname.includes("/settings")
                ? "text-primary border-t-2 border-primary dark:border-black dark:text-black"
                : "text-body"
            )}
          >
            <Settings className="min-w-6 min-h-6 size-6" />
            Settings
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
