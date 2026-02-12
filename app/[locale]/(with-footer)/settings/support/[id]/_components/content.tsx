import React from "react";
import Faq from "./faq";
import ContactSupport from "./contact-support";
import Report from "./report";
import PageTitleBack from "@/components/share/page-title-back";

const Content = ({ id }: { id: string }) => {
  switch (id) {
    case "faq":
      return (
        <section className="flex flex-col">
          <PageTitleBack title={"FAQ"} />
          <Faq />
        </section>
      );
    case "contact-support":
      return (
        <section className="flex flex-col">
          <PageTitleBack title={"Contact Support"} />
          <ContactSupport />
        </section>
      );
    case "report":
      return (
        <section className="flex flex-col">
          <PageTitleBack title={"Report a problem"} />
          <Report />
        </section>
      );
  }
};

export default Content;
