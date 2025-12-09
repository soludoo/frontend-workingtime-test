import LayoutWithFooter from "@/components/layout/with-footer";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <LayoutWithFooter>{children}</LayoutWithFooter>;
};

export default Layout;
