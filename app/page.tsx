/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Power, Coffee } from "lucide-react";
import React, { useEffect, useState } from "react";
import ClockInModal from "@/components/modals/clock-in";
import ReasonModal from "@/components/modals/reason";

let db: any = null;

interface AttendanceEvent {
  type:
    | "clock_in"
    | "clock_out"
    | "break_start"
    | "break_end"
    | "leave"
    | "sick";
  time: string;
  reason?: string;
}

interface Attendance {
  _id: string;
  date: string;
  events: AttendanceEvent[];
}

const WORK_GOAL_HOURS = 8;
const WORK_GOAL_MS = WORK_GOAL_HOURS * 60 * 60 * 1000;

const Page = () => {
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [isModalClockInOpen, setIsModalClockInOpen] = useState(false);
  const [isModalReasonOpen, setIsModalReasonOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [workTimeText, setWorkTimeText] = useState("0h 0m");
  const todayId = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (typeof window === "undefined") return;

    (async () => {
      const PouchDB = (await import("pouchdb-browser")).default;
      db = new PouchDB("attendance_db");
      fetchData();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    if (!db) return;
    try {
      const doc = await db.get(todayId);
      setAttendance(doc);
    } catch (err: any) {
      if (err.status === 404) setAttendance(null);
      else console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayId]);

  useEffect(() => {
    if (!attendance) return;
    const clockInEvent = attendance.events.find((e) => e.type === "clock_in");
    if (!clockInEvent) return;

    const calculateProgress = () => {
      const startTime = new Date(clockInEvent.time).getTime();
      const lastEvent = attendance.events[attendance.events.length - 1];
      const endTime =
        lastEvent.type === "clock_out"
          ? new Date(lastEvent.time).getTime()
          : Date.now();

      const breakPairs = [];
      for (let i = 0; i < attendance.events.length; i++) {
        if (attendance.events[i].type === "break_start") {
          const breakStart = new Date(attendance.events[i].time).getTime();
          const breakEndEvent = attendance.events.find(
            (e, idx) => idx > i && e.type === "break_end"
          );
          if (breakEndEvent) {
            const breakEnd = new Date(breakEndEvent.time).getTime();
            breakPairs.push(breakEnd - breakStart);
          }
        }
      }

      const totalBreakMs = breakPairs.reduce((a, b) => a + b, 0);
      const diff = endTime - startTime - totalBreakMs;

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setWorkTimeText(`${hours}h ${minutes}m`);

      const percentage = Math.min((diff / WORK_GOAL_MS) * 100, 100);
      setProgress(percentage);
    };

    calculateProgress();
    const interval = setInterval(calculateProgress, 60 * 1000);
    return () => clearInterval(interval);
  }, [attendance]);

  const addEvent = async (type: AttendanceEvent["type"], reason?: string) => {
    const now = new Date().toISOString();
    let doc: Attendance;
    try {
      doc = await db.get(todayId);
    } catch (err: any) {
      if (err.status === 404) {
        doc = { _id: todayId, date: todayId, events: [] };
      } else {
        console.error(err);
        return;
      }
    }

    doc.events.push({ type, time: now, reason });
    await db.put(doc);
    setAttendance(doc);
  };

  const renderButton = () => {
    if (!attendance) {
      return (
        <Button
          variant="rounded"
          size="big"
          onClick={() => setIsModalClockInOpen(true)}
        >
          Clock In
        </Button>
      );
    }

    const last = attendance.events[attendance.events.length - 1];
    switch (last.type) {
      case "clock_in":
        return (
          <Button
            onClick={() => setIsModalReasonOpen(true)}
            variant="rounded"
            size="big"
          >
            Clock Out
          </Button>
        );
      case "break_start":
        return (
          <Button
            onClick={async () => {
              await addEvent("break_end", "");
            }}
            variant="rounded"
            size="big"
          >
            Resume Work
          </Button>
        );
      case "clock_out":
        return;
      default:
        return (
          <Button
            onClick={() => setIsModalReasonOpen(true)}
            variant="rounded"
            size="big"
          >
            Clock Out
          </Button>
        );
    }
  };

  return (
    <>
      <ClockInModal
        open={isModalClockInOpen}
        onClose={() => setIsModalClockInOpen(false)}
        onSelect={async (type, reason) => {
          await addEvent(type, reason);
          setIsModalClockInOpen(false);
        }}
      />
      <ReasonModal
        open={isModalReasonOpen}
        onClose={() => setIsModalReasonOpen(false)}
        onSelect={async (type, reason) => {
          await addEvent(type, reason);
          setIsModalReasonOpen(false);
        }}
      />
      <section className="bg-background flex flex-col gap-5 items-center py-10 px-4 justify-between h-screen max-w-lg mx-auto">
        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-2 items-center">
            <h1 className="text-2xl font-semibold">Absence Tracking</h1>
            <p className="text-blue-600">
              {!attendance
                ? "Not clocked in"
                : (() => {
                    const last =
                      attendance.events[attendance.events.length - 1];
                    const time = new Date(last.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    switch (last.type) {
                      case "clock_in":
                        return `Working since ${time}`;
                      case "break_start":
                        return `Break since ${time}`;
                      case "break_end":
                        return `Working again since ${time}`;
                      case "clock_out":
                        return `Finished Work at ${time}`;
                      case "leave":
                        return `Leave - ${last.reason ?? "No reason provided"}`;
                      case "sick":
                        return `Sick leave - ${
                          last.reason ?? "No reason provided"
                        }`;
                      default:
                        return `Active: ${last.type}`;
                    }
                  })()}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="default">
              {new Date().toLocaleDateString("en-US", { weekday: "long" })}
            </Badge>
            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              <p className="text-xs">{todayId}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 px-5 items-center w-full">
          {renderButton()}
          {attendance && (
            <div className="flex flex-col gap-5 p-5 bg-white rounded w-full">
              <h2 className="text-black font-bold text-start">
                Today’s Timeline
              </h2>
              <ul className="flex flex-col gap-3">
                {attendance.events.map((e: any, i) => (
                  <li key={i} className="flex items-center gap-2">
                    {e.type === "clock_in" && <Clock />}
                    {e.type === "clock_out" && <Power />}
                    {e.type.includes("break") && <Coffee />}
                    <p className="text-black">
                      {new Date(e.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {(() => {
                        switch (e.type) {
                          case "clock_in":
                            return "Start working";
                          case "break_start":
                            return "Break started";
                          case "break_end":
                            return "Break ended";
                          case "clock_out":
                            return "Work finished";
                          case "leave":
                            return "Leave";
                          case "sick":
                            return "Sick leave";
                          default:
                            return e.type.replace("_", " ");
                        }
                      })()}
                      {e.reason ? ` (${e.reason})` : ""}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full px-5">
          <p className="text-black/70 text-sm text-center">
            {workTimeText} / {WORK_GOAL_HOURS}h 24m goal reached
          </p>
          <Progress value={progress} className="w-full" />
        </div>
      </section>
    </>
  );
};

export default Page;
