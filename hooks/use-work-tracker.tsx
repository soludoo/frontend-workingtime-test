/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  startWorking,
  pauseWorking,
  resumeWorking,
  stopWorking,
  getActiveSession,
  getTodaySession,
} from "@/lib/work-session";

export const useWorkTracker = () => {
  const [data, setData] = useState<any>(null);

  const load = async () => {
    const active = await getActiveSession();

    if (active) {
      setData({
        ...active,
        hasActiveTimer: true,
      });
      return;
    }

    const today = await getTodaySession();

    if (today) {
      setData({
        ...today,
        hasActiveTimer: false,
      });
      return;
    }
    setData({
      hasActiveTimer: false,
      status: "idle",
      breaks: [],
    });
  };

  useEffect(() => {
    const handleFocus = () => load();

    window.addEventListener("focus", handleFocus);

    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  useEffect(() => {
    load();

    const interval = setInterval(() => {
      load();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const start = async (v: any) => {
    await startWorking(v);
    await load();
  };

  const pause = async (v: any) => {
    await pauseWorking(v);
    await load();
  };

  const resume = async () => {
    await resumeWorking();
    await load();
  };

  const stop = async () => {
    await stopWorking();
    await load();
  };

  return {
    start,
    pause,
    resume,
    stop,
    data,
  };
};
