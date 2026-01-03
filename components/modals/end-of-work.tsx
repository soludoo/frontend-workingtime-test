import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { XCircle } from "lucide-react";

const EndOfWork = ({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: () => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white gap-y-10">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="size-[60px] rounded-full bg-red-50 flex items-center justify-center mx-auto">
            <XCircle className="text-red size-[30px]" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-black text-center font-semibold text-xl">
              Stop work?
            </h3>
            <p className="text-body text-sm text-center">
              You’re about to end your workday. Today’s tracked time will be
              saved.
            </p>
          </div>
        </div>
        <DialogFooter className="flex flex-1 gap-2">
          <Button
            onClick={() => {
              onSelect();
              onClose();
            }}
            className="flex-1"
            variant={"destructive"}
          >
            Stop
          </Button>
          <Button className="flex-1" onClick={onClose} variant={"outline"}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EndOfWork;
