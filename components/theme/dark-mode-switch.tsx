"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function DarkModeSwitch({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative flex h-8 w-14 cursor-pointer items-center rounded-full",
        "transition-colors duration-300 bg-green",
        className
      )}
    >
      <div className="relative z-10 flex w-full items-center justify-center gap-2">
        <motion.div
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          <Sun className={cn("size-4", isDark ? "text-white" : "text-green")} />
        </motion.div>

        <motion.div
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          <Moon
            className={cn("size-4", isDark ? "text-green" : "text-white")}
          />
        </motion.div>
      </div>
      <motion.div
        className="absolute h-6 w-6 rounded-full bg-white shadow-md"
        layout
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
        }}
        style={{
          left: isDark ? "calc(100% - 1.75rem)" : "0.25rem",
        }}
      />
    </div>
  );
}
