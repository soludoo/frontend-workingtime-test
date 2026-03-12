import PageTitleBack from "@/components/share/page-title-back";
import { useTranslations } from "next-intl";
import React from "react";

const Page = () => {
  const t = useTranslations("aboutApp");
  return (
    <section className="flex flex-col h-full">
      <PageTitleBack title={t("title")} customLink="/settings" />
      <div className="p-5 flex flex-col gap-4">
        <p className="text-body text-sm">{t("p1")}</p>
        <p className="text-body text-sm">{t("p2")}</p>
        <p className="text-body text-sm">{t("p3")}</p>
        <p className="text-body text-sm">{t("p4")}</p>
        <p className="text-body text-sm">{t("p5")}</p>
      </div>
    </section>
  );
};

export default Page;
