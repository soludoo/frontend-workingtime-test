"use client";
import PageTitleBack from "@/components/share/page-title-back";
import { Button } from "@/components/ui/button";
import { RotateCcwKey } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("resetPassword");
  return (
    <section className="flex flex-col h-full">
      <PageTitleBack title={t("title")} className="px-0" />
      <div className="flex flex-col justify-between h-full gap-6 py-5">
        <div className="flex-1 flex flex-col gap-3 items-center justify-center">
          <div className="size-[60px] flex items-center justify-center rounded-full bg-primary/20">
            <RotateCcwKey className="text-primary size-[30px]" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-xl text-center">
              {t("successTitle")}
            </h1>
            <p className="text-body text-center text-sm">
              {t("successDesc")}
            </p>
          </div>
        </div>
        <Link href={"/login"}>
          <Button>{t("backToSignIn")}</Button>
        </Link>
      </div>
    </section>
  );
};

export default Page;
