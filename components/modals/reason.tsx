import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { FormProvider, useForm, Controller, useWatch } from "react-hook-form";
import SelectWithForm from "../form-hook/select";
import { REASONS } from "@/constants/reason";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const ReasonModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const form = useForm({
    defaultValues: {
      reason: "",
      subReason: "",
      customReason: "",
    },
  });

  const { control, setValue } = form;

  const reason = useWatch({ control, name: "reason" });
  const customReason = useWatch({ control, name: "customReason" });
  const selectedReason = REASONS.find((r) => r.key === reason);

  useEffect(() => {
    if (customReason && customReason.trim() !== "") {
      setValue("subReason", "");
    }
  }, [customReason, setValue]);

  const inputPlaceholder =
    selectedReason?.children?.find((c) => c.type === "input")?.placeholder ??
    "Enter reason";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reason</DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <form className="flex flex-col gap-4">
            <SelectWithForm
              options={REASONS}
              name="reason"
              label="Reason"
              placeholder="Select reason"
            />
            {selectedReason?.children && (
              <div className="flex flex-col gap-2 border-t pt-3">
                <Label className="text-sm font-medium text-gray-700">
                  Detail Reason
                </Label>
                <Controller
                  control={control}
                  name="subReason"
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setValue("customReason", "");
                      }}
                      className="flex flex-col gap-2"
                    >
                      {selectedReason.children
                        .filter((c) => c.type === "radio")
                        .map((child) => (
                          <div
                            key={child.key}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={child.key}
                              id={`radio-${child.key}`}
                            />
                            <Label htmlFor={`radio-${child.key}`}>
                              {child.label}
                            </Label>
                          </div>
                        ))}
                    </RadioGroup>
                  )}
                />
                {selectedReason.children.some((c) => c.type === "input") && (
                  <Input
                    placeholder={inputPlaceholder}
                    {...form.register("customReason")}
                    className="border rounded-md px-2"
                  />
                )}
              </div>
            )}
            <Button>Save</Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ReasonModal;
