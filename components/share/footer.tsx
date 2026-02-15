/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FileClock, Plus, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import QuickActionsDrawer from "../modals/quick-actions";
import { routing } from "@/i18n/routing";

const Footer = () => {
  const pathname = usePathname();
  const [isDrawer, setIsDrawer] = React.useState(false);
  const LOCALES = routing.locales;
  function stripLocale(pathname: string) {
    const segments = pathname.split("/");
    if (LOCALES.includes(segments[1] as any)) {
      return "/" + segments.slice(2).join("/");
    }
    return pathname;
  }
  const cleanPath = stripLocale(pathname);

  return (
    <>
      <QuickActionsDrawer open={isDrawer} onClose={() => setIsDrawer(false)} />
      <footer className="max-w-md mx-auto w-full bg-white fixed bottom-0 h-[75px] left-1/2 -translate-x-1/2">
        <div className="flex items-center justify-evenly gap-5 px-8 border-t border-border h-full">
          <Link
            href={"/"}
            className={cn(
              "flex flex-col gap-1 items-center text-xs h-full pt-3",
              cleanPath === "/"
                ? "text-primary border-t-2 border-primary dark:border-black dark:text-black"
                : "text-body",
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
                : "text-body",
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
