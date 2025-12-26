"use client";
import { useEffect } from "react";

const DEFAULT_PRIMARY = "#754AF3";

export default function PrimaryColorProvider() {
  useEffect(() => {
    const stored = localStorage.getItem("brand-primary");
    const storedAdmin = localStorage.getItem("admin-primary");
    if (stored) {
      document.documentElement.style.setProperty("--primary", stored);
    } else {
      localStorage.setItem("brand-primary", DEFAULT_PRIMARY);
      document.documentElement.style.setProperty("--primary", DEFAULT_PRIMARY);
    }
    if (storedAdmin) {
      document.documentElement.style.setProperty(
        "--primary-admin",
        storedAdmin
      );
    } else {
      localStorage.setItem("admin-primary", DEFAULT_PRIMARY);
      document.documentElement.style.setProperty(
        "--primary-admin",
        DEFAULT_PRIMARY
      );
    }
  }, []);

  return null;
}
