"use client";
import PageTitleAdmin from "@/components/share/page-title-admin";

const Content = () => {
  return (
    <section className="relative flex flex-col gap-8 h-full pb-28">
      <PageTitleAdmin
        title="Danger Zone"
        description="These actions are irreversible and may permanently affect your company data."
      />
    </section>
  );
};

export default Content;
