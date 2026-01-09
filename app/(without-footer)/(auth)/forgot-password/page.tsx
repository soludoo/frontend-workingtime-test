"use client";
import InputWithForm from "@/components/form-hook/input";
import PageTitleBack from "@/components/share/page-title-back";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";

const Page = () => {
  const form = useForm();
  return (
    <section className="flex flex-col h-full">
      <PageTitleBack title="Forgot Password" className="px-0" />
      <FormProvider {...form}>
        <form className="flex flex-col justify-between h-full gap-6 py-5">
          <div className="flex flex-col gap-6">
            <h1 className="font-medium text-xl text-center">
              Please enter your e-mail address to receive a verification code
            </h1>
            <InputWithForm
              label="Email address"
              type="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <Button>Reset Password</Button>
        </form>
      </FormProvider>
    </section>
  );
};

export default Page;
