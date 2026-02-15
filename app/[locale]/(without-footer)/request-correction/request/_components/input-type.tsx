import InputWithForm from "@/components/form-hook/input";
import TextAreaWithForm from "@/components/form-hook/text-area";
import { useFormContext } from "react-hook-form";

const InputType = () => {
  const form = useFormContext();

  switch (form.watch("correction_type_id")) {
    case "1":
      return (
        <>
          <InputWithForm
            name="correction_data.new_clock_in_time"
            label="New clock-in time"
            placeholder="Enter clock-in time"
            type="time"
          />
          <TextAreaWithForm
            name="comment"
            label="Comment (Optional)"
            classNameInput="h-[140px]"
            placeholder="Explain why this change is needed"
          />
        </>
      );
    case "2":
      return (
        <>
          <InputWithForm
            name="correction_data.start_time"
            label="Start Time"
            placeholder="Enter start time"
            type="time"
          />
          <InputWithForm
            name="correction_data.end_time"
            label="End Time"
            placeholder="Enter end time"
            type="time"
          />
          <InputWithForm
            name="correction_data.break_duration"
            label="Break Duration"
            placeholder="Enter break duration"
            type="number"
          />
          <TextAreaWithForm
            name="comment"
            label="Comment (Optional)"
            classNameInput="h-[140px]"
            placeholder="Explain why this change is needed"
          />
        </>
      );
    case "3":
      return (
        <>
          <InputWithForm
            name="correction_data.new_clock_out_time"
            label="New clock-out time"
            placeholder="Enter clock-out time"
            type="time"
          />
          <TextAreaWithForm
            name="comment"
            label="Comment (Optional)"
            classNameInput="h-[140px]"
            placeholder="Explain why this change is needed"
          />
        </>
      );
    case "4":
      return (
        <>
          <InputWithForm
            name="correction_data.old_clock_in_time"
            label="Old clock-in time"
            placeholder="Enter Old clock-in time"
            type="time"
          />
          <InputWithForm
            name="correction_data.new_clock_in_time"
            label="New clock-in time"
            placeholder="Enter New clock-in time"
            type="time"
          />
          <TextAreaWithForm
            name="comment"
            label="Comment (Optional)"
            classNameInput="h-[140px]"
            placeholder="Explain why this change is needed"
          />
        </>
      );
    case "5":
      return (
        <>
          <InputWithForm
            name="correction_data.old_clock_out_time"
            label="Old clock-out time"
            placeholder="Enter Old clock-out time"
            type="time"
          />
          <InputWithForm
            name="correction_data.new_clock_out_time"
            label="New clock-out time"
            placeholder="Enter New clock-out time"
            type="time"
          />
          <TextAreaWithForm
            name="comment"
            label="Comment (Optional)"
            classNameInput="h-[140px]"
            placeholder="Explain why this change is needed"
          />
        </>
      );
    case "6":
      return (
        <>
          <InputWithForm
            name="correction_data.old_break_duration"
            label="Old break duration"
            placeholder="Enter old break duration"
          />
          <InputWithForm
            name="correction_data.new_break_duration"
            label="New break duration"
            placeholder="Enter new break duration"
          />
          <TextAreaWithForm
            name="comment"
            label="Comment (Optional)"
            classNameInput="h-[140px]"
            placeholder="Explain why this change is needed"
          />
        </>
      );
    case "7":
      return (
        <>
          <InputWithForm
            name="correction_data.overtime_start"
            label="Overtime start"
            placeholder="Enter overtime start"
            type="time"
          />
          <InputWithForm
            name="correction_data.overtime_end"
            label="Overtime end"
            placeholder="Enter overtime end"
            type="time"
          />
          <TextAreaWithForm
            name="comment"
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
