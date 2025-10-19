import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { CirclePause, Coffee, Power } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";

const ReasonModal = ({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (
    type: "break_start" | "leave" | "clock_out",
    reason?: string
  ) => void;
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return isDesktop ? (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>What Will you do?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-3">
          <button
            onClick={() => onSelect("break_start", "Pause 1")}
            className="flex items-center gap-2"
          >
            <CirclePause /> Pause 1 Start
          </button>
          <button
            onClick={() => onSelect("break_start", "Pause 2")}
            className="flex items-center gap-2"
          >
            <CirclePause /> Pause 2 Start
          </button>
          <button
            onClick={() => onSelect("break_start", "Rest of day")}
            className="flex items-center gap-2"
          >
            <Coffee /> Rest of day
          </button>
          <button
            onClick={() => onSelect("clock_out", "Finish Work")}
            className="flex items-center gap-2"
          >
            <Power /> End of work
          </button>
        </div>
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="px-6 pb-10 bg-white">
        <DrawerHeader>
          <DrawerTitle>What Will you do?</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-3 mt-3">
          <button
            onClick={() => onSelect("break_start", "Pause 1")}
            className="flex items-center gap-2"
          >
            <CirclePause /> Pause 1 Start
          </button>
          <button
            onClick={() => onSelect("break_start", "Pause 2")}
            className="flex items-center gap-2"
          >
            <CirclePause /> Pause 2 Start
          </button>
          <button
            onClick={() => onSelect("break_start", "Rest of day")}
            className="flex items-center gap-2"
          >
            <Coffee /> Rest of day
          </button>
          <button
            onClick={() => onSelect("clock_out", "Finish Work")}
            className="flex items-center gap-2"
          >
            <Power /> End of work
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ReasonModal;
