import PageTitleBack from "@/components/share/page-title-back";
import { getTranslations } from "next-intl/server";
import React from "react";
import Information from "./_components/information";

const Page = async () => {
  const t = await getTranslations("support");
  return (
    <section className="flex flex-col h-full">
      <PageTitleBack title={t("title")} customLink="/settings" />
      <Information />
    </section>
  );
};

export default Page;
