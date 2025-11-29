import React from "react";

const PageTitle = ({ title }: { title: string }) => {
  return (
    <section className="px-5 py-2.5">
      <h1 className="text-2xl font-semibold text-black">{title}</h1>
    </section>
  );
};

export default PageTitle;
