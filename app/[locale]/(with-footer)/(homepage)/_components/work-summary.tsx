/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CardSummary from "@/components/card/card-summary";
import { calculateWorkDuration } from "@/lib/helper";
import { Briefcase, ClipboardClock, TicketsPlane, Weight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useNetworkStatus } from "@/hooks/use-network-status";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

const WorkSummary = ({ summary, data }: { summary: any; data: any }) => {
  const t = useTranslations("home");
  const [worked, setWorked] = useState("0h 0m");
  const isOnline = useNetworkStatus();

  useEffect(() => {
    if (!data?.clock_in) return;

    const update = () => {
      setWorked(calculateWorkDuration(data));
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [data]);

  const summaries = useMemo(() => {
    if (isOnline) {
      return [
        {
          id: 1,
          title: t("worked"),
          desription: worked,
          icon: (
            <div className="size-10 rounded-full bg-purple-50 flex items-center justify-center">
              <Briefcase className="size-5 text-purple" />
            </div>
          ),
        },
        {
          id: 2,
          title: t("weeklyBalance"),
          desription: `${summary?.weekly_balance?.remaining_hours}h`,
          icon: (
            <div className="size-10 rounded-full bg-blue-50 flex items-center justify-center">
              <Weight className="size-5 text-blue" />
            </div>
          ),
        },
        {
          id: 3,
          title: t("vacation"),
          desription: `${t("left")} ${summary?.vacation_left?.available}d`,
          icon: (
            <div className="size-10 rounded-full bg-green-50 flex items-center justify-center">
              <TicketsPlane className="size-5 text-green" />
            </div>
          ),
        },
        {
          id: 4,
          title: t("overtime"),
          desription: summary?.overtime?.weekly_overtime_formatted,
          icon: (
            <div className="size-10 rounded-full bg-yellow-50 flex items-center justify-center">
              <ClipboardClock className="size-5 text-yellow" />
            </div>
          ),
        },
      ];
    } else {
      return [
        {
          id: 1,
          title: t("worked"),
          desription: worked,
          icon: (
            <div className="size-10 rounded-full bg-purple-50 flex items-center justify-center">
              <Briefcase className="size-5 text-purple" />
            </div>
          ),
        },
      ];
    }
  }, [worked, summary, t, isOnline]);

  return (
    <div className="flex flex-col gap-4 pb-10">
      <h2 className="text-black font-semibold">{t("work-summary")}</h2>
      {!summary ? (
        <Spinner className="size-5 mx-auto my-4" />
      ) : (
        <div className="grid grid-cols-12 gap-3">
          {summaries.map((item) => (
            <div
              className={cn(isOnline ? "col-span-6" : "col-span-12")}
              key={item.id}
            >
              <CardSummary
                icons={item.icon}
                time={item.desription}
                title={item.title}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkSummary;
