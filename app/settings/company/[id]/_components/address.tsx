import TextAreaWithForm from "@/components/form-hook/text-area";
import { Button } from "@/components/ui/button";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const Address = () => {
  const form = useForm();
  return (
    <FormProvider {...form}>
      <form className="px-5 flex-1 flex flex-col justify-between py-9 gap-10">
        <TextAreaWithForm name={"address"} label={"Address"} />
        <Button>Save</Button>
      </form>
    </FormProvider>
  );
};

export default Address;
