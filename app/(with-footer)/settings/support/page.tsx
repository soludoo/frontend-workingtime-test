import PageTitleBack from "@/components/share/page-title-back";
import React from "react";
import Information from "./_components/information";

const Page = () => {
  return (
    <section className="flex flex-col h-full">
      <PageTitleBack title="Help & Support" />
      <Information />
    </section>
  );
};

export default Page;
