import React from "react";

const CardSummary = ({
  icons,
  time,
  title,
}: {
  icons: React.ReactNode;
  time: string;
  title: string;
}) => {
  return (
    <div className="border border-border rounded-[16px] px-4 py-[13px] flex items-center gap-[10px]">
      {icons}
      <div className="flex flex-col">
        <h4 className="font-medium text-black">{time}</h4>
        <p className="text-secondary text-xs">{title}</p>
      </div>
    </div>
  );
};

export default CardSummary;
