"use client";
import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Button } from "../ui/button";
import {
  ColorPicker,
  ColorPickerAlpha,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  ColorPickerSelection,
  ColorPreview,
} from "../ui/color-picker";
import { Input } from "../ui/input";
import Color from "color";

const STORAGE_KEY = "brand-color-customize";

const AddColor = ({
  open,
  onClose,
  onRefresh,
}: {
  open: boolean;
  onClose: () => void;
  onRefresh: () => void;
}) => {
  const [selectedHex, setSelectedHex] = React.useState("#000000");
  const [colorName, setColorName] = React.useState("");
  const handleSave = () => {
    if (!colorName.trim()) return;

    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      const colors: Array<{
        id: string;
        name: string;
        hex: string;
        isSelected: boolean;
      }> = existing ? JSON.parse(existing) : [];
      const newColor = {
        id: crypto.randomUUID(),
        name: colorName.trim(),
        hex: selectedHex,
        isSelected: false,
      };
      colors.push(newColor);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(colors));
      setColorName("");
      onRefresh();
      onClose();
    } catch (err) {
      console.error("Failed saving color", err);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add Color</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-3">
          <div className="grid gap-1">
            <label className="text-sm font-medium text-gray-600">
              Color Name
            </label>
            <Input
              placeholder="e.g. Lavender Purple"
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
              className="h-9"
            />
          </div>
          <ColorPicker
            className="w-full"
            onChange={(val) => {
              if (!Array.isArray(val)) return;
              console.log(val);
              const [r, g, b, a] = val;
              const hex = Color.rgb(r, g, b).alpha(a).hexa();
              setSelectedHex(hex);
            }}
          >
            <ColorPickerSelection className="h-[202px]" />
            <div className="flex items-center gap-4">
              <div className="grid w-full gap-1">
                <ColorPickerHue />
                <ColorPickerAlpha />
              </div>
              <ColorPreview />
            </div>
            <div className="flex items-center gap-2">
              <ColorPickerOutput />
              <ColorPickerFormat />
            </div>
          </ColorPicker>
        </div>
        <DrawerFooter>
          <Button onClick={handleSave}>Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddColor;
