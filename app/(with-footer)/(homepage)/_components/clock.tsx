"use client";
import EndOfWork from "@/components/modals/end-of-work";
import ClockButton from "@/components/ui/clock-button";
import { useWorkTracker } from "@/hooks/use-work-tracker";
import { CircleX, Pause, Play, RefreshCw } from "lucide-react";
import { useState } from "react";

const EIGHT_HOURS_MS = 8 * 60 * 60 * 1000;

const ClockContent = () => {
  const { state, start, pause, resume, stop, totalWorkedMs } = useWorkTracker();
  const [isModal, setIsModal] = useState(false);
  const hasWorkedEightHours = totalWorkedMs >= EIGHT_HOURS_MS;

  return (
    <>
      <EndOfWork
        open={isModal}
        onClose={() => setIsModal(false)}
        onSelect={stop}
      />
      <div className="flex flex-col gap-y-2.5 items-center">
        {!state.isContinue &&
          (state.isWorking ? (
            state.isPaused ? (
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
                  onClick={pause}
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
                onClick={start}
              />
              <p className="italic text-sm">Let’s start your workday!</p>
            </>
          ))}
        {state.isContinue && (
          <>
            <ClockButton
              color="red"
              title="Stop"
              icon={<CircleX className="size-6" />}
              onClick={() => setIsModal(true)}
            />
            {hasWorkedEightHours && (
              <p className="italic text-sm">
                Worked 8 hours today — awesome job 🎉
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ClockContent;
