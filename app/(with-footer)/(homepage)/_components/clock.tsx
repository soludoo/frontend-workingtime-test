"use client";
import EndOfWork from "@/components/modals/end-of-work";
import ClockButton from "@/components/ui/clock-button";
import { useWorkTracker } from "@/hooks/use-work-tracker";
import { CircleX, FileChartColumn, Pause, Play, RefreshCw } from "lucide-react";
import { useState } from "react";
import ClockAnimation from "./clock-animation";
import StartWorking from "@/components/modals/start-working";
import BreakWorking from "@/components/modals/break-working";

const ClockContent = () => {
  const { data, start, pause, resume, stop } = useWorkTracker();
  const [isModal, setIsModal] = useState(false);
  const [isModalStart, setIsModalStart] = useState(false);
  const [isModalBreak, setIsModalBreak] = useState(false);

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
      {!data.stoppedToday && (
        <div className="flex flex-col gap-y-2.5 items-center">
          {!data?.timerStatus?.isContinue &&
            (data?.timerStatus?.isActive ? (
              data?.timerStatus?.isPaused ? (
                <>
                  <ClockButton
                    color="blue"
                    title="Continue"
                    icon={<RefreshCw className="size-6" />}
                    onClick={resume}
                  />
                  <p className="italic text-sm">Back to work — nice energy!</p>
                </>
              ) : (
                <>
                  <ClockButton
                    color="yellow"
                    title="Pause"
                    icon={<Pause className="size-6" />}
                    onClick={() => setIsModalBreak(true)}
                  />
                  <p className="italic text-sm">
                    Taking a break ☕ — don’t forget to come back!
                  </p>
                </>
              )
            ) : (
              <>
                <ClockButton
                  color="green"
                  title="Start"
                  icon={<Play className="size-6" />}
                  onClick={() => setIsModalStart(true)}
                />
                <p className="italic text-sm">Let’s start your workday!</p>
              </>
            ))}
          {data?.timerStatus?.isContinue && (
            <>
              <ClockButton
                color="red"
                title="Stop"
                icon={<CircleX className="size-6" />}
                onClick={() => setIsModal(true)}
              />
              {data?.currentHours >= 8 && (
                <p className="italic text-sm">
                  Worked 8 hours today — awesome job 🎉
                </p>
              )}
            </>
          )}
        </div>
      )}
      {data.stoppedToday && (
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
                {data.workSummary.totalWorked}
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
