import PageTitleBack from "@/components/share/page-title-back";
import React from "react";
import Content from "./_components/content";
import { getTranslations } from "next-intl/server";

const Page = async () => {
  const t = await getTranslations("requestVacation");
  return (
    <section className="flex flex-col h-full">
      <PageTitleBack title={t("newRequestTitle")} className="px-0" />
      <Content />
    </section>
  );
};

export default Page;
