/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import InputWithForm from "@/components/form-hook/input";
import PasswordInputWithForm from "@/components/form-hook/password";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "./login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useTranslations } from "next-intl";

const LoginForm = () => {
  const t = useTranslations("login");
  const [isLoading, setIsLoading] = useState(false);
  const search = useSearchParams();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "baransyahputrazuanda@gmail.com",
      password: "zuanda21",
    },
  });
  const router = useRouter();

  const onSubmit = async (data: LoginSchema) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Login failed");
        return;
      }
      if (search.get("changePassword")) {
        router.push("/password");
      } else {
        router.push("/");
      }
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
          <InputWithForm name="email" type="email" label={t("emailLabel")} />
          <PasswordInputWithForm name="password" label={t("passwordLabel")} />
          <Link
            href={"/forgot-password"}
            className="text-primary text-xs w-fit"
          >
            {t("forgotPassword")}
          </Link>
        </div>
        <Button className="text-sm" disabled={isLoading}>
          {isLoading && <Spinner />}
          {t("signIn")}
        </Button>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
