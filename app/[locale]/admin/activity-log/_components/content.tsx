"use client";
import PageTitleAdmin from "@/components/share/page-title-admin";
import Filter from "./filter";
import Activity from "./activity";

const Content = () => {
  return (
    <section className="flex flex-col gap-8">
      <PageTitleAdmin
        title="Activity Log"
        description="A record of important actions and system events in your organization."
      />
      <div className="flex flex-col gap-6">
        <Filter />
        <Activity />
      </div>
    </section>
  );
};

export default Content;
