import InputWithForm from "@/components/form-hook/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const FullName = () => {
  const form = useForm();
  return (
    <FormProvider {...form}>
      <form className="px-5 flex-1 flex flex-col justify-between py-9 gap-10">
        <InputWithForm name={"full-name"} label={"Full Name"} />
        <Button>Save</Button>
      </form>
    </FormProvider>
  );
};

export default FullName;
