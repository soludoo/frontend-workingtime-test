"use client";
import CardContent from "@/components/card/card-content";
import PageTitleAdmin from "@/components/share/page-title-admin";
import { Briefcase, CalendarClock, Clock2, User } from "lucide-react";
import Activity from "./activity";
import RecentActivity from "./recent-activity";
import RecentTable from "./recent-table";

const Content = () => {
  return (
    <section className="flex flex-col gap-8">
      <PageTitleAdmin
        title="Dashboard"
        description="Overview of employee activity and pending requests"
      />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <CardContent
            description="Total Employees"
            title="42 employees"
            icons={
              <div className="size-10 rounded-full bg-blue flex items-center justify-center">
                <User className="text-white size-5" />
              </div>
            }
          />
        </div>
        <div className="col-span-3">
          <CardContent
            description="Working Now"
            title="18 employees"
            icons={
              <div className="size-10 rounded-full bg-green flex items-center justify-center">
                <Briefcase className="text-white size-5" />
              </div>
            }
          />
        </div>
        <div className="col-span-3">
          <CardContent
            description="Pending Requests"
            title="7 pending"
            icons={
              <div className="size-10 rounded-full bg-yellow flex items-center justify-center">
                <Clock2 className="text-white size-5" />
              </div>
            }
          />
        </div>
        <div className="col-span-3">
          <CardContent
            description="Overtime Alerts"
            title="3 employees"
            icons={
              <div className="size-10 rounded-full bg-red flex items-center justify-center">
                <CalendarClock className="text-white size-5" />
              </div>
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <Activity />
        <RecentActivity />
      </div>
      <RecentTable />
    </section>
  );
};

export default Content;
