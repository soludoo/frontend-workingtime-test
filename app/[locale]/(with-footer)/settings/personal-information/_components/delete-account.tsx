"use client";
import DeleteAccountModal from "@/components/modals/delete-account";
import { ChevronRight } from "lucide-react";
import React from "react";

const DeleteAccount = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <DeleteAccountModal open={open} onClose={() => setOpen(false)} />
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-between p-4 border border-border rounded-2xl"
      >
        <p className="text-red text-sm">Delete your account</p>
        <ChevronRight className="size-5 text-red" />
      </button>
    </>
  );
};

export default DeleteAccount;
