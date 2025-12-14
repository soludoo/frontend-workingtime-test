import { Button } from "@/components/ui/button";
import { BookCheck, Plus } from "lucide-react";
import React from "react";

const ActiveRequest = () => {
  return (
    <div className="flex flex-col justify-between h-full px-5">
      <div className="flex-1 min-h-[400px] flex items-center justify-center flex-col gap-3">
        <div className="size-[60px] bg-primary/10 flex items-center justify-center rounded-full">
          <BookCheck className="size-[30px] text-primary" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-black font-semibold text-center">
            No correction requests yet
          </h3>
          <p className="text-black text-sm text-center">
            If you missed a clock-in or need to fix a time entry, you can
            request it here.
          </p>
        </div>
      </div>
      <Button className="text-sm">
        <Plus />
        New Request
      </Button>
    </div>
  );
};

export default ActiveRequest;
