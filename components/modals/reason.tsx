import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { CirclePause, Coffee, Power } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import EndOfWork from "./end-of-work";

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
  const [input, setInput] = React.useState("");
  const [modal, setModal] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return isDesktop ? (
    <>
      <EndOfWork
        open={modal}
        onClose={() => setModal(false)}
        onSelect={() => {
          onSelect("clock_out", "Finish Work");
          onClose();
        }}
      />
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
              onClick={() => setModal(true)}
              className="flex items-center gap-2"
            >
              <Power /> End of work
            </button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Other Options"
            />
          </div>
          {input && (
            <DialogFooter>
              <Button
                onClick={() => {
                  onSelect("break_start", input);
                  setInput("");
                }}
              >
                Save
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  ) : (
    <>
      <EndOfWork
        open={modal}
        onClose={() => setModal(false)}
        onSelect={() => {
          onSelect("clock_out", "Finish Work");
          onClose();
        }}
      />
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
              onClick={() => setModal(true)}
              className="flex items-center gap-2"
            >
              <Power /> End of work
            </button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Other Options"
            />
          </div>
          {input && (
            <DrawerFooter className="px-0">
              <Button
                onClick={() => {
                  onSelect("break_start", input);
                  setInput("");
                }}
                className="w-full"
              >
                Save
              </Button>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ReasonModal;
