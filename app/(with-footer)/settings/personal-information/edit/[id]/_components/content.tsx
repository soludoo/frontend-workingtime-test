"use client";
import React from "react";
import FullName from "./fullname";
import EmailAddress from "./email";
import PhoneNumber from "./phone-number";
import Password from "./password";

const Content = ({ id }: { id: string }) => {
  switch (id) {
    case "full-name":
      return <FullName />;
    case "email-address":
      return <EmailAddress />;

    case "phone-number":
      return <PhoneNumber />;

    case "password":
      return <Password />;
  }
};

export default Content;
