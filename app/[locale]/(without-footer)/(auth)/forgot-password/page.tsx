/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import InputWithForm from "@/components/form-hook/input";
import PageTitleBack from "@/components/share/page-title-back";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  email: string;
};

const Page = () => {
  const form = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/forgot-password/request-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to request OTP");
        return;
      }
      toast.success("OTP sent to your email");
      router.push(`/forgot-password/verification?email=${data.email}`);
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
              Please enter your e-mail address to receive a verification code
            </h1>
            <InputWithForm
              label="Email address"
              type="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Spinner className="size-5" />} Reset Password
          </Button>
        </form>
      </FormProvider>
    </section>
  );
};

export default Page;
