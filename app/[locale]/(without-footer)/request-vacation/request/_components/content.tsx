/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import SelectDrawerWithForm from "@/components/form-hook/select-drawer";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import InputType from "./input-type";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

const Content = () => {
  const form = useForm();
  const leaveTypeId = useWatch({
    control: form.control,
    name: "leave_type_id",
  });

  const router = useRouter();
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/leave/type");
      const { data } = await res.json();
      setOptions(
        data.leave_types.map((item: { id: string; name: string }) => ({
          key: item.id,
          label: item.name,
        })),
      );
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!leaveTypeId) return;

    form.reset(
      {
        leave_type_id: leaveTypeId,
      },
      {
        keepDirty: false,
        keepTouched: false,
      },
    );
  }, [leaveTypeId, form]);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/leave/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to update profile");
      }
      form.reset({});
      toast.success(result.message);
      router.push("/request-vacation");
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
          <SelectDrawerWithForm
            options={options}
            name="leave_type_id"
            label="Type of leave"
            placeholder="Choose your type of leave"
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
