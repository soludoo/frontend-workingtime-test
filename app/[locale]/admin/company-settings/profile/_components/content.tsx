"use client";
import PageTitleAdmin from "@/components/share/page-title-admin";
import { Button } from "@/components/ui/button";
import Information from "./information";
import { FormProvider, useForm } from "react-hook-form";
import Theme from "./theme";
import Info from "./info";

const Content = () => {
  const form = useForm();
  return (
    <FormProvider {...form}>
      <form className="relative flex flex-col gap-8 h-full pb-28">
        <PageTitleAdmin
          title="Company Profile"
          description="Manage your organization’s profile, working hours, preferences, and other settings."
        />
        <Information />
        <div className="bg-border w-full h-px" />
        <Theme />
        <div className="bg-border w-full h-px" />
        <Info />
        <div className="fixed bg-white w-full h-20 border-t border-border bottom-0 flex items-center justify-end right-0 z-0 px-8">
          <Button variant={"admin"} className="w-fit" size={"lg"}>
            Save Change
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Content;
