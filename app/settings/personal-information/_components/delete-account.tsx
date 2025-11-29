"use client";
import { ChevronRight } from "lucide-react";
import React from "react";

const DeleteAccount = () => {
  return (
    <button className="flex items-center justify-between px-5">
      <p className="text-red text-sm">Delete your account</p>
      <ChevronRight className="size-5 text-red" />
    </button>
  );
};

export default DeleteAccount;
