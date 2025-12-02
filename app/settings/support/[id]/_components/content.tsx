import React from "react";
import Faq from "./faq";
import ContactSupport from "./contact-support";
import Report from "./report";

const Content = ({ id }: { id: string }) => {
  switch (id) {
    case "faq":
      return <Faq />;
    case "contact-support":
      return <ContactSupport />;
    case "report":
      return <Report />;
  }
};

export default Content;
