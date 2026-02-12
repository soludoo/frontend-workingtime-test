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

const StartWorking = ({
  open,
  onClose,
  onAction,
}: {
  open: boolean;
  onClose: () => void;
  onAction: (value: any) => void;
}) => {
  const form = useForm();
  const [options, setOptions] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/projects");
      const { data } = await res.json();
      setOptions(
        data.projects.map((item: { id: number; name: string }) => ({
          key: item.id,
          label: item.name,
        })),
      );
      const response = await fetch("/api/locations");
      const { data: dataLocation } = await response.json();
      setLocations(
        dataLocation.locations.map((item: { id: number; name: string }) => ({
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
      projectId: data.project,
      locationId: data.location,
      notes: data.note,
    });
    form.reset();
    onClose();
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader className="items-start px-0">
          <DrawerTitle>Start Working</DrawerTitle>
          <DrawerDescription>
            Add a few details before we begin.
          </DrawerDescription>
        </DrawerHeader>
        <FormProvider {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <SelectWithForm
              label="Project"
              name="project"
              options={options}
              placeholder="Select project"
            />
            <SelectWithForm
              label="Location"
              name="location"
              options={locations}
              placeholder="Select location"
            />
            <TextAreaWithForm
              name="note"
              label="Note (Optional)"
              placeholder="e.g. Client meeting, design review"
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
              <Button className="flex-1">Start Work</Button>
            </DrawerFooter>
          </form>
        </FormProvider>
      </DrawerContent>
    </Drawer>
  );
};

export default StartWorking;
