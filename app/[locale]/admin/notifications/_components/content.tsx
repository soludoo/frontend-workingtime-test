"use client";
import PageTitleAdmin from "@/components/share/page-title-admin";
import Filter from "./filter";
import Notifications from "./notifications";

const Content = () => {
  return (
    <section className="flex flex-col gap-8">
      <PageTitleAdmin
        title="Notifications"
        description="Stay updated with requests, approvals, and system activity."
      />
      <div className="flex flex-col gap-5">
        <Filter />
        <Notifications />
      </div>
    </section>
  );
};

export default Content;
