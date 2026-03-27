"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useNetworkStatus } from "@/hooks/use-network-status";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

const Picture = ({ url }: { url: string }) => {
  const t = useTranslations("personalInformation");
  const [image, setImage] = useState<string>(
    url || "https://github.com/shadcn.png",
  );
  const [loading, setLoading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const isOnline = useNetworkStatus();

  useEffect(() => {
    if (url) {
      setImage(url);
    }
  }, [url]);

  const handlePickImage = () => {
    if (!loading && isOnline) {
      fileInputRef.current?.click();
    }
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImage(previewUrl);

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("profile_photo", file);

      const res = await fetch("/api/settings/photo", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Upload failed");
      }

      if (result?.data?.photo_url) {
        setImage(result.data.photo_url);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload photo");

      setImage(url || "https://github.com/shadcn.png");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col gap-3 items-center justify-center w-fit mx-auto ${
        loading ? "opacity-60 pointer-events-none" : ""
      } ${isOnline ? "cursor-pointer" : ""}`}
      onClick={handlePickImage}
    >
      <Avatar className="size-[120px]">
        <AvatarImage
          src={image}
          alt="profile"
          className="object-cover object-top"
        />
      </Avatar>

      {isOnline && (
        <p className="text-body text-xs">
          {loading ? t("uploading") : t("tapToChange")}
        </p>
      )}

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
