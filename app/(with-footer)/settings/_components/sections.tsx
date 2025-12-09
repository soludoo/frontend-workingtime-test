"use client";
import SignOut from "@/components/modals/sign-out";
import BorderSection from "@/components/share/border-section";
import {
  Building2,
  CircleUserRound,
  FileQuestionMark,
  FileSliders,
  Info,
  LogOut,
  SunMoon,
} from "lucide-react";
import React, { useState } from "react";

const Sections = () => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <SignOut open={modal} onClose={() => setModal(false)} />
      <div className="flex flex-col gap-4">
        <BorderSection
          content={[
            {
              icon: <CircleUserRound className="size-5 text-black" />,
              title: "Personal Information",
              url: "/settings/personal-information",
            },
            {
              icon: <Building2 className="size-5 text-black" />,
              title: "Company settings",
              url: "/settings/company",
            },
            {
              icon: <FileSliders className="size-5 text-black" />,
              title: "Preferences",
              url: "/settings/preferences",
            },
          ]}
        />
        <BorderSection
          content={[
            //   {
            //     icon: <SunMoon className="size-5 text-black" />,
            //     title: "Appearance",
            //     customAction: () => {},
            //   },
            {
              icon: <FileQuestionMark className="size-5 text-black" />,
              title: "Help & Support",
              url: "/settings/support",
            },
            {
              icon: <Info className="size-5 text-black" />,
              title: "About App",
              url: "/settings/about-app",
            },
          ]}
        />
        <BorderSection
          content={[
            {
              icon: <LogOut className="size-5 text-black" />,
              title: "Sign out",
              customAction: () => setModal(true),
            },
          ]}
        />
      </div>
    </>
  );
};

export default Sections;
