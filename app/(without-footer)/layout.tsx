import LayoutWithoutFooter from "@/components/layout/without-footer";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <LayoutWithoutFooter>{children}</LayoutWithoutFooter>;
};

export default Layout;
