/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import EndOfWork from "@/components/modals/end-of-work";
import ClockButton from "@/components/ui/clock-button";
import { CircleX, FileChartColumn, Pause, Play, RefreshCw } from "lucide-react";
import { useState } from "react";
import ClockAnimation from "./clock-animation";
import StartWorking from "@/components/modals/start-working";
import BreakWorking from "@/components/modals/break-working";
import { useTranslations } from "next-intl";

const ClockContent = ({ data, start, pause, resume, stop }: any) => {
  const [isModal, setIsModal] = useState(false);
  const [isModalStart, setIsModalStart] = useState(false);
  const [isModalBreak, setIsModalBreak] = useState(false);
  const t = useTranslations("home");

  console.log(data);

  if (!data) {
    return <ClockAnimation />;
  }

  return (
    <>
      <EndOfWork
        open={isModal}
        onClose={() => setIsModal(false)}
        onSelect={stop}
      />
      <StartWorking
        open={isModalStart}
        onClose={() => setIsModalStart(false)}
        onAction={(value) => start(value)}
      />
      <BreakWorking
        open={isModalBreak}
        onClose={() => setIsModalBreak(false)}
        onAction={(value) => pause(value)}
      />
      <div className="flex flex-col gap-y-2.5 items-center">
        {!data?.hasActiveTimer && data.status !== "stopped" && (
          <>
            <ClockButton
              color="green"
              title="Start"
              icon={<Play className="size-6" />}
              onClick={() => setIsModalStart(true)}
            />
            <p className="italic text-sm">{t("start-title")}</p>
          </>
        )}
        {data.hasActiveTimer &&
          data.status === "running" &&
          data.breaks.length === 0 && (
            <>
              <ClockButton
                color="yellow"
                title="Pause"
                icon={<Pause className="size-6" />}
                onClick={() => setIsModalBreak(true)}
              />
              <p className="italic text-sm">{t("break-title")}</p>
            </>
          )}
        {data.hasActiveTimer && data.status === "on_break" && (
          <>
            <ClockButton
              color="blue"
              title="Continue"
              icon={<RefreshCw className="size-6" />}
              onClick={resume}
            />
            <p className="italic text-sm">{t("resume-title")}</p>
          </>
        )}
        {data.hasActiveTimer &&
          data.status === "running" &&
          data.breaks.length > 0 && (
            <>
              <ClockButton
                color="red"
                title="Stop"
                icon={<CircleX className="size-6" />}
                onClick={() => setIsModal(true)}
              />
              {data?.work_duration.includes("8h") && (
                <p className="italic text-sm">
                  Worked 8 hours today — awesome job 🎉
                </p>
              )}
            </>
          )}
      </div>
      {!data.hasActiveTimer && data.status === "stopped" && (
        <div className="bg-primary/20 w-full rounded-2xl p-4 flex items-center gap-3">
          <div className="bg-primary/80 size-10 flex items-center justify-center rounded-full">
            <FileChartColumn className="text-white size-6" />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-black font-medium">
              Your workday is completed.
            </h2>
            <p className="text-sm text-body">
              You worked{" "}
              <span className="text-black font-semibold">
                {data?.work_duration}
              </span>{" "}
              today.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ClockContent;
