/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { BookCheck, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import CardLeave from "./card-leave";
import { Spinner } from "@/components/ui/spinner";

const ActiveRequest = () => {
  const [data, setData] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/correction/active");
        const { data } = await res.json();
        setData(data?.requests || undefined);
      } catch (error) {
        console.log(error);
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
                No correction requests yet
              </h3>
              <p className="text-black text-sm text-center">
                If you missed a clock-in or need to fix a time entry, you can
                request it here.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {data?.map((item: any) => {
              const correctionId = item.correction_type_id;
              let format;

              if (correctionId === 1) {
                format = item.correction_data.new_clock_in_time;
              }
              if (correctionId === 2) {
                format = `${item.correction_data.start_time} - ${item.correction_data.end_time} · Break ${item.correction_data.break_duration}`;
              }
              if (correctionId === 3) {
                format = item.correction_data.new_clock_out_time;
              }
              if (correctionId === 4) {
                format = `${item.correction_data.old_clock_in_time} → ${item.correction_data.new_clock_in_time}`;
              }
              if (correctionId === 5) {
                format = `${item.correction_data.old_clock_out_time} → ${item.correction_data.new_clock_out_time}`;
              }
              if (correctionId === 6) {
                format = `${item.correction_data.old_break_duration} → ${item.correction_data.new_break_duration}`;
              }
              if (correctionId === 7) {
                format = `${item.correction_data.overtime_start} - ${item.correction_data.overtime_end}`;
              }
              return (
                <CardLeave
                  key={item.id}
                  status={item.status}
                  title={item.comment}
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
            New Request
          </Button>
        </Link>
      </div>
    </>
  );
};

export default ActiveRequest;
