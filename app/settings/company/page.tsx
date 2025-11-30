import PageTitleBack from "@/components/share/page-title-back";
import React from "react";
import Picture from "./_components/picture";
import CompanyInformation from "./_components/company-information";

const Page = () => {
  return (
    <section className="flex flex-col h-full">
      <PageTitleBack title="Company Settings" />
      <div className="py-5 flex flex-col gap-5">
        <Picture />
        <CompanyInformation />
      </div>
    </section>
  );
};

export default Page;
