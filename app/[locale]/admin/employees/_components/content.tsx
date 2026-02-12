"use client";
import PageTitleAdmin from "@/components/share/page-title-admin";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import EmployeeTable from "./employee-table";

const Content = () => {
  return (
    <section className="flex flex-col gap-8">
      <PageTitleAdmin
        title="Employees"
        description="Manage employee accounts, roles, and working information."
      >
        <Button className="w-fit" variant={"admin"} size={"lg"}>
          <Plus />
          Invite employee
        </Button>
      </PageTitleAdmin>
      <EmployeeTable />
    </section>
  );
};

export default Content;
