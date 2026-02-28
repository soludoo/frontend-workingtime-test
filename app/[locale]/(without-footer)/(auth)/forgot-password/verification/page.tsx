/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import PageTitleBack from "@/components/share/page-title-back";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  otp: string;
  email: string;
};

const Page = () => {
  const form = useForm<FormData>({
    defaultValues: {
      otp: "",
      email: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const search = useSearchParams();

  useEffect(() => {
    const email = search.get("email");
    if (email) {
      form.setValue("email", email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/forgot-password/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to verify OTP");
        return;
      }
      toast.success("OTP verified successfully");
      router.push(`/reset-password?email=${data.email}&otp=${data.otp}`);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong!!");
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/forgot-password/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: form.watch("email") }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to resend OTP");
        return;
      }
      toast.success("OTP resent successfully");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong!!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col h-full">
      <PageTitleBack title="Forgot Password" className="px-0" />
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between h-full gap-6 py-5"
        >
          <div className="flex flex-col gap-6">
            <h1 className="font-medium text-xl text-center">
              Please enter the 4 digit otp sent to {form?.watch("email")}
            </h1>
            <InputOTP
              maxLength={4}
              className="justify-center"
              value={form.watch("otp")}
              onChange={(value) => form.setValue("otp", value)}
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
              Didn’t receive the otp?{" "}
              <span
                onClick={resendOtp}
                className="underline text-primary cursor-pointer"
              >
                Resend OTP
              </span>
            </p>
          </div>
          <Button
            disabled={
              isLoading || !form.watch("otp") || form.watch("otp").length < 4
            }
          >
            Continue
          </Button>
        </form>
      </FormProvider>
    </section>
  );
};

export default Page;
