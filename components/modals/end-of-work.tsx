import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useMediaQuery } from "usehooks-ts";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";

const EndOfWork = ({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: () => void;
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return isDesktop ? (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white gap-y-10">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 items-center">
          <svg
            width="40"
            height="39"
            viewBox="0 0 40 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20 22C19.558 22 19.134 21.8244 18.8215 21.5119C18.5089 21.1993 18.3333 20.7754 18.3333 20.3334V12C18.3333 11.558 18.5089 11.1341 18.8215 10.8215C19.134 10.509 19.558 10.3334 20 10.3334C20.442 10.3334 20.8659 10.509 21.1785 10.8215C21.4911 11.1341 21.6666 11.558 21.6666 12V20.3334C21.6666 20.7754 21.4911 21.1993 21.1785 21.5119C20.8659 21.8244 20.442 22 20 22Z"
              fill="#F0B100"
            />
            <path
              d="M18.245 25.5967C18.245 25.1312 18.4299 24.6848 18.759 24.3557C19.0882 24.0266 19.5345 23.8417 20 23.8417C20.4655 23.8417 20.9118 24.0266 21.241 24.3557C21.5701 24.6848 21.755 25.1312 21.755 25.5967C21.755 26.0621 21.5701 26.5085 21.241 26.8376C20.9118 27.1668 20.4655 27.3517 20 27.3517C19.5345 27.3517 19.0882 27.1668 18.759 26.8376C18.4299 26.5085 18.245 26.0621 18.245 25.5967Z"
              fill="#F0B100"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M26.0117 6.73668L35.805 24.6033C38.325 29.2017 35.0167 34.8333 29.7933 34.8333H10.2067C4.98332 34.8333 1.67332 29.2 4.19499 24.6017L13.9883 6.73501C16.5983 1.97668 23.4017 1.97668 26.0117 6.73501V6.73668ZM23.005 8.40334C21.7017 6.02168 18.2983 6.02168 16.995 8.40334L7.19999 26.2667C5.93832 28.5667 7.59332 31.3817 10.205 31.3817H29.7917C32.4033 31.3817 34.0583 28.565 32.7967 26.265L23.005 8.40334Z"
              fill="#F0B100"
            />
          </svg>
          <h3 className="text-xl text-center font-medium">
            Are you sure you want to end your workday?
          </h3>
        </div>
        <DialogFooter className="flex sm:flex-col gap-2">
          <Button
            onClick={() => {
              onSelect();
              onClose();
            }}
          >
            Yes, end work
          </Button>
          <Button onClick={onClose} variant={"destructive"}>
            No, go back
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="bg-white">
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-4 items-center">
          <svg
            width="40"
            height="39"
            viewBox="0 0 40 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20 22C19.558 22 19.134 21.8244 18.8215 21.5119C18.5089 21.1993 18.3333 20.7754 18.3333 20.3334V12C18.3333 11.558 18.5089 11.1341 18.8215 10.8215C19.134 10.509 19.558 10.3334 20 10.3334C20.442 10.3334 20.8659 10.509 21.1785 10.8215C21.4911 11.1341 21.6666 11.558 21.6666 12V20.3334C21.6666 20.7754 21.4911 21.1993 21.1785 21.5119C20.8659 21.8244 20.442 22 20 22Z"
              fill="#F0B100"
            />
            <path
              d="M18.245 25.5967C18.245 25.1312 18.4299 24.6848 18.759 24.3557C19.0882 24.0266 19.5345 23.8417 20 23.8417C20.4655 23.8417 20.9118 24.0266 21.241 24.3557C21.5701 24.6848 21.755 25.1312 21.755 25.5967C21.755 26.0621 21.5701 26.5085 21.241 26.8376C20.9118 27.1668 20.4655 27.3517 20 27.3517C19.5345 27.3517 19.0882 27.1668 18.759 26.8376C18.4299 26.5085 18.245 26.0621 18.245 25.5967Z"
              fill="#F0B100"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M26.0117 6.73668L35.805 24.6033C38.325 29.2017 35.0167 34.8333 29.7933 34.8333H10.2067C4.98332 34.8333 1.67332 29.2 4.19499 24.6017L13.9883 6.73501C16.5983 1.97668 23.4017 1.97668 26.0117 6.73501V6.73668ZM23.005 8.40334C21.7017 6.02168 18.2983 6.02168 16.995 8.40334L7.19999 26.2667C5.93832 28.5667 7.59332 31.3817 10.205 31.3817H29.7917C32.4033 31.3817 34.0583 28.565 32.7967 26.265L23.005 8.40334Z"
              fill="#F0B100"
            />
          </svg>
          <h3 className="text-xl text-center font-medium">
            Are you sure you want to end your workday?
          </h3>
        </div>
        <DrawerFooter className="flex sm:flex-col gap-2">
          <Button
            onClick={() => {
              onSelect();
              onClose();
            }}
          >
            Yes, end work
          </Button>
          <Button onClick={onClose} variant={"destructive"}>
            No, go back
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default EndOfWork;
