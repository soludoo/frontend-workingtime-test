"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();
  return (
    <div className="h-[52px] px-5 flex items-center">
      <button onClick={() => router.back()}>
        <ChevronLeft />
      </button>
      <div className="flex-1 flex items-center justify-center pr-6">
        <h3 className="text-black font-medium">Notifications</h3>
      </div>
    </div>
  );
};

export default Header;
