"use client";
import PageTitleBack from "@/components/share/page-title-back";
import { Button } from "@/components/ui/button";
import { RotateCcwKey } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <section className="flex flex-col h-full">
      <PageTitleBack title="Reset Password" className="px-0" />
      <div className="flex flex-col justify-between h-full gap-6 py-5">
        <div className="flex-1 flex flex-col gap-3 items-center justify-center">
          <div className="size-[60px] flex items-center justify-center rounded-full bg-primary/20">
            <RotateCcwKey className="text-primary size-[30px]" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-xl text-center">
              Reset password success
            </h1>
            <p className="text-body text-center text-sm">
              Your password has been successfully reset. You can now log in
              using your new credentials
            </p>
          </div>
        </div>
        <Link href={"/login"}>
          <Button>Back to Sign in</Button>
        </Link>
      </div>
    </section>
  );
};

export default Page;
