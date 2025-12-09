"use client";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Informations = () => {
  const router = useRouter();
  return (
    <div className="p-5 flex flex-col gap-4">
      <button
        onClick={() => router.push(`/settings/preferences/edit/language`)}
        className="flex items-center justify-between"
      >
        <p className="text-black text-sm">Language</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">English</p>
          <ChevronRight className="size-5 text-body-400" />
        </div>
      </button>
      <div className="border-b border-border w-full" />
      <button
        onClick={() => router.push(`/settings/preferences/edit/time-format`)}
        className="flex items-center justify-between"
      >
        <p className="text-black text-sm">Time Format</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">24-hour</p>
          <ChevronRight className="size-5 text-body-400" />
        </div>
      </button>
      <div className="border-b border-border w-full" />
      <button
        onClick={() => router.push(`/settings/preferences/edit/first-day`)}
        className="flex items-center justify-between"
      >
        <p className="text-black text-sm">First day of week</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">Monday</p>
          <ChevronRight className="size-5 text-body-400" />
        </div>
      </button>
    </div>
  );
};

export default Informations;
