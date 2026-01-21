"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Requests = () => {
  const [isCorrection, setIsCorrection] = useState(false);

  return (
    <div className="flex-1 flex flex-col gap-4">
      <h3 className="font-semibold text-black">Requests</h3>
      <div className="w-full border border-border rounded-2xl flex flex-col">
        <div className="w-full flex h-[45px]">
          <button
            onClick={() => setIsCorrection(false)}
            className={cn(
              "border-b border-border flex-1 flex items-center justify-center",
              !isCorrection
                ? "border-primary text-primary font-semibold"
                : "text-body",
            )}
          >
            Vacation Request
          </button>
          <button
            onClick={() => setIsCorrection(true)}
            className={cn(
              "border-b border-border flex-1 flex items-center justify-center",
              !isCorrection
                ? "text-body"
                : "border-primary text-primary font-semibold",
            )}
          >
            Correction Request
          </button>
        </div>
        <div className="w-full flex flex-col px-5">
          <div className="py-3 flex justify-between gap-1 w-full border-b">
            <div className="flex flex-col">
              <h4 className="font-medium text-sm">Incorrect clock-in time</h4>
              <p className="text-body text-sm">
                Requested to change clock-in from 09:30 → 08:00 on 6 Nov 2025
              </p>
            </div>
            <Badge className="bg-yellow/10 text-yellow font-medium text-xs">
              Pending
            </Badge>
          </div>
          <div className="py-3 flex justify-between gap-1 w-full">
            <div className="flex flex-col">
              <h4 className="font-medium text-sm">Missing clock-out</h4>
              <p className="text-body text-sm">
                Requested to add clock-out time at 17:00 on 5 Nov 2025
              </p>
            </div>
            <Badge className="bg-green/10 text-green font-medium text-xs">
              Approved
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;
