import PageTitleBack from "@/components/share/page-title-back";
import React from "react";
import Content from "./_components/content";

const Page = () => {
  return (
    <section className="flex flex-col h-full">
      <PageTitleBack title="Request Correction" />
      <Content />
    </section>
  );
};

export default Page;
