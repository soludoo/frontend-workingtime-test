/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { fetchWithCache } from "@/lib/offline-cache";
import { BookCheck, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import CardLeave from "./card-leave";
import { Spinner } from "@/components/ui/spinner";
import { useTranslations } from "next-intl";

const ActiveRequest = () => {
  const t = useTranslations("requestCorrection");
  const [data, setData] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchWithCache(
          "correction_active",
          "/api/correction/active",
        );
        const types = await fetchWithCache(
          "correction_types",
          "/api/correction/type",
        );
        if (types?.data?.correction_types) {
          setOptions(
            types.data.correction_types.map(
              (item: { id: string; name: string; custom_fields: any }) => ({
                key: item.id,
                label: item.name,
                custom_fields: item.custom_fields,
              }),
            ),
          );
        }
        setData(result?.data?.requests || undefined);
      } catch (error) {
        console.warn("[offline] correction active:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Spinner className="size-6 mx-auto my-10" />;
  }

  return (
    <>
      <div className="relative flex flex-col justify-between h-full py-5 gap-y-5 flex-1 overflow-auto">
        {!data || data.length === 0 ? (
          <div className="flex-1 min-h-[400px] flex items-center justify-center flex-col gap-3">
            <div className="size-[60px] bg-primary/10 flex items-center justify-center rounded-full">
              <BookCheck className="size-[30px] text-primary" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-black font-semibold text-center">
                {t("noActive")}
              </h3>
              <p className="text-black text-sm text-center">
                {t("noRequestDesc")}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {data?.map((item: any) => {
              const selectedType: any = options.find(
                (opt: any) =>
                  String(opt.key) === String(item.correction_type_id),
              );

              const format = selectedType?.custom_fields
                ?.filter((field: any) => field.field_name !== "reason")
                ?.map((field: any) => {
                  const value = item.correction_data?.[field.field_name];

                  if (!value) return null;

                  return `${value}`;
                })
                .filter(Boolean)
                .join(" · ");

              return (
                <CardLeave
                  key={item.id}
                  status={item.status}
                  title={item.correction_data.reason || item.comment}
                  date={format}
                  type={item.correction_type_name}
                />
              );
            })}
          </div>
        )}
      </div>
      <div className="sticky bottom-0 py-5 bg-white">
        <Link href={"/request-correction/request"}>
          <Button className="text-sm">
            <Plus />
            {t("newRequest")}
          </Button>
        </Link>
      </div>
    </>
  );
};

export default ActiveRequest;
