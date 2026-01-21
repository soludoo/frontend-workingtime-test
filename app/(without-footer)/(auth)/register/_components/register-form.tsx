"use client";
import PasswordInputWithForm from "@/components/form-hook/password";
import { Button } from "@/components/ui/button";
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
          <PasswordInputWithForm
            name="password"
            label="New Password"
            placeholder="Enter your password"
          />
          <PasswordInputWithForm
            name="confirm_password"
            label="Confirm Password"
            placeholder="Re-type your password"
          />
        </div>
        <Button className="text-sm">Create account</Button>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
