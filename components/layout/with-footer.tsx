import React, { ReactNode } from "react";
import Footer from "../share/footer";

const LayoutWithFooter = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="mx-auto max-w-md bg-white max-h-[calc(100dvh-75px)] h-[calc(100dvh-75px)] overflow-auto pb-5">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default LayoutWithFooter;
