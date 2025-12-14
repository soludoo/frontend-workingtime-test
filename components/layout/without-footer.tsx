import React, { ReactNode } from "react";

const LayoutWithoutFooter = ({ children }: { children: ReactNode }) => {
  return (
    <main className="mx-auto max-w-md bg-white dark:bg-[#03020F] overflow-auto px-5 min-h-screen h-screen">
      {children}
    </main>
  );
};

export default LayoutWithoutFooter;
