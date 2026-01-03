"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const STORAGE_KEY = "work-tracker";

type WorkState = {
  firstStartAt: number | null;
  lastStartAt: number | null;
  totalWorkedMs: number;
  isWorking: boolean;
  isPaused: boolean;
  isContinue: boolean;
};

const initialState: WorkState = {
  firstStartAt: null,
  lastStartAt: null,
  totalWorkedMs: 0,
  isWorking: false,
  isPaused: false,
  isContinue: false,
};

export const useWorkTracker = () => {
  const [hydrated, setHydrated] = useState(false);
  const [state, setState] = useState<WorkState>(initialState);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      setHydrated(true);
      return;
    }

    const saved: WorkState = JSON.parse(raw);

    if (saved.isWorking && !saved.isPaused && saved.lastStartAt) {
      const now = Date.now();
      saved.totalWorkedMs += now - saved.lastStartAt;
      saved.lastStartAt = now;
    }

    setState(saved);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const start = async () => {
    try {
      const now = Date.now();
      const res = await fetch(`/api/timer/start`, {
        method: "POST",
        body: JSON.stringify({
          force: true,
        }),
      });
      const response = await res.json();
      if (!res.ok) {
        toast.error(response?.message);
        return;
      }
      setState((prev) => ({
        ...prev,
        isWorking: true,
        isPaused: false,
        isContinue: false,
        firstStartAt: prev.firstStartAt ?? now,
        lastStartAt: now,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const pause = async () => {
    try {
      const res = await fetch(`/api/timer/pause`, {
        method: "POST",
        body: JSON.stringify({}),
      });
      const response = await res.json();
      if (!res.ok) {
        toast.error(response?.message);
        return;
      }
      setState((prev) => {
        if (!prev.lastStartAt) return prev;
        const now = Date.now();
        return {
          ...prev,
          totalWorkedMs: prev.totalWorkedMs + (now - prev.lastStartAt),
          lastStartAt: null,
          isPaused: true,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const resume = async () => {
    try {
      const res = await fetch(`/api/timer/pause`, {
        method: "POST",
        body: JSON.stringify({}),
      });
      const response = await res.json();
      if (!res.ok) {
        toast.error(response?.message);
        return;
      }
      setState((prev) => ({
        ...prev,
        lastStartAt: Date.now(),
        isPaused: false,
        isContinue: true,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const stop = async () => {
    try {
      const res = await fetch(`/api/timer/stop`, {
        method: "POST",
        body: JSON.stringify({}),
      });
      const response = await res.json();
      if (!res.ok) {
        toast.error(response?.message);
        return;
      }
      localStorage.removeItem(STORAGE_KEY);
      setState(initialState);
    } catch (error) {
      console.log(error);
    }
  };

  const totalWorkedMs =
    state.isWorking && !state.isPaused && state.lastStartAt
      ? state.totalWorkedMs + (Date.now() - state.lastStartAt)
      : state.totalWorkedMs;

  useEffect(() => {
    if (!state.isWorking || state.isPaused || !state.lastStartAt) return;

    const interval = setInterval(() => {
      setState((prev) => ({ ...prev }));
    }, 60_000);

    return () => clearInterval(interval);
  }, [state.isWorking, state.isPaused, state.lastStartAt]);

  return {
    state,
    hydrated,
    start,
    pause,
    resume,
    stop,
    totalWorkedMs,
  };
};
