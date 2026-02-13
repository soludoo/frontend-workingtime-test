"use client";
import SelectDrawerWithForm from "@/components/form-hook/select-drawer";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputType from "./input-type";

const Content = () => {
  const form = useForm();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/leave/type");
      const { data } = await res.json();
      setOptions(
        data.leaveTypes.map((item: { id: string; name: string }) => ({
          key: item.id,
          label: item.name,
        })),
      );
    };
    fetchData();
  }, []);

  return (
    <FormProvider {...form}>
      <form className="flex-1 flex flex-col justify-between gap-10 py-5">
        <div className="flex flex-col gap-4">
          <SelectDrawerWithForm
            options={options}
            name="leaveTypeId"
            label="Type of leave"
            placeholder="Choose your type of leave"
          />
          <InputType />
        </div>
        <Button>Submit Request</Button>
      </form>
    </FormProvider>
  );
};

export default Content;
