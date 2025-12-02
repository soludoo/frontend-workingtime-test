import PageTitleBack from "@/components/share/page-title-back";
import React from "react";

const Page = () => {
  return (
    <section className="flex flex-col h-full">
      <PageTitleBack title="About App" />
      <div className="p-5 flex flex-col gap-4">
        <p className="text-body text-sm">
          At Clockwise, your privacy is paramount. Delve into the specifics of
          the data we gather and discover how we empower you to maintain control
          over your personal information, ensuring a secure and personalized
          experience.
        </p>
        <p className="text-body text-sm">
          Safeguarding your information is our top priority. Our comprehensive
          privacy policy provides an in-depth explanation of the measures we
          take to ensure your data is handled securely, with transparency and
          integrity.
        </p>
        <p className="text-body text-sm">
          We believe in transparency and empowering you with control. Explore
          your privacy rights in detail and learn how to effortlessly manage
          your information, putting you in charge of your data and preferences.
        </p>
        <p className="text-body text-sm">
          We are dedicated to upholding the highest standards of data
          protection. Explore our detailed practices for data collection and
          usage, gaining insights into how we prioritize your privacy and
          security at every step.
        </p>
        <p className="text-body text-sm">
          We are dedicated to upholding the highest standards of data
          protection. Explore our detailed practices for data collection and
          usage, gaining insights into how we prioritize your privacy and
          security at every step.
        </p>
      </div>
    </section>
  );
};

export default Page;
