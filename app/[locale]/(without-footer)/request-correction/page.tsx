import PageTitleBack from "@/components/share/page-title-back";
import React from "react";
import Content from "./_components/content";
import { getTranslations } from "next-intl/server";

const Page = async () => {
  const t = await getTranslations("requestCorrection");
  return (
    <section className="flex flex-col h-full">
      <PageTitleBack
        title={t("title")}
        className="px-0"
        customLink="/"
      />
      <Content />
    </section>
  );
};

export default Page;
