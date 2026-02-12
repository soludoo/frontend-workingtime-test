/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CardSummary from "@/components/card/card-summary";
import { Briefcase, ClipboardClock, TicketsPlane, Weight } from "lucide-react";
import { useMemo } from "react";

const WorkSummary = ({ summary, data }: { summary: any; data: any }) => {
  const summaries = useMemo(() => {
    return [
      {
        id: 1,
        title: "Worked",
        desription: data?.work_duration || "0h 0m",
        icon: (
          <div className="size-10 rounded-full bg-purple-50 flex items-center justify-center">
            <Briefcase className="size-5 min-w-5 min-h-5 text-purple" />
          </div>
        ),
      },
      {
        id: 2,
        title: "Weekly balance",
        desription: `${summary?.weekly_balance?.remaining_hours}h`,
        icon: (
          <div className="size-10 rounded-full bg-blue-50 flex items-center justify-center">
            <Weight className="size-5 min-w-5 min-h-5 text-blue" />
          </div>
        ),
      },
      {
        id: 3,
        title: "Vacation",
        desription: `Left ${summary?.vacation_left?.available}d`,
        icon: (
          <div className="size-10 rounded-full bg-green-50 flex items-center justify-center">
            <TicketsPlane className="size-5 min-w-5 min-h-5 text-green" />
          </div>
        ),
      },
      {
        id: 4,
        title: "Overtime",
        desription: summary?.overtime?.today_overtime_formatted,
        icon: (
          <div className="size-10 rounded-full bg-yellow-50 flex items-center justify-center">
            <ClipboardClock className="size-5 min-w-5 min-h-5 text-yellow" />
          </div>
        ),
      },
    ];
  }, [data, summary]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-black font-semibold">Work Summary</h2>
      <div className="grid grid-cols-12 gap-3">
        {summaries.map((item) => (
          <div className="col-span-6" key={item.id}>
            <CardSummary
              icons={item.icon}
              time={item.desription}
              title={item.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkSummary;
