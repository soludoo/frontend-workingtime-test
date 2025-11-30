"use client";
import { useEffect } from "react";

const DEFAULT_PRIMARY = "#754AF3";

export default function PrimaryColorProvider() {
  useEffect(() => {
    const stored = localStorage.getItem("brand-primary");
    if (stored) {
      document.documentElement.style.setProperty("--primary", stored);
    } else {
      localStorage.setItem("brand-primary", DEFAULT_PRIMARY);
      document.documentElement.style.setProperty("--primary", DEFAULT_PRIMARY);
    }
  }, []);

  return null;
}
