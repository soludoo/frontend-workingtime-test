"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const Picture = () => {
  const [image, setImage] = React.useState<string>(
    "https://github.com/shadcn.png"
  );

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImage(url);
  };

  return (
    <div
      className="flex flex-col gap-3 items-center justify-center cursor-pointer"
      onClick={handlePickImage}
    >
      <Avatar className="size-[120px]">
        <AvatarImage src={image} alt="profile" />
      </Avatar>
      <p className="text-body text-xs">Tap to change your photo</p>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleChangeImage}
      />
    </div>
  );
};

export default Picture;
