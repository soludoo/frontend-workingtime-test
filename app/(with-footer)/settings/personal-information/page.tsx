import PageTitleBack from "@/components/share/page-title-back";
import React from "react";
import Picture from "./_components/picture";
import PersonalInformation from "./_components/personal-information";
import DeleteAccount from "./_components/delete-account";

const Page = () => {
  return (
    <section className="flex flex-col h-full">
      <PageTitleBack title="Personal Information" />
      <div className="py-5 flex flex-col gap-5">
        <Picture />
        <PersonalInformation />
        <DeleteAccount />
      </div>
    </section>
  );
};

export default Page;
