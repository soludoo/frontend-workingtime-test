"use client";
import InputWithForm from "@/components/form-hook/input";
import PasswordInputWithForm from "@/components/form-hook/password";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "./login.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (data: LoginSchema) => {
    console.log(data);
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <InputWithForm name="email" type="email" label="Email address" />
          <PasswordInputWithForm name="password" label="Password" />
          <Link href={"/forgot-password"} className="text-primary text-xs">
            Forgot password?
          </Link>
        </div>
        <Button className="text-sm">Sign In</Button>
        <div className="w-full border-b border-border" />
        <div className="flex flex-col gap-4">
          <p className="text-body text-center text-sm">
            Don{"'"}t have an account yet?
          </p>
          <Button
            type="button"
            onClick={() => router.push("/register")}
            variant={"outline"}
            className="text-sm font-medium"
          >
            Create account
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
