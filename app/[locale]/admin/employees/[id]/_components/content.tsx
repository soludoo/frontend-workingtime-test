"use client";
import BackAdmin from "@/components/share/back-admin";
import PageTitleAdmin from "@/components/share/page-title-admin";
import { Button } from "@/components/ui/button";
import PhotoBackground from "./photo-background";
import Information from "./information";
import TimesheetSummary from "./timesheet-summary";
import Requests from "./requests";
import RecentActivity from "./recent-activity";
import Link from "next/link";
import { useParams } from "next/navigation";

const Content = () => {
  const params = useParams();

  return (
    <section className="flex flex-col gap-8 pb-28">
      <BackAdmin />
      <PageTitleAdmin title="Employee Detail" />
      <PhotoBackground />
      <Information />
      <TimesheetSummary />
      <div className="flex justify-between gap-5">
        <Requests />
        <RecentActivity />
      </div>
      <div className="fixed bg-white w-full pl-[332px] h-20 border-t border-border bottom-0 flex items-center justify-between gap-10 right-0 z-0 px-8">
        <Button variant={"destructive"} className="w-fit" size={"lg"}>
          Delete Account
        </Button>
        <div className="flex items-center gap-3">
          <Button variant={"outline-admin"} className="w-fit" size={"lg"}>
            Deactivate employee
          </Button>
          <Link href={`/admin/employees/${params.id}/edit`}>
            <Button variant={"admin"} className="w-fit" size={"lg"}>
              Edit Employee
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Content;
