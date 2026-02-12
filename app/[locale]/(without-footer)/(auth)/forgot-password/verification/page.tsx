"use client";
import PageTitleBack from "@/components/share/page-title-back";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { FormProvider, useForm } from "react-hook-form";

const Page = () => {
  const form = useForm({
    defaultValues: {
      code: "",
    },
  });
  return (
    <section className="flex flex-col h-full">
      <PageTitleBack title="Forgot Password" className="px-0" />
      <FormProvider {...form}>
        <form className="flex flex-col justify-between h-full gap-6 py-5">
          <div className="flex flex-col gap-6">
            <h1 className="font-medium text-xl text-center">
              Please enter the 4 digit code sent to alexjane@milo.app
            </h1>
            <InputOTP
              maxLength={4}
              className="justify-center"
              value={form.watch("code")}
              onChange={(value) => form.setValue("code", value)}
            >
              <InputOTPGroup className="gap-3 mx-auto">
                <InputOTPSlot
                  index={0}
                  className="size-[70px] border border-border rounded-l-2xl rounded-2xl"
                />
                <InputOTPSlot
                  index={1}
                  className="size-[70px] border border-border rounded-l-2xl rounded-2xl"
                />
                <InputOTPSlot
                  index={2}
                  className="size-[70px] border border-border rounded-l-2xl rounded-2xl"
                />
                <InputOTPSlot
                  index={3}
                  className="size-[70px] border border-border rounded-l-2xl rounded-2xl"
                />
              </InputOTPGroup>
            </InputOTP>
            <p className="text-body text-sm text-center">
              Didn’t receive the code?{" "}
              <span className="underline text-primary cursor-pointer">
                Resend code
              </span>
            </p>
          </div>
          <Button>Continue</Button>
        </form>
      </FormProvider>
    </section>
  );
};

export default Page;
