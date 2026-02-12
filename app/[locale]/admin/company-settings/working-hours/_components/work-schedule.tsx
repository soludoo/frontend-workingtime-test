"use client";

import InputWithForm from "@/components/form-hook/input";
import { cn } from "@/lib/utils";
import { useState } from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const WorkSchedule = () => {
  const [active, setActive] = useState<string[]>([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
  ]);

  const toggleDay = (day: string) => {
    setActive((prev) => {
      const isActive = prev.includes(day);
      if (isActive) {
        return prev.filter((d) => d !== day);
      }
      return DAYS.filter((d) => [...prev, day].includes(d));
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <div className="flex flex-col gap-2">
        <h4 className="font-semibold text-black">Default work schedule</h4>
        <p className="text-body text-sm">
          Set the standard working days and hours for your organization.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-sm">Workdays</h3>
        <div className="flex items-center gap-3">
          {DAYS.map((day) => {
            const isActive = active.includes(day);

            return (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={cn(
                  "size-12 rounded-2xl flex items-center justify-center text-sm border transition",
                  isActive
                    ? "border-primary-admin text-black"
                    : "border-border text-body hover:border-primary-admin/50"
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <InputWithForm
          type="time"
          label="Start Time"
          name="start_time"
          className="border-border"
        />
        <InputWithForm
          type="time"
          label="End Time"
          name="end_time"
          className="border-border"
        />
      </div>
    </div>
  );
};

export default WorkSchedule;
