"use client";
import BackAdmin from "@/components/share/back-admin";
import PageTitleAdmin from "@/components/share/page-title-admin";
import { Button } from "@/components/ui/button";
import PhotoBackground from "../_components/photo-background";
import PersonalInformation from "./_components/personal-information";
import { FormProvider, useForm } from "react-hook-form";
import WorkInformation from "./_components/work-information";

const Content = () => {
  const form = useForm();
  return (
    <FormProvider {...form}>
      <section className="flex flex-col gap-8 pb-28">
        <BackAdmin />
        <PageTitleAdmin
          title="Edit Employee"
          description="Update employee personal and work information"
        />
        <PhotoBackground />
        <div className="flex gap-5">
          <PersonalInformation />
          <WorkInformation />
        </div>
        <div className="fixed bg-white w-full pl-[332px] h-20 border-t border-border bottom-0 flex items-center justify-between gap-10 right-0 z-0 px-8">
          <Button variant={"outline-admin"} className="w-fit" size={"lg"}>
            Cancel
          </Button>
          <Button variant={"admin"} className="w-fit" size={"lg"}>
            Save Changes
          </Button>
        </div>
      </section>
    </FormProvider>
  );
};

export default Content;
