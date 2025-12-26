import { ReactNode } from "react";

const PageTitleAdmin = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-black">{title}</h1>
        <p className="text-body text-sm">{description}</p>
      </div>
      {children}
    </div>
  );
};

export default PageTitleAdmin;
