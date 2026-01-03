"use client";
import Header from "./header";
import ClockContent from "./clock";
import WorkSummary from "./work-summary";
import { useWorkTracker } from "@/hooks/use-work-tracker";
import { Spinner } from "@/components/ui/spinner";

const Content = () => {
  const { hydrated } = useWorkTracker();

  if (!hydrated) {
    return <Spinner color="loading" className="mx-auto my-auto size-6" />;
  }

  return (
    <div className="flex flex-col gap-6">
      <Header />
      <ClockContent />
      <WorkSummary />
    </div>
  );
};

export default Content;
