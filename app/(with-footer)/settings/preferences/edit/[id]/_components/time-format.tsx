import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

const TimeFormat = () => {
  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between gap-5">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm text-black">Use 24-hour format</h3>
          <p className="text-body text-sm">
            The time will be displayed from 0 to 23.
          </p>
        </div>
        <Checkbox className="rounded-full size-5" />
      </div>
      <div className="border-b border-border w-full" />
      <div className="flex items-center justify-between gap-5">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm text-black">Use 12-hour format</h3>
          <p className="text-body text-sm">
            The time will be displayed from 1 to 12.
          </p>
        </div>
        <Checkbox className="rounded-full size-5" />
      </div>
    </div>
  );
};

export default TimeFormat;
