import React from "react";

const Theme = () => {
  return (
    <div className="flex gap-10">
      <div className="w-[290px] flex flex-col gap-2">
        <h4 className="text-black font-semibold">Theme color</h4>
        <p className="text-body text-sm">
          Choose a preferred theme for the app.
        </p>
      </div>
    </div>
  );
};

export default Theme;
