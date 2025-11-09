import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import React from "react";

const ClockContent = () => {
  return (
    <div className="flex flex-col gap-y-[10px] items-center">
      <div className="size-[220px] rounded-full bg-[#F1EDFE] flex items-center justify-center">
        <div className="size-[190px] rounded-full bg-[#E3DBFD] flex items-center justify-center">
          <Button
            variant={"rounded"}
            size={"big"}
            className="flex flex-col gap-2"
          >
            <Play className="size-6" />
            Clock in
          </Button>
        </div>
      </div>
      <p className="text-secondary italic text-sm">Let’s start your workday!</p>
    </div>
  );
};

export default ClockContent;
