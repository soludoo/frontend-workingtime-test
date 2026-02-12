"use client";
import { FormProvider, useForm } from "react-hook-form";
import InputType from "./input-type";
import { Button } from "@/components/ui/button";
import SelectDrawerWithForm from "@/components/form-hook/select-drawer";
import DateRangePicker from "@/components/form-hook/date-range";
import { useEffect, useState } from "react";

const Content = () => {
  const form = useForm();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/correction/type");
      const { data } = await res.json();
      setOptions(
        data.map((item: { id: string; name: string }) => ({
          key: item.id,
          label: item.name,
        }))
      );
    };
    fetchData();
  }, []);

  return (
    <FormProvider {...form}>
      <form className="flex-1 flex flex-col justify-between gap-10 py-5">
        <div className="flex flex-col gap-4">
          <DateRangePicker
            startName="startDate"
            endName="endDate"
            label="Date range"
            placeholder="Choose your date range"
          />
          <SelectDrawerWithForm
            options={options}
            name="correctionType"
            label="Issue"
            placeholder="Choose your type of issue"
          />
          <InputType />
        </div>
        <Button>Submit Request</Button>
      </form>
    </FormProvider>
  );
};

export default Content;
