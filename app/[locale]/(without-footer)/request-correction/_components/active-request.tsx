/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { BookCheck, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import CardLeave from "./card-leave";

const ActiveRequest = () => {
  const [data, setData] = useState<any>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/correction/active");
      const { data } = await res.json();
      console.log(data);
      setData(data?.requests || undefined);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-between h-full py-5">
      {!data ? (
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
          {data?.map((item: any, index: number) => (
            <CardLeave
              key={index}
              status={item.status}
              title={item.issue_description}
              date={`${item.requested_time_in} ${
                item.requested_time_out ? "-" : ""
              } ${item.requested_time_out || ""}`}
              type={item.type}
              color={item?.status_color}
            />
          ))}
        </div>
      )}
      <Link href={"/request-correction/request"}>
        <Button className="text-sm">
          <Plus />
          New Request
        </Button>
      </Link>
    </div>
  );
};

export default ActiveRequest;
