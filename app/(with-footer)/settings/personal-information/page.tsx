import PageTitleBack from "@/components/share/page-title-back";
import Picture from "./_components/picture";
import PersonalInformation from "./_components/personal-information";
import DeleteAccount from "./_components/delete-account";
import { cookies } from "next/headers";

const Page = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  const res = await fetch(`${process.env.APP_URL}/api/settings/profile`, {
    cache: "no-store",
    headers: {
      Cookie: cookieHeader,
    },
  });
  const { data } = await res.json();

  return (
    <section className="flex flex-col h-full">
      <PageTitleBack title="Personal Information" />
      <div className="py-5 flex flex-col gap-5">
        <Picture />
        <PersonalInformation user={data.user} />
        <DeleteAccount />
      </div>
    </section>
  );
};

export default Page;
