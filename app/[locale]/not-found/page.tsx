import React from "react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = async () => {
  const t = await getTranslations("notFound");
  return (
    <div className="flex flex-col items-center justify-center h-screen px-5 gap-4">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="text-center text-body-400">{t("description")}</p>
      <Link href="/">
        <Button className="mt-4">{t("backHome")}</Button>
      </Link>
    </div>
  );
};

export default Page;
