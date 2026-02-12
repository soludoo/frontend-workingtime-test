import PageTitleBack from "@/components/share/page-title-back";
import React from "react";
import Picture from "./_components/picture";
import CompanyInformation from "./_components/company-information";
import { cookies } from "next/headers";

const Page = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  const res = await fetch(`${process.env.APP_URL}/api/settings/company`, {
    cache: "no-store",
    headers: {
      Cookie: cookieHeader,
    },
  });
  const { data } = await res.json();

  return (
    <section className="flex flex-col h-full">
      <PageTitleBack title="Company Settings" />
      <div className="py-5 flex flex-col gap-5">
        <Picture />
        <CompanyInformation data={data} />
      </div>
    </section>
  );
};

export default Page;
