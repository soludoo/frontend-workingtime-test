/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import InputType from "./input-type";
import { Button } from "@/components/ui/button";
import SelectDrawerWithForm from "@/components/form-hook/select-drawer";
import { useEffect, useState } from "react";
import DatePickerWithForm from "@/components/form-hook/date-picker";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { format } from "date-fns";

const Content = () => {
  const form = useForm();
  const [options, setOptions] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const correctTypeId = useWatch({
    control: form.control,
    name: "correction_type_id",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/correction/type");
      const { data } = await res.json();
      setOptions(
        data.correction_types.map((item: { id: string; name: string }) => ({
          key: item.id,
          label: item.name,
        })),
      );
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!correctTypeId) return;

    form.reset(
      {
        correction_type_id: correctTypeId,
      },
      {
        keepDirty: false,
        keepTouched: false,
      },
    );
  }, [correctTypeId, form]);

  const onSubmit = async (data: any) => {
    try {
      const formattedDate = data.date
        ? format(new Date(data.date), "yyyy-MM-dd")
        : null;

      const payload = {
        ...data,
        date: formattedDate,
      };

      console.log(payload);
      setIsLoading(true);
      const res = await fetch(`/api/correction/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to update profile");
      }
      form.reset({});
      toast.success(result.message);
      router.push("/request-correction");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex-1 flex flex-col justify-between gap-10 py-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <DatePickerWithForm
            name="date"
            label="Select date"
            placeholder="Choose the date you want to correct"
          />
          <SelectDrawerWithForm
            options={options}
            name="correction_type_id"
            label="Issue"
            placeholder="Choose your type of issue"
          />
          <InputType />
        </div>
        <Button disabled={isLoading}>
          {isLoading && <Spinner className="size-5" />}Submit Request
        </Button>
      </form>
    </FormProvider>
  );
};

export default Content;
