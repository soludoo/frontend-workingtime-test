"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import ActiveRequest from "./active-request";
import History from "./history";

const Content = () => {
  const [tab, setTab] = useState("active-request");
  return (
    <>
      <div className="flex h-10">
        <button
          onClick={() => setTab("active-request")}
          className={cn(
            "flex-1 flex items-center justify-center font-medium h-10 border-b text-sm",
            tab === "active-request"
              ? "border-primary text-primary"
              : "border-border text-body",
          )}
        >
          Active requests
        </button>
        <button
          className={cn(
            "flex-1 flex items-center justify-center font-medium h-10 border-b text-sm",
            tab === "history"
              ? "border-primary text-primary"
              : "border-border text-body",
          )}
          onClick={() => setTab("history")}
        >
          History
        </button>
      </div>
      {tab === "active-request" && <ActiveRequest />}
      {tab === "history" && <History />}
    </>
  );
};

export default Content;
