/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import SelectWithForm from "../form-hook/select";
import TextAreaWithForm from "../form-hook/text-area";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { FormProvider, useForm } from "react-hook-form";

const BreakWorking = ({
  open,
  onClose,
  onAction,
}: {
  open: boolean;
  onClose: () => void;
  onAction: (value: any) => void;
}) => {
  const form = useForm();
  const [breakTypes, setBreakTypes] = useState<
    { key: string; label: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/break-types");
      const { data } = await response.json();
      setBreakTypes(
        data.break_types.map((item: { id: number; name: string }) => ({
          key: item.id,
          label: item.name,
        })),
      );
    };
    if (open) {
      fetchData();
    }
  }, [open]);

  const onSubmit = (data: any) => {
    onAction({
      breakType: breakTypes?.find((item: any) => item?.id === data.break_type)
        ?.label,
      breakTypeId: data.break_type,
      notes: data.note,
    });
    onClose();
    form.reset();
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader className="items-start px-0">
          <DrawerTitle>Take a Break</DrawerTitle>
          <DrawerDescription>
            Select break type before pausing your work.
          </DrawerDescription>
        </DrawerHeader>
        <FormProvider {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <SelectWithForm
              label="Break Type"
              name="break_type"
              options={breakTypes}
              placeholder="Select break type"
            />
            <TextAreaWithForm
              name="note"
              label="Note (Optional)"
              placeholder="Add a short note…"
              classNameInput="h-[140px]"
            />
            <DrawerFooter className="flex items-center gap-2 flex-row px-0">
              <Button
                className="flex-1"
                variant={"outline"}
                type="button"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button className="flex-1">Start Break</Button>
            </DrawerFooter>
          </form>
        </FormProvider>
      </DrawerContent>
    </Drawer>
  );
};

export default BreakWorking;
