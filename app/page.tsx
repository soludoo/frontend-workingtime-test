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

      const existing = await db.allDocs({ include_docs: true });
      const todayDoc = existing.rows.find((r: any) => r.id === todayId);

      if (todayDoc) {
        setAttendance(todayDoc.doc);
      } else {
        const newDoc: Attendance = { _id: todayId, date: todayId, events: [] };
        await db.put(newDoc);
        setAttendance(newDoc);
      }
    })();
  }, [todayId]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const currentId = new Date().toISOString().split("T")[0];
      if (currentId !== todayId && db) {
        try {
          const exists = await db.get(currentId).catch(() => null);
          if (exists) setAttendance(exists);
          else {
            const newDoc: Attendance = {
              _id: currentId,
              date: currentId,
              events: [],
            };
            await db.put(newDoc);
            setAttendance(newDoc);
          }
        } catch (err) {
          console.error("Error creating new day doc:", err);
        }
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [todayId]);

  useEffect(() => {
    if (!attendance) return;
    const clockInEvent = attendance.events.find((e) => e.type === "clock_in");
    if (!clockInEvent) return;

    const calculateProgress = () => {
      const startTime = new Date(clockInEvent.time).getTime();
      const lastEvent = attendance.events[attendance.events.length - 1];
      const now = Date.now();

      const endTime =
        lastEvent.type === "clock_out"
          ? new Date(lastEvent.time).getTime()
          : now;

      const breakPairs: [number, number][] = [];
      let currentBreakStart: number | null = null;

      for (const e of attendance.events) {
        if (e.type === "break_start") {
          currentBreakStart = new Date(e.time).getTime();
        } else if (e.type === "break_end" && currentBreakStart) {
          const breakEnd = new Date(e.time).getTime();
          breakPairs.push([currentBreakStart, breakEnd]);
          currentBreakStart = null;
        }
      }

      if (currentBreakStart) {
        const ongoingBreak: any = [currentBreakStart, now];
        breakPairs.push(ongoingBreak);
      }

      const totalBreakMs = breakPairs.reduce(
        (sum, [start, end]) => sum + (end - start),
        0
      );

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
    if (!db) return;
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
    if (!attendance || attendance.events.length === 0) {
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
              await addEvent("break_end");
            }}
            variant="rounded"
            size="big"
          >
            Resume Work
          </Button>
        );
      case "clock_out":
        return <p className="text-green-600 font-semibold">✅ Completed</p>;
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
      <section className="bg-background flex flex-col gap-5 items-center py-5 px-4 justify-between min-h-[calc(100vh-75px)] max-w-lg mx-auto">
        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-2 items-center">
            <h1 className="text-2xl font-semibold">Absence Tracking</h1>
            <p className="text-blue-600">
              {!attendance || attendance.events.length === 0
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
        <div className="flex flex-col gap-8 md:px-5 items-center w-full">
          {renderButton()}
          {attendance && attendance.events.length > 0 && (
            <div className="flex flex-col gap-5 p-5 bg-white rounded w-full md:max-h-[400px] max-h-[300px] overflow-y-auto">
              <h2 className="text-black font-bold text-start">
                Today’s Timeline
              </h2>
              <ul className="flex flex-col gap-3">
                {attendance.events.map((e: any, i) => (
                  <li key={i} className="flex items-center gap-2">
                    {e.type === "clock_in" && (
                      <Clock className="min-w-6 min-h-6 text-green-500" />
                    )}
                    {e.type === "clock_out" && (
                      <Power className="min-w-6 min-h-6 text-red-600" />
                    )}
                    {e.type.includes("break") && (
                      <Coffee className="min-w-6 min-h-6 text-yellow-500" />
                    )}
                    <p className="text-black text-sm md:text-base">
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
        <div className="flex flex-col gap-2 w-full md:px-5">
          <p className="text-black/70 text-sm text-center">
            {workTimeText} / {WORK_GOAL_HOURS}h goal reached
          </p>
          <Progress value={progress} className="w-full" />
        </div>
      </section>
    </>
  );
};

export default Page;
