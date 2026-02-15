/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const PersonalInformation = ({ user }: { user: any }) => {
  const router = useRouter();

  console.log(user);

  return (
    <div className="p-4 flex flex-col gap-4 border border-border rounded-2xl">
      <button
        onClick={() =>
          router.push(`/settings/personal-information/edit/full-name`)
        }
        className="flex items-center justify-between"
      >
        <p className="text-black text-sm">Full name</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">{user.full_name}</p>
          <ChevronRight className="size-5 text-body-400" />
        </div>
      </button>
      <div className="border-b border-border w-full" />
      <button
        onClick={() =>
          router.push(`/settings/personal-information/edit/phone-number`)
        }
        className="flex items-center justify-between"
      >
        <p className="text-black text-sm">Phone number</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">{user.phone}</p>
          <ChevronRight className="size-5 text-body-400" />
        </div>
      </button>
      <div className="border-b border-border w-full" />
      <button
        onClick={() =>
          router.push(`/settings/personal-information/edit/password`)
        }
        className="flex items-center justify-between"
      >
        <p className="text-black text-sm">Password</p>
        <div className="flex items-center gap-2">
          <p className="text-body-400 text-sm">Change password</p>
          <ChevronRight className="size-5 text-body-400" />
        </div>
      </button>
    </div>
  );
};

export default PersonalInformation;
