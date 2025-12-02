import { ChevronRight } from "lucide-react";
import React from "react";

const ContactSupport = () => {
  return (
    <div className="p-5 flex flex-col gap-4">
      <button className="flex items-center justify-between gap-10">
        <div className="flex flex-col gap-2">
          <h3 className="text-black text-sm text-start">(209) 555-0104</h3>
          <p className="text-body text-sm text-start">Phone number</p>
        </div>
        <ChevronRight className="size-5 text-body" />
      </button>
      <div className="border-b border-border w-full" />
      <button className="flex items-center justify-between gap-10">
        <div className="flex flex-col gap-2">
          <h3 className="text-black text-sm text-start">support@apex.com</h3>
          <p className="text-body text-sm text-start">Email address</p>
        </div>
        <ChevronRight className="size-5 text-body" />
      </button>
      <div className="border-b border-border w-full" />
      <button className="flex items-center justify-between gap-10">
        <div className="flex flex-col gap-2">
          <h3 className="text-black text-sm text-start">
            456 Nova Drive, Sacramento, CA
          </h3>
          <p className="text-body text-sm text-start">Office address</p>
        </div>
        <ChevronRight className="size-5 text-body" />
      </button>
    </div>
  );
};

export default ContactSupport;
