import React from "react";
import LoginForm from "./_components/login-form";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("login");
  return (
    <div className="flex flex-col justify-between h-full pt-5">
      <div className="flex-1 flex flex-col gap-6 pt-3">
        <div className="flex flex-col gap-3">
          <h1 className="text-black text-center text-2xl font-medium">
            {t("title")}
          </h1>
          <p className="text-body text-center text-sm">
            {t("description")}
          </p>
        </div>
        <LoginForm />
      </div>
      <p className="text-primary text-center py-5">
        {t("terms")}
      </p>
    </div>
  );
};

export default Page;
