"use client";
import InputWithForm from "@/components/form-hook/input";
import PasswordInputWithForm from "@/components/form-hook/password";
import PhoneInputWithForm from "@/components/form-hook/phone";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "./register.schema";

const RegisterForm = () => {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
      phone_number: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (data: RegisterSchema) => {
    console.log(data);
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <InputWithForm
            name="full_name"
            label="Full name"
            placeholder="Enter your full name"
          />
          <InputWithForm
            name="email"
            type="email"
            label="Email address"
            placeholder="Enter your email address"
          />
          <PasswordInputWithForm
            name="password"
            label="Password"
            placeholder="Create your password"
          />
          <PasswordInputWithForm
            name="confirm_password"
            label="Confirm Password"
            placeholder="Re-type your password"
          />
          <PhoneInputWithForm
            name="phone_number"
            label="Phone number"
            placeholder="Enter your phone number"
          />
        </div>
        <Button className="text-sm">Create account</Button>
        <div className="w-full border-b border-border" />
        <div className="flex flex-col gap-4">
          <p className="text-body text-center text-sm">
            Already have an account?
          </p>
          <Button
            type="button"
            onClick={() => router.push("/login")}
            variant={"outline"}
            className="text-sm font-medium"
          >
            Sign in
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
