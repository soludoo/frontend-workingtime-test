"use client";
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
import React from "react";

const Sections = () => {
  return (
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
            url: "/settings/help-support",
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
            customAction: () => {},
          },
        ]}
      />
    </div>
  );
};

export default Sections;
