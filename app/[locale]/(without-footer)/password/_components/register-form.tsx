/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import PasswordInputWithForm from "@/components/form-hook/password";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "./register.schema";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

const RegisterForm = () => {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: RegisterSchema) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to change your password");
        return;
      }
      toast.success("Successfully change your password, please login again");
      router.push("/login");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong!!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <PasswordInputWithForm
            name="current_password"
            label="Current Password"
            placeholder="Enter your current password"
          />
          <PasswordInputWithForm
            name="new_password"
            label="New Password"
            placeholder="Enter your password"
          />
          <PasswordInputWithForm
            name="confirm_password"
            label="Confirm Password"
            placeholder="Re-type your password"
          />
        </div>
        <Button disabled={isLoading} className="text-sm">
          {isLoading && <Spinner className="size-5" />}Change Password
        </Button>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
