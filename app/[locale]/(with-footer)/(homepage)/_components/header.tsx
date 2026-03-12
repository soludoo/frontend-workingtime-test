/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getTodayDate } from "@/lib/helper";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Header = ({ summary }: any) => {
  const t = useTranslations("home");
  return (
    <div className="flex items-center justify-between gap-10">
      <div className="flex items-center gap-3">
        <Avatar className="size-10">
          <AvatarImage
            src={summary?.user?.profile_photo}
            alt={summary?.user?.name || "Profile Picture"}
          />
        </Avatar>
        <div className="flex flex-col gap-y-2">
          <h2 className="text-black text-xl">
            {t("hi")} <span className="font-semibold">{summary?.user?.name}</span>
          </h2>
          <p className="text-body text-sm">{getTodayDate()}</p>
        </div>
      </div>
      {/* <Link href={"/notifications"}>
        <Button
          variant={"rounded"}
          size={"icon-lg"}
          className="bg-white border border-border"
        >
          <Bell className="text-black size-6" />
        </Button>
      </Link> */}
    </div>
  );
};

export default Header;
