import React from "react";
import Header from "./_components/header";
import Content from "./_components/content";

const Page = () => {
  return (
    <section className="flex flex-col">
      <Header />
      <Content />
    </section>
  );
};

export default Page;
