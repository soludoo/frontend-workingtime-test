import React from "react";
import Content from "./_components/content";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <Content id={id} />;
};

export default Page;
