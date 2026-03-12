"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { CircleX } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const DeleteAccountModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const t = useTranslations("modals");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/account/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          confirmation: "DELETE",
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to delete account");
      }
      router.push("/");
      toast.success("Successfully delete your account");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="size-[60px] rounded-full bg-red-50 flex items-center justify-center mx-auto">
            <CircleX className="size-[30px] text-red-500" />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-center text-black text-xl font-semibold">
              {t("deleteAccountTitle")}
            </p>
            <p className="text-body text-sm text-center">
              {t("deleteAccountDesc")}
            </p>
          </div>
        </div>
        <DialogFooter className="flex-row gap-2">
          <Button
            className="flex-1 text-sm"
            onClick={handleDelete}
            disabled={loading}
            variant={"destructive"}
          >
            {loading ? t("deleting") : t("deleteAccountBtn")}
          </Button>
          <Button
            onClick={onClose}
            variant={"outline"}
            className="flex-1 text-sm"
            disabled={loading}
          >
            {t("cancel")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountModal;
