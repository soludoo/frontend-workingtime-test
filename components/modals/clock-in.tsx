import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useMediaQuery } from "usehooks-ts";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";

const ClockInModal = ({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (type: "clock_in" | "sick", reason?: string) => void;
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return isDesktop ? (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white">
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
          <Button onClick={onClose} variant={"outline"}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="px-6 pb-10 bg-white">
        <DrawerHeader>
          <DrawerTitle>Clock In Action</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-3">
          <Button onClick={() => onSelect("clock_in")}>Start Work</Button>
          <Button
            variant={"destructive"}
            onClick={() => onSelect("sick", "Sick")}
          >
            Absent today (illness, doctor,etc)
          </Button>
          <Button onClick={onClose} variant={"outline"}>
            Cancel
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ClockInModal;
