import PageTitleBack from "@/components/share/page-title-back";
import React from "react";
import Content from "./_components/content";

const Page = () => {
  return (
    <section className="flex flex-col h-full">
      <PageTitleBack title="New Request" className="px-0" />
      <Content />
    </section>
  );
};

export default Page;
