import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

const ClockInModal = ({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (type: "clock_in" | "sick", reason?: string) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Clock In Action</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <Button onClick={() => onSelect("clock_in")}>Start Work</Button>
          <Button
            variant={"destructive"}
            onClick={() => onSelect("sick", "Sick")}
          >
            Absent today (illness, doctor,etc)
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClockInModal;
