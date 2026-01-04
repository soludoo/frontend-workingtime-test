/* eslint-disable @typescript-eslint/no-explicit-any */
import InputWithForm from "@/components/form-hook/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = {
  first_name: string;
  last_name: string;
};

const FullName = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: {
      first_name: "",
      last_name: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/settings/profile`);
      const {
        data: { user },
      } = await res.json();
      form.reset({
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
      });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/settings/profile/name`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: data.first_name.trim(),
          last_name: data.last_name.trim(),
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to update profile");
      }
      form.reset({
        first_name: result.data?.user?.first_name ?? data.first_name,
        last_name: result.data?.user?.last_name ?? data.last_name,
      });
      toast.success(result.message);
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
        onSubmit={form.handleSubmit(onSubmit)}
        className="px-5 flex-1 flex flex-col justify-between py-9 gap-10"
      >
        <div className="flex flex-col gap-4">
          <InputWithForm name={"first_name"} label={"First Name"} />
          <InputWithForm name={"last_name"} label={"Last Name"} />
        </div>
        <Button disabled={isLoading}>
          {isLoading && <Spinner />}
          Save
        </Button>
      </form>
    </FormProvider>
  );
};

export default FullName;
