"use client";
import PageTitleAdmin from "@/components/share/page-title-admin";
import EmployeeTable from "./employee-table";

const Content = () => {
  return (
    <section className="flex flex-col gap-8">
      <PageTitleAdmin
        title="Timesheets"
        description="Review and manage employee working hours."
      />
      <EmployeeTable />
    </section>
  );
};

export default Content;
