/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export const useWorkTracker = () => {
  const [data, setData] = useState<any>(undefined);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/timer/current");
      if (!res.ok) {
        router.refresh();
      }

      const json = await res.json();
      setData(json.data);
    } catch (err) {
      console.error("Fetch timer error:", err);
    }
  }, [router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, [fetchData]);

  const start = async (value: any) => {
    try {
      const res = await fetch(`/api/timer/start`, {
        method: "POST",
        body: JSON.stringify({
          force: true,
          ...value,
        }),
      });
      const response = await res.json();
      if (!res.ok) {
        toast.error(response?.message);
        return;
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const pause = async (value: any) => {
    try {
      const res = await fetch(`/api/timer/pause`, {
        method: "POST",
        body: JSON.stringify({
          ...value,
        }),
      });
      const response = await res.json();
      if (!res.ok) {
        toast.error(response?.message);
        return;
      }
      fetchData();
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
      fetchData();
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
      fetchData();
      toast.success("Clocked out successfully. ");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    start,
    pause,
    resume,
    stop,
    data,
  };
};
