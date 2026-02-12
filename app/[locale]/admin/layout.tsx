import HeaderAdmin from "@/components/layout/header-admin";
import SidebarAdmin from "@/components/layout/sidebar-admin";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-col bg-white">
      <HeaderAdmin />
      <div className="flex">
        <SidebarAdmin />
        <div className="flex-1 h-full p-8 max-h-[calc(100vh-76px)] overflow-auto">
          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;
