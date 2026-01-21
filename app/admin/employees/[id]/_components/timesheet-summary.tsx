import CardSummary from "@/components/card/card-summary";
import {
  AlarmClockCheck,
  CalendarClock,
  History,
  Timer,
  TimerReset,
} from "lucide-react";

const TimesheetSummary = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-10">
        <h3 className="font-semibold text-black">Timesheet Summary</h3>
      </div>
      <div className="grid grid-cols-5 gap-4">
        <CardSummary
          icons={
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
              <History className="size-5 text-primary" />
            </div>
          }
          title="Hours worked this week"
          time="38h 20m"
          variant={"column"}
          medium={true}
          classNameWrapper="gap-1 items-center"
        />
        <CardSummary
          icons={
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
              <AlarmClockCheck className="size-5 text-primary" />
            </div>
          }
          title="Average daily hours"
          time="7h 40m"
          variant={"column"}
          medium={true}
          classNameWrapper="gap-1 items-center"
        />
        <CardSummary
          icons={
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
              <CalendarClock className="size-5 text-primary" />
            </div>
          }
          title="Overtime this month"
          time="4h 20m"
          variant={"column"}
          medium={true}
          classNameWrapper="gap-1 items-center"
        />
        <CardSummary
          icons={
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Timer className="size-5 text-primary" />
            </div>
          }
          title="Last clock-in"
          time="Today, 08:12"
          variant={"column"}
          medium={true}
          classNameWrapper="gap-1 items-center"
        />
        <CardSummary
          icons={
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
              <TimerReset className="size-5 text-primary" />
            </div>
          }
          title="Last clock-out"
          time="Yesterday, 17:04"
          variant={"column"}
          medium={true}
          classNameWrapper="gap-1 items-center"
        />
      </div>
    </div>
  );
};

export default TimesheetSummary;
