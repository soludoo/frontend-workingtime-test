"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const SignOut = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const router = useRouter();
  const t = useTranslations("modals");
  const [isLoading, setIsLoading] = useState(false);
  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await fetch("/api/auth/sign-out", {
        method: "POST",
      });
      router.refresh();
    } catch (e) {
      console.error("Sign out failed", e);
      toast.error("Something went wrong!!");
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="size-[60px] rounded-full bg-red-50 flex items-center justify-center mx-auto">
            <LogOut className="text-red size-[30px]" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-black text-center font-semibold text-xl">
              {t("signOutTitle")}
            </h3>
            <p className="text-body text-sm text-center">
              {t("signOutDesc")}
            </p>
          </div>
        </div>
        <DialogFooter className="flex-row">
          <Button
            disabled={isLoading}
            className="flex-1 text-sm bg-red"
            onClick={handleSignOut}
          >
            {t("signOutBtn")}
          </Button>
          <Button
            disabled={isLoading}
            onClick={onClose}
            className="flex-1 text-sm bg-transparent text-black hover:text-white border border-border"
          >
            {t("cancel")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignOut;
