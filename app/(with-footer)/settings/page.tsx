import PageTitle from "@/components/share/page-title";
import React from "react";
import ProfilePictures from "./_components/profile-picture";
import Sections from "./_components/sections";

const Page = () => {
  return (
    <section className="flex flex-col h-full">
      <PageTitle title="Settings" />
      <div className="flex-1 py-5 flex flex-col gap-5 px-5">
        <ProfilePictures name="Jenny Wilson" join="Joined August 17, 2024" />
        <Sections />
      </div>
    </section>
  );
};

export default Page;
