/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useTranslations } from "next-intl";

const Role = ({ user }: { user: any }) => {
  const t = useTranslations("personalInformation");
  return (
    <div className="p-4 flex flex-col gap-4 border border-border rounded-2xl">
      <div className="flex items-center justify-between">
        <p className="text-black text-sm">{t("emailAddress")}</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">{user.email}</p>
        </div>
      </div>
      <div className="border-b border-border w-full" />
      <div className="flex items-center justify-between">
        <p className="text-black text-sm">{t("role")}</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">{user.role}</p>
        </div>
      </div>
      <div className="border-b border-border w-full" />
      <div className="flex items-center justify-between">
        <p className="text-black text-sm">{t("department")}</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">{user.department}</p>
        </div>
      </div>
      <div className="border-b border-border w-full" />
      <div className="flex items-center justify-between">
        <p className="text-black text-sm">{t("workingHours")}</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">{user.working_hours}</p>
        </div>
      </div>
      <div className="border-b border-border w-full" />
      <div className="flex items-center justify-between">
        <p className="text-black text-sm">{t("workModel")}</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">{user.work_model}</p>
        </div>
      </div>
      <div className="border-b border-border w-full" />
      <div className="flex items-center justify-between">
        <p className="text-black text-sm">{t("manager")}</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">{user.manager}</p>
        </div>
      </div>
      <div className="border-b border-border w-full" />
      <div className="flex items-center justify-between">
        <p className="text-black text-sm">{t("employeeId")}</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">{user?.employee_id}</p>
        </div>
      </div>
    </div>
  );
};

export default Role;
