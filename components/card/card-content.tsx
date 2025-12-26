import Link from "next/link";
import React from "react";

const CardContent = ({
  icons,
  description,
  title,
  link,
}: {
  icons: React.ReactNode;
  description: string;
  title: string;
  link?: string;
}) => {
  return (
    <Link
      href={link || "#"}
      className="border border-border rounded-2xl px-4 py-[13px] flex items-center gap-2 hover:bg-[#F1F3F6] cursor-pointer"
    >
      {icons}
      <div className="flex flex-col gap-1">
        <h4 className="font-semibold text-black">{title}</h4>
        <p className="text-body text-sm">{description}</p>
      </div>
    </Link>
  );
};

export default CardContent;
