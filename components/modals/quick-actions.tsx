"use client";
import React from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { ChevronRight, FilePenLine, TicketsPlane } from "lucide-react";
import { useRouter } from "next/navigation";

const QuickActionsDrawer = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Quick Actions</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-5 w-full">
          <button
            onClick={() => {
              router.push("/request-vacation");
              onClose();
            }}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                <TicketsPlane className="size-5 text-primary" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-black font-medium text-sm text-start">
                  Request vacation
                </h3>
                <p className="text-body text-sm">
                  Submit a new time-off request
                </p>
              </div>
            </div>
            <ChevronRight className="size-5" />
          </button>
          <div className="w-full h-px bg-border" />
          <button
            onClick={() => {
              router.push("/request-correction");
              onClose();
            }}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FilePenLine className="size-5 text-primary" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-black font-medium text-sm text-start">
                  Request correction
                </h3>
                <p className="text-body text-sm">Fix or edit your time entry</p>
              </div>
            </div>
            <ChevronRight className="size-5" />
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default QuickActionsDrawer;
