"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect } from "react";

const Picture = () => {
  const [image, setImage] = React.useState<string>(
    "https://github.com/shadcn.png"
  );
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch(`/api/settings/photo`);
  //     const { data } = await res.json();
  //     console.log(data);

  //     if (data?.photo_base64) {
  //       const cleanBase64 = data.photo_base64.replace(/\s/g, "");
  //       setImage(cleanBase64);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
      className="flex flex-col gap-3 items-center justify-center cursor-pointer w-fit mx-auto"
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
