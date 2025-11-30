"use client";
import React from "react";
import EmailAddress from "./email";
import PhoneNumber from "./phone-number";
import CompanyName from "./company-name";
import Category from "./category";
import Address from "./address";
import BrandColor from "./brand-color";

const Content = ({ id }: { id: string }) => {
  switch (id) {
    case "company-name":
      return <CompanyName />;
    case "category":
      return <Category />;
    case "support-email":
      return <EmailAddress />;
    case "company-phone":
      return <PhoneNumber />;
    case "address":
      return <Address />;
    case "brand-color":
      return <BrandColor />;
  }
};

export default Content;
