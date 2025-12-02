"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";

const BorderSection = ({
  content,
}: {
  content: {
    icon: ReactNode;
    title: string;
    url?: string;
    customAction?: () => void;
    customIcon?: ReactNode;
  }[];
}) => {
  return (
    <div className="border border-border rounded-2xl p-4 flex flex-col gap-3">
      {content.map((item, index) =>
        item.customAction ? (
          <div key={item.title} className="flex flex-col gap-3">
            <button
              onClick={item.customAction}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <h2 className="text-sm text-black">{item.title}</h2>
              </div>
              <button>
                {item.customIcon ? (
                  item.customIcon
                ) : (
                  <ChevronRight className="size-5 text-body" />
                )}
              </button>
            </button>
            {index + 1 !== content.length && (
              <div className="border-t border-border" />
            )}
          </div>
        ) : (
          <div key={item.title} className="flex flex-col gap-3">
            <Link
              href={item.url || "#"}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <h2 className="text-sm text-black">{item.title}</h2>
              </div>
              <div>
                {item.customIcon ? (
                  item.customIcon
                ) : (
                  <ChevronRight className="size-5 text-body" />
                )}
              </div>
            </Link>
            {index + 1 !== content.length && (
              <div className="border-t border-border" />
            )}
          </div>
        )
      )}
    </div>
  );
};

export default BorderSection;
