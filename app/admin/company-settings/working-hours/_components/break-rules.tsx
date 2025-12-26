import SelectWithForm from "@/components/form-hook/select";
import SwitchBorderWithForm from "@/components/form-hook/switch";
import React from "react";

const BreakRules = () => {
  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <div className="flex flex-col gap-2">
        <h4 className="font-semibold text-black">Break Rules</h4>
        <p className="text-body text-sm">
          Define how break time is applied during working hours.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <SwitchBorderWithForm name="break_required" label="Break Required" />
        <SwitchBorderWithForm name="auto_deduct" label="Auto-deduct break" />
        <SelectWithForm
          label="Break durations"
          className="h-12"
          name="break_durations"
          placeholder="Break Duration"
          options={[
            {
              key: "1h",
              label: "1h",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default BreakRules;
