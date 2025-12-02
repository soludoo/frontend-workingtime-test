import PageTitleBack from "@/components/share/page-title-back";
import React from "react";
import Content from "./_components/content";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <section className="flex flex-col h-full">
      <PageTitleBack title={`Edit ${id.replace("-", " ")}`} />
      <Content id={id} />
    </section>
  );
};

export default Page;
