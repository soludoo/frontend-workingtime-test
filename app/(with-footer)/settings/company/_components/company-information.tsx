/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const CompanyInformation = ({ data }: { data: any }) => {
  const router = useRouter();

  return (
    <div className="px-5 flex flex-col gap-4">
      <button
        onClick={() => router.push(`/settings/company/company-name`)}
        className="flex items-center justify-between"
      >
        <p className="text-black text-sm">Company name</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">{data.company.name}</p>
          <ChevronRight className="size-5 text-body-400" />
        </div>
      </button>
      <div className="border-b border-border w-full" />
      <button
        onClick={() => router.push(`/settings/company/category`)}
        className="flex items-center justify-between"
      >
        <p className="text-black text-sm">Industry / category</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">{data.company.industry}</p>
          <ChevronRight className="size-5 text-body-400" />
        </div>
      </button>
      <div className="border-b border-border w-full" />
      <button
        onClick={() => router.push(`/settings/company/brand-color`)}
        className="flex items-center justify-between"
      >
        <p className="text-black text-sm">Brand color</p>
        <div className="flex items-center gap-2">
          <div className="size-5 rounded-full border border-purple/30 bg-white flex items-center justify-center">
            <div className="size-3.5 rounded-full bg-primary" />
          </div>
          <ChevronRight className="size-5 text-body-400" />
        </div>
      </button>
      <div className="border-b border-border w-full" />
      <button
        onClick={() => router.push(`/settings/company/support-email`)}
        className="flex items-center justify-between"
      >
        <p className="text-black text-sm">Support email</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">{data.company.support_email}</p>
          <ChevronRight className="size-5 text-body-400" />
        </div>
      </button>
      <div className="border-b border-border w-full" />
      <button
        onClick={() => router.push(`/settings/company/company-phone`)}
        className="flex items-center justify-between"
      >
        <p className="text-black text-sm">Company phone</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">{data.company.company_phone}</p>
          <ChevronRight className="size-5 text-body-400" />
        </div>
      </button>
      <div className="border-b border-border w-full" />
      <button
        onClick={() => router.push(`/settings/company/address`)}
        className="flex items-center justify-between"
      >
        <p className="text-black text-sm">Address</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">{data.company.address}</p>
          <ChevronRight className="size-5 text-body-400" />
        </div>
      </button>
      <div className="border-b border-border w-full" />
    </div>
  );
};

export default CompanyInformation;
