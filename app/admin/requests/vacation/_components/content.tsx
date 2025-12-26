"use client";
import PageTitleAdmin from "@/components/share/page-title-admin";
import EmployeeTable from "./employee-table";

const Content = () => {
  return (
    <section className="flex flex-col gap-8">
      <PageTitleAdmin
        title="Vacation Requests"
        description="Manage and review employee vacation requests."
      />
      <EmployeeTable />
    </section>
  );
};

export default Content;
