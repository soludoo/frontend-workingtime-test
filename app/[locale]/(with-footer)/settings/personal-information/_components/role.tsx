/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ChevronRight } from "lucide-react";

const Role = ({ user }: { user: any }) => {
  return (
    <div className="p-4 flex flex-col gap-4 border border-border rounded-2xl">
      <div className="flex items-center justify-between">
        <p className="text-black text-sm">Role</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">{user.role}</p>
        </div>
      </div>
      <div className="border-b border-border w-full" />
      <div className="flex items-center justify-between">
        <p className="text-black text-sm">Department</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">{user.department}</p>
          <ChevronRight className="size-5 text-body-400" />
        </div>
      </div>
      <div className="border-b border-border w-full" />
      <div className="flex items-center justify-between">
        <p className="text-black text-sm">Working Hours</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">{user.working_hours}</p>
          <ChevronRight className="size-5 text-body-400" />
        </div>
      </div>
      <div className="border-b border-border w-full" />
      <div className="flex items-center justify-between">
        <p className="text-black text-sm">Work Model</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">{user.work_model}</p>
          <ChevronRight className="size-5 text-body-400" />
        </div>
      </div>
      <div className="border-b border-border w-full" />
      <div className="flex items-center justify-between">
        <p className="text-black text-sm">Manager</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">{user.manager}</p>
          <ChevronRight className="size-5 text-body-400" />
        </div>
      </div>
      <div className="border-b border-border w-full" />
      <div className="flex items-center justify-between">
        <p className="text-black text-sm">Employee ID</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">{user?.employee_id}</p>
          <ChevronRight className="size-5 text-body-400" />
        </div>
      </div>
    </div>
  );
};

export default Role;
