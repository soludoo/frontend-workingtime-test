/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AddColor from "@/components/modals/add-color";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const initialColors = [
  { id: 1, name: "Midnight Blue", hex: "#40A9FF", isSelected: false },
  { id: 2, name: "Lavender Purple", hex: "#754AF3", isSelected: true },
  { id: 3, name: "Coral Red", hex: "#E77F7F", isSelected: false },
];

const STORAGE_KEY = "brand-color-customize";

const Color = ({
  name,
  hex,
  isSelected,
  onChange,
}: {
  name: string;
  hex: string;
  isSelected: boolean;
  onChange: () => void;
}) => {
  return (
    <div
      className={cn(
        "w-full p-4 rounded-2xl flex items-center justify-between border border-border",
        isSelected && "border-primary bg-primary/10"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="size-7 rounded-full" style={{ background: hex }} />
        <p className="text-sm text-black">{name}</p>
      </div>
      <Checkbox
        className="rounded-full size-5"
        checked={isSelected}
        onCheckedChange={onChange}
      />
    </div>
  );
};

const BrandColor = () => {
  const [colors, setColors] = React.useState(initialColors);
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(new Date());

  React.useEffect(() => {
    let merged = [...initialColors];

    try {
      const savedCustom = localStorage.getItem(STORAGE_KEY);
      if (savedCustom) {
        const parsed = JSON.parse(savedCustom);
        if (Array.isArray(parsed)) merged = [...merged, ...parsed];
      }
    } catch (err) {
      console.error("Failed to load custom colors:", err);
    }

    const savedPrimary = localStorage.getItem("brand-primary");

    if (savedPrimary) {
      document.documentElement.style.setProperty("--primary", savedPrimary);
      merged = merged.map((c) => ({
        ...c,
        isSelected: c.hex === savedPrimary,
      }));
    }

    setColors(merged);
  }, [refresh]);

  const handleChange = (id: any, hex: string) => {
    setColors((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false }
      )
    );
    document.documentElement.style.setProperty("--primary", hex);
    localStorage.setItem("brand-primary", hex);
  };

  return (
    <>
      <AddColor
        open={open}
        onClose={() => setOpen(false)}
        onRefresh={() => setRefresh(new Date())}
      />
      <div className="px-5 pt-5 flex flex-col gap-3 h-full justify-between">
        <div className="flex flex-col gap-3">
          {colors.map((item) => (
            <Color
              key={item.id}
              name={item.name}
              hex={item.hex}
              isSelected={item.isSelected}
              onChange={() => handleChange(item.id, item.hex)}
            />
          ))}
        </div>
        <Button onClick={() => setOpen(true)}>Add Color</Button>
      </div>
    </>
  );
};

export default BrandColor;
