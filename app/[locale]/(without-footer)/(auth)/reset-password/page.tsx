/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import PasswordInputWithForm from "@/components/form-hook/password";
import PageTitleBack from "@/components/share/page-title-back";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const passwordRules = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export const resetPasswordSchema = z
  .object({
    new_password: passwordRules,
    confirm_password: passwordRules,
    otp: z.string().optional(),
    email: z.string().optional(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

type FormData = z.infer<typeof resetPasswordSchema>;

const Page = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      otp: "",
      email: "",
      new_password: "",
      confirm_password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const search = useSearchParams();

  useEffect(() => {
    const email = search.get("email");
    const otp = search.get("otp");
    if (email) {
      form.setValue("email", email);
    }
    if (otp) {
      form.setValue("otp", otp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/forgot-password/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message || "Failed to reset password");
        return;
      }
      toast.success("Password reset successfully");
      router.push(`/reset-password/congratulation`);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong!!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col h-full">
      <PageTitleBack title="Reset Password" className="px-0" />
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between h-full gap-6 py-5"
        >
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
          <Button disabled={isLoading}>
            {isLoading && <Spinner className="size-5" />}Reset Password
          </Button>
        </form>
      </FormProvider>
    </section>
  );
};

export default Page;
