"use client";
import ClockButton from "@/components/ui/clock-button";
import { CircleX, Pause, Play, RefreshCw } from "lucide-react";
import React from "react";

const ClockContent = () => {
  const [isWorking, setIsWorking] = React.useState(false);
  const [isBreak, setIsBreak] = React.useState(false);
  const [isEightHoursPassed, setIsEightHoursPassed] = React.useState(false);
  return (
    <div className="flex flex-col gap-y-2.5 items-center">
      {!isEightHoursPassed &&
        (isWorking ? (
          isBreak ? (
            <>
              <ClockButton
                color="blue"
                title="Continue"
                icon={<RefreshCw className="size-6" />}
                onClick={() => setIsBreak(false)}
              />
              <p className="text-body italic text-sm">
                Back to work — nice energy!
              </p>
            </>
          ) : (
            <>
              <ClockButton
                color="yellow"
                title="Pause"
                icon={<Pause className="size-6" />}
                onClick={() => setIsBreak(true)}
              />
              <p className="text-body italic text-sm">
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
              onClick={() => setIsWorking(true)}
            />
            <p className="text-body italic text-sm">
              Let’s start your workday!
            </p>
          </>
        ))}
      {isEightHoursPassed && (
        <>
          <ClockButton
            color="red"
            title="Stop"
            icon={<CircleX className="size-6" />}
          />
          <p className="text-body italic text-sm">
            Worked 8 hours today — awesome job 🎉
          </p>
        </>
      )}
    </div>
  );
};

export default ClockContent;
