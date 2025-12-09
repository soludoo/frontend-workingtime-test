import PageTitleBack from "@/components/share/page-title-back";
import React from "react";
import Informations from "./_components/information";

const Page = () => {
  return (
    <section className="flex flex-col h-full">
      <PageTitleBack title="Preferences" />
      <Informations />
    </section>
  );
};

export default Page;
