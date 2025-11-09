import React from "react";
import Header from "./header";
import ClockContent from "./clock";
import WorkSummary from "./work-summary";

const Content = () => {
  return (
    <div className="flex flex-col gap-6">
      <Header />
      <ClockContent />
      <WorkSummary />
    </div>
  );
};

export default Content;
