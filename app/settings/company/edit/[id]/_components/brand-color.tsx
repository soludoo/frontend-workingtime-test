"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import React from "react";

const initialColors = [
  { id: 1, name: "Midnight Blue", hex: "#40A9FF", isSelected: false },
  { id: 2, name: "Lavender Purple", hex: "#754AF3", isSelected: true },
  { id: 3, name: "Coral Red", hex: "#E77F7F", isSelected: false },
];

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

  React.useEffect(() => {
    const savedHex = localStorage.getItem("brand-primary");
    if (savedHex) {
      document.documentElement.style.setProperty("--primary", savedHex);
      setColors((prev) =>
        prev.map((c) => ({
          ...c,
          isSelected: c.hex === savedHex,
        }))
      );
    }
  }, []);

  const handleChange = (id: number, hex: string) => {
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

      <Button>Add Color</Button>
    </div>
  );
};

export default BrandColor;
