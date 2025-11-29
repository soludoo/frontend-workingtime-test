import { ChevronRight } from "lucide-react";
import React from "react";

const PersonalInformation = () => {
  return (
    <div className="px-5 flex flex-col gap-4">
      <button className="flex items-center justify-between">
        <p className="text-black text-sm">Full name</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">Jenny Wilson</p>
          <ChevronRight className="size-5 text-body-400" />
        </div>
      </button>
      <div className="border-b border-border w-full" />
      <button className="flex items-center justify-between">
        <p className="text-black text-sm">Email Address</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">Jennywilson@email.com</p>
          <ChevronRight className="size-5 text-body-400" />
        </div>
      </button>
      <div className="border-b border-border w-full" />
      <button className="flex items-center justify-between">
        <p className="text-black text-sm">Phone number</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">(+1) 267-9041</p>
          <ChevronRight className="size-5 text-body-400" />
        </div>
      </button>
      <div className="border-b border-border w-full" />
      <button className="flex items-center justify-between">
        <p className="text-black text-sm">Password</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">Change password</p>
          <ChevronRight className="size-5 text-body-400" />
        </div>
      </button>
      <div className="border-b border-border w-full" />
    </div>
  );
};

export default PersonalInformation;
