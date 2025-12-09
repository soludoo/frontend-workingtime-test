import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const ProfilePictures = ({ name, join }: { name: string; join: string }) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <Avatar className="size-20">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      </Avatar>
      <div className="flex flex-col gap-1 items-center justify-center">
        <h1 className="text-black text-xl font-semibold text-center">{name}</h1>
        <p className="text-body text-sm text-center">{join}</p>
      </div>
    </div>
  );
};

export default ProfilePictures;
