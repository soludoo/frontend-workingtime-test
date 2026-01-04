"use client";
import Header from "./header";
import ClockContent from "./clock";
import WorkSummary from "./work-summary";
import { Spinner } from "@/components/ui/spinner";
import { useWorkTracker } from "@/hooks/use-work-tracker";

const Content = () => {
  const { data } = useWorkTracker();

  if (!data) {
    return <Spinner color="loading" className="mx-auto my-auto size-6" />;
  }

  return (
    <div className="flex flex-col gap-6">
      <Header />
      <ClockContent />
      <WorkSummary data={data} />
    </div>
  );
};

export default Content;
