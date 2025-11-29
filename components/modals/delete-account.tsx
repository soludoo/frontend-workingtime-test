import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { CircleX } from "lucide-react";
import { Button } from "../ui/button";

const DeleteAccountModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="size-[60px] rounded-full bg-red-50 flex items-center justify-center mx-auto">
            <CircleX className="size-[30px] text-red" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-center text-black text-xl font-semibold">
              Delete account
            </p>
            <p className="text-body text-sm text-center">
              This action cannot be undone. Your profile and all related data
              will be permanently removed.
            </p>
          </div>
        </div>
        <DialogFooter className="flex-row">
          <Button className="flex-1 text-sm bg-red">Delete Account</Button>
          <Button
            onClick={onClose}
            className="flex-1 text-sm bg-transparent text-black border border-border"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountModal;
