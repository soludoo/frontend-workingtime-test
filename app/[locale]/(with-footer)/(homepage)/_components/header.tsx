/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getTodayDate } from "@/lib/helper";
import { Bell } from "lucide-react";
import Link from "next/link";

const Header = ({ summary }: any) => {
  return (
    <div className="flex items-center justify-between gap-10">
      <div className="flex items-center gap-3">
        <Avatar className="size-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>
        <div className="flex flex-col gap-y-2">
          <h2 className="text-black text-xl">
            Hi, <span className="font-semibold">{summary?.user?.name}</span>
          </h2>
          <p className="text-body text-sm">{getTodayDate()}</p>
        </div>
      </div>
      <Link href={"/notifications"}>
        <Button
          variant={"rounded"}
          size={"icon-lg"}
          className="bg-white border border-border"
        >
          <Bell className="text-black size-6" />
        </Button>
      </Link>
    </div>
  );
};

export default Header;
