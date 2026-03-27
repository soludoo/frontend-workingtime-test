/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import InputType from "./input-type";
import { Button } from "@/components/ui/button";
import SelectDrawerWithForm from "@/components/form-hook/select-drawer";
import { fetchWithCache } from "@/lib/offline-cache";
import { useEffect, useState } from "react";
import DatePickerWithForm from "@/components/form-hook/date-picker";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { format } from "date-fns";
import { useTranslations } from "next-intl";

const Content = () => {
  const t = useTranslations("requestCorrection");
  const form = useForm();
  const [options, setOptions] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const correctTypeId = useWatch({
    control: form.control,
    name: "correction_type_id",
  });
  const selectedType: any = options.find(
    (opt: any) => String(opt.key) === String(correctTypeId),
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchWithCache(
          "correction_types",
          "/api/correction/type",
        );
        if (result?.data?.correction_types) {
          setOptions(
            result.data.correction_types.map(
              (item: { id: string; name: string; custom_fields: any }) => ({
                key: item.id,
                label: item.name,
                custom_fields: item.custom_fields,
              }),
            ),
          );
        }
      } catch (err) {
        console.warn("[offline] correction types:", err);
      }
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
      toast.success(result.message || t("successSubmit"));
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
            label={t("selectDate")}
            placeholder={t("chooseDateCorrect")}
          />
          <SelectDrawerWithForm
            options={options}
            name="correction_type_id"
            label={t("issue")}
            placeholder={t("chooseIssue")}
          />
          <InputType fields={selectedType?.custom_fields || []} />
        </div>
        <Button disabled={isLoading}>
          {isLoading && <Spinner className="size-5" />} {t("submitRequest")}
        </Button>
      </form>
    </FormProvider>
  );
};

export default Content;
