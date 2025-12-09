import PasswordInputWithForm from "@/components/form-hook/password";
import { Button } from "@/components/ui/button";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const Password = () => {
  const form = useForm();
  return (
    <FormProvider {...form}>
      <form className="px-5 flex-1 flex flex-col justify-between py-9 gap-10">
        <div className="flex flex-col gap-5">
          <PasswordInputWithForm name={"password"} label={"Enter Password"} />
          <PasswordInputWithForm
            name={"new-password"}
            label={"Enter new password"}
          />
        </div>

        <Button>Save</Button>
      </form>
    </FormProvider>
  );
};

export default Password;
