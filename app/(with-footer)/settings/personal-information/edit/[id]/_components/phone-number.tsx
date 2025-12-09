import PhoneInputWithForm from "@/components/form-hook/phone";
import { Button } from "@/components/ui/button";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const PhoneNumber = () => {
  const form = useForm();
  return (
    <FormProvider {...form}>
      <form className="px-5 flex-1 flex flex-col justify-between py-9 gap-10">
        <PhoneInputWithForm name={"phone-number"} label={"Phone Number"} />
        <Button>Save</Button>
      </form>
    </FormProvider>
  );
};

export default PhoneNumber;
