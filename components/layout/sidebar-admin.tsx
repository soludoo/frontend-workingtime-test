"use client";

import { ADMINNAVIGATIONS } from "@/constants/navigations";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const SidebarAdmin = () => {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const activeMenus: Record<string, boolean> = {};

    ADMINNAVIGATIONS.forEach((item) => {
      if (item.children?.some((c) => c.href === pathname)) {
        activeMenus[item.name] = true;
      }
    });

    setOpenMenus(activeMenus);
  }, [pathname]);

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <aside className="relative z-10 bg-white max-h-[calc(100vh-76px)] h-[calc(100vh-76px)] overflow-auto border-r border-border max-w-[300px] w-full py-8 px-2.5 flex flex-col gap-3">
      <h3 className="text-body text-xs font-medium">MAIN FEATURES</h3>
      <ul className="flex flex-col gap-1 px-2">
        {ADMINNAVIGATIONS.map((item) => {
          const isActive = pathname.includes(item.href) && !item.children;
          const isOpen = openMenus[item.name];

          return (
            <li key={item.name} className="overflow-hidden">
              <div
                className={cn(
                  "flex items-center justify-between gap-3 text-sm font-medium py-[8.5px] px-2 rounded-md cursor-pointer transition-colors",
                  isActive
                    ? "bg-primary-admin/10 text-primary-admin"
                    : "text-body hover:text-primary-admin hover:bg-primary-admin/10",
                )}
                onClick={() => item.children && toggleMenu(item.name)}
              >
                <div className="flex items-center gap-3">
                  {item.icons}
                  {item.children ? (
                    item.name
                  ) : (
                    <Link href={item.href}>{item.name}</Link>
                  )}
                </div>
                {item.children &&
                  (isOpen ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  ))}
              </div>
              {item.children && isOpen && (
                <div className="flex gap-2.5 h-full ml-4 overflow-hidden">
                  <div className="h-full w-px bg-border" />
                  <ul className="flex flex-col mt-1 gap-0.5 w-full">
                    {item.children.map((subItem) => {
                      const isSubActive = subItem.href === pathname;

                      return (
                        <li key={subItem.name} className="flex gap-2.5">
                          <Link
                            href={subItem.href}
                            className={cn(
                              "flex-1 flex items-center gap-3 text-sm font-medium py-[8.5px] px-2 rounded-md transition-colors",
                              isSubActive
                                ? "bg-primary-admin/10 text-primary-admin"
                                : "text-body hover:text-primary-admin hover:bg-primary-admin/10",
                            )}
                          >
                            {subItem.icons}
                            {subItem.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default SidebarAdmin;
