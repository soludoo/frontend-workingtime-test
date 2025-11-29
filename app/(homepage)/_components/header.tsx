import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex items-center justify-between gap-10">
      <div className="flex items-center gap-3">
        <Avatar className="size-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>
        <div className="flex flex-col gap-y-2">
          <h2 className="text-black text-xl">
            Hi, <span className="font-semibold">Jenny!</span>
          </h2>
          <p className="text-secondary text-sm">Thursday, 6 November 2025</p>
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
