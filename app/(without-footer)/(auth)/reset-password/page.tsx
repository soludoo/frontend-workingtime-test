"use client";
import PasswordInputWithForm from "@/components/form-hook/password";
import PageTitleBack from "@/components/share/page-title-back";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";

const Page = () => {
  const form = useForm();
  return (
    <section className="flex flex-col h-full">
      <PageTitleBack title="Reset Password" className="px-0" />
      <FormProvider {...form}>
        <form className="flex flex-col justify-between h-full gap-6 py-5">
          <div className="flex flex-col gap-6">
            <h1 className="font-medium text-xl text-center">
              New password must be different from previously used
            </h1>
            <PasswordInputWithForm
              name="new_password"
              label="New Password"
              placeholder="Enter new password"
            />
            <PasswordInputWithForm
              name="confirm_password"
              label="Confirm New Password"
              placeholder="Re-type new password"
            />
          </div>
          <Button>Reset Password</Button>
        </form>
      </FormProvider>
    </section>
  );
};

export default Page;
