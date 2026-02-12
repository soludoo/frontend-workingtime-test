"use client";
import DatePickerWithForm from "@/components/form-hook/date-picker";
import InputWithForm from "@/components/form-hook/input";
import TextAreaWithForm from "@/components/form-hook/text-area";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";

const Content = () => {
  const form = useForm();
  return (
    <FormProvider {...form}>
      <form className="flex flex-col justify-between h-full p-5">
        <div className="flex flex-col gap-4">
          <DatePickerWithForm
            name="date"
            label="Select Date"
            placeholder="Choose the date you want to correct"
          />
          <InputWithForm
            type="time"
            name="start_time"
            label="Start Time"
            className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            placeholder="When you started working."
          />
          <InputWithForm
            type="time"
            name="end_time"
            label="End Time"
            className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            placeholder="When you finished working."
          />
          <TextAreaWithForm
            name="comment"
            label="Comment (Optional)"
            className="h-30"
            placeholder="Explain the reason…"
          />
        </div>
        <Button className="text-sm">Save manual entry</Button>
      </form>
    </FormProvider>
  );
};

export default Content;
