"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import Current from "./current";
import Past from "./past";

const Content = () => {
  const [tab, setTab] = useState("current");
  return (
    <div className="flex flex-col h-full">
      <div className="flex">
        <button
          onClick={() => setTab("current")}
          className={cn(
            "flex-1 flex items-center justify-center font-medium h-10 border-b text-sm",
            tab === "current"
              ? "border-primary text-primary"
              : "border-border text-body"
          )}
        >
          Current
        </button>
        <button
          className={cn(
            "flex-1 flex items-center justify-center font-medium h-10 border-b text-sm",
            tab === "past"
              ? "border-primary text-primary"
              : "border-border text-body"
          )}
          onClick={() => setTab("past")}
        >
          Past
        </button>
      </div>
      {tab === "current" && <Current />}
      {tab === "past" && <Past />}
    </div>
  );
};

export default Content;
