import React, { ReactNode } from "react";

const CardList = ({
  content,
}: {
  content: {
    icons: ReactNode;
    title: string;
    description: string;
    total: string;
  }[];
}) => {
  return (
    <div className="px-5 rounded-[12px] border border-border flex flex-col">
      {content.map((item) => (
        <div
          key={item.title}
          className="py-4 border-b border-border last:border-0 flex items-center justify-between gap-10"
        >
          <div className="flex items-center gap-2">
            <div className="rounded-full size-10 border border-border flex items-center justify-center">
              {item.icons}
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-medium text-sm">{item.title}</h3>
              <p className="text-sm text-body">{item.description}</p>
            </div>
          </div>
          <span className="text-sm font-medium">{item.total}</span>
        </div>
      ))}
    </div>
  );
};

export default CardList;
