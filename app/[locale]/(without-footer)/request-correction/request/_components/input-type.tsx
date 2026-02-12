import InputWithForm from "@/components/form-hook/input";
import TextAreaWithForm from "@/components/form-hook/text-area";
import { useFormContext } from "react-hook-form";

const InputType = () => {
  const form = useFormContext();

  switch (form.watch("correctionType")) {
    case "missing_work_entry":
      return (
        <>
          <InputWithForm
            name="start_time"
            label="Start Time"
            placeholder="Enter start time"
            type="time"
          />
          <InputWithForm
            name="end_time"
            label="End Time"
            placeholder="Enter end time"
            type="time"
          />
          <InputWithForm
            name="break"
            label="Break Duration"
            placeholder="Enter break duration"
            type="time"
          />
          <TextAreaWithForm
            name="reason"
            label="Comment (Optional)"
            classNameInput="h-[140px]"
            placeholder="Explain why this change is needed"
          />
        </>
      );
    case "wrong_clock_time":
      return (
        <>
          <InputWithForm
            name="old_time"
            label="Old clock-in time"
            placeholder="Enter Old clock-in time"
            type="time"
          />
          <InputWithForm
            name="new_time"
            label="New clock-in time"
            placeholder="Enter New clock-in time"
            type="time"
          />
          <TextAreaWithForm
            name="reason"
            label="Comment (Optional)"
            classNameInput="h-[140px]"
            placeholder="Explain why this change is needed"
          />
        </>
      );
    case "missing_break":
      return (
        <>
          <InputWithForm
            name="old_break"
            label="Old break duration"
            placeholder="Enter old break duration"
            type="time"
          />
          <InputWithForm
            name="new_break"
            label="New break duration"
            placeholder="Enter new break duration"
            type="time"
          />
          <TextAreaWithForm
            name="reason"
            label="Comment (Optional)"
            classNameInput="h-[140px]"
            placeholder="Explain why this change is needed"
          />
        </>
      );
    case "overtime_request":
      return (
        <>
          <InputWithForm
            name="start_time"
            label="Overtime start"
            placeholder="Enter overtime start"
            type="time"
          />
          <InputWithForm
            name="end_time"
            label="Overtime end"
            placeholder="Enter overtime end"
            type="time"
          />
          <TextAreaWithForm
            name="reason"
            label="Comment (Optional)"
            classNameInput="h-[140px]"
            placeholder="Explain why this change is needed"
          />
        </>
      );
    default:
      return null;
  }
};

export default InputType;
