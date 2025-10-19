import { Clock, History, NotebookPen, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="max-w-lg mx-auto w-full bg-background fixed bottom-0 h-[75px] left-1/2 -translate-x-1/2">
      <div className="flex items-center justify-between gap-5 px-3 md:px-10 border-t h-full">
        <Link
          href={"/"}
          className="flex flex-col gap-1 items-center text-sm md:text-base"
        >
          <Clock className="size-4 md:size-6" />
          Overview
        </Link>
        <Link
          href={"/"}
          className="flex flex-col gap-1 items-center text-sm md:text-base"
        >
          <History className="size-4 md:size-6" />
          History
        </Link>
        <Link
          href={"/"}
          className="flex flex-col gap-1 items-center text-sm md:text-base"
        >
          <NotebookPen className="size-4 md:size-6" />
          Corrections
        </Link>
        <Link
          href={"/"}
          className="flex flex-col gap-1 items-center text-sm md:text-base"
        >
          <Settings className="size-4 md:size-6" />
          Settings
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
