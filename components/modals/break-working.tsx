"use client";
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
  onAction: () => void;
}) => {
  const form = useForm();

  const onSubmit = () => {
    onAction();
    onClose();
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
              options={[]}
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
