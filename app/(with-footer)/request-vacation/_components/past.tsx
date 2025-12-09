import { Button } from "@/components/ui/button";
import { Palmtree, Plus } from "lucide-react";
import React from "react";

const Past = () => {
  return (
    <div className="flex flex-col justify-between h-full px-5">
      <div className="flex-1 min-h-[400px] flex items-center justify-center flex-col gap-3">
        <div className="size-[60px] bg-primary/10 flex items-center justify-center rounded-full">
          <Palmtree className="size-[30px] text-primary" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-black font-semibold text-center">
            No Past Requests
          </h3>
          <p className="text-black text-sm text-center">
            You haven’t made any vacation requests yet.
          </p>
        </div>
      </div>
      <Button className="text-sm">
        <Plus />
        New Request
      </Button>
    </div>
  );
};

export default Past;
