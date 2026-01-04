/* eslint-disable @typescript-eslint/no-explicit-any */
import InputWithForm from "@/components/form-hook/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = {
  company_name: string;
};

const CompanyName = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: {
      company_name: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/settings/company`);
      const {
        data: { company },
      } = await res.json();
      form.reset({
        company_name: company?.name || "",
      });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/settings/company/name`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_name: data.company_name.trim(),
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to update company");
      }
      form.reset({
        company_name: result.data?.company?.company_name ?? data.company_name,
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
        <InputWithForm name={"company_name"} label={"Company Name"} />
        <Button disabled={isLoading}>
          {isLoading && <Spinner />}
          Save
        </Button>
      </form>
    </FormProvider>
  );
};

export default CompanyName;
