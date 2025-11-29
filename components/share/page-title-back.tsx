"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const PageTitleBack = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <div className="h-[52px] px-5 flex items-center">
      <button onClick={() => router.back()}>
        <ChevronLeft className="size-6" />
      </button>
      <div className="flex-1 flex items-center justify-center pr-6">
        <h3 className="text-black font-medium">{title}</h3>
      </div>
    </div>
  );
};

export default PageTitleBack;
