/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useMemo, useState } from "react";

const ProfilePictures = () => {
  const [data, setData] = useState<any>(undefined);
  const formatted = useMemo(() => {
    if (!data?.start_date) return null;

    const date = new Date(data.start_date);

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [data?.start_date]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/settings/profile`);
      const { data } = await res.json();
      setData(data.user);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <Avatar className="size-20">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      </Avatar>
      <div className="flex flex-col gap-1 items-center justify-center">
        <h1 className="text-black text-xl font-semibold text-center">
          {data?.full_name}
        </h1>
        {data && (
          <p className="text-body text-sm text-center">Joined {formatted}</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePictures;
