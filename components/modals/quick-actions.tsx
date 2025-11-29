import React from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { ChevronRight, FilePenLine, TicketsPlane } from "lucide-react";

const QuickActionsDrawer = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Quick Actions</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-5 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-purple-50 flex items-center justify-center">
                <TicketsPlane className="size-5 text-purple" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-black font-medium text-sm">
                  Request vacation
                </h3>
                <p className="text-body text-sm">
                  Submit a new time-off request
                </p>
              </div>
            </div>
            <ChevronRight className="size-5" />
          </div>
          <div className="w-full h-px bg-border" />
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-purple-50 flex items-center justify-center">
                <FilePenLine className="size-5 text-purple" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-black font-medium text-sm">
                  Request correction
                </h3>
                <p className="text-body text-sm">Fix or edit your time entry</p>
              </div>
            </div>
            <ChevronRight className="size-5" />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default QuickActionsDrawer;
