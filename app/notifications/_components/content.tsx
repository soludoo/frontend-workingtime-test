import React from "react";

const Content = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-10 bg-primary/10 text-monochrome-500 flex items-center px-5 text-sm">
        Today
      </div>
      <div className="flex flex-col gap-4 px-5">
        <div className="flex items-center gap-3">
          <div className="size-2.5 bg-primary rounded-full" />
          <div className="flex flex-col gap-2">
            <h4 className="text-[#282A37] font-medium">
              New settings were applied.
            </h4>
            <p className="text-[#515978] text-sm">
              October 28, 2023 at 07:40 AM
            </p>
          </div>
        </div>
        <div className="w-full h-px bg-monochrome-50" />
        <div className="flex items-center gap-3">
          <div className="size-2.5 bg-primary rounded-full" />
          <div className="flex flex-col gap-2">
            <h4 className="text-[#282A37] font-medium">
              New settings were applied.
            </h4>
            <p className="text-[#515978] text-sm">
              October 28, 2023 at 07:40 AM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
