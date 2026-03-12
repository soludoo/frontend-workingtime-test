import PageTitle from "@/components/share/page-title";
import ProfilePictures from "./_components/profile-picture";
import Sections from "./_components/sections";
import { getTranslations } from "next-intl/server";

const Page = async () => {
  const t = await getTranslations("settingsMain");
  return (
    <section className="flex flex-col h-full">
      <PageTitle title={t("title")} />
      <div className="flex-1 py-5 flex flex-col gap-5 px-5">
        <ProfilePictures />
        <Sections />
      </div>
    </section>
  );
};

export default Page;
