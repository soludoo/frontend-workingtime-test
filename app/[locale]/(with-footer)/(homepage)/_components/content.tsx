"use client";
import Header from "./header";
import ClockContent from "./clock";
import WorkSummary from "./work-summary";
import { Spinner } from "@/components/ui/spinner";
import { useWorkTracker } from "@/hooks/use-work-tracker";
import { useEffect, useState } from "react";

const Content = () => {
  const { data, start, pause, resume, stop } = useWorkTracker();
  const [summary, setSummary] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/timer/work-summary`);
      const { data } = await res.json();
      setSummary(data);
    };

    fetchData();
  }, []);

  if (!data) {
    return <Spinner color="loading" className="mx-auto my-auto size-6" />;
  }

  return (
    <div className="flex flex-col gap-6">
      <Header summary={summary} />
      <ClockContent
        data={data}
        start={start}
        pause={pause}
        resume={resume}
        stop={stop}
      />
      <WorkSummary summary={summary} data={data} />
    </div>
  );
};

export default Content;
