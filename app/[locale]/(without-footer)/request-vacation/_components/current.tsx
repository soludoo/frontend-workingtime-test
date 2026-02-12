/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Palmtree, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import CardLeave from "./card-leave";

const Current = () => {
  const [data, setData] = useState<any>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/leave/current");
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
            <Palmtree className="size-[30px] text-primary" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-black font-semibold text-center">
              No Current Requests
            </h3>
            <p className="text-black text-sm text-center">
              You haven’t made any vacation requests yet.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {data?.map((item: any, index: number) => (
            <CardLeave
              key={index}
              status={item.status}
              title={item.reason}
              date={item.date_display}
              type={item.leave_type_name}
              color={item.status_color}
            />
          ))}
        </div>
      )}
      <Link href={"/request-vacation/request"}>
        <Button className="text-sm">
          <Plus />
          New Request
        </Button>
      </Link>
    </div>
  );
};

export default Current;
