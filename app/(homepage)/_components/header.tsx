import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <div className="flex items-center justify-between gap-10">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-black text-xl">
          Good morning, <span className="font-semibold">Jenny!</span>
        </h2>
        <p className="text-secondary text-sm">Thursday, 6 November 2025</p>
      </div>
      <Button
        variant={"rounded"}
        size={"icon-lg"}
        className="bg-white border border-border"
      >
        <Bell className="text-black size-6" />
      </Button>
    </div>
  );
};

export default Header;
