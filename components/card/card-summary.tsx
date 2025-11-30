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
    <div className="border border-border rounded-2xl px-4 py-[13px] flex items-center gap-2">
      {icons}
      <div className="flex flex-col">
        <h4 className="font-medium text-black">{time}</h4>
        <p className="text-secondary text-[10px]">{title}</p>
      </div>
    </div>
  );
};

export default CardSummary;
