import InputWithForm from "@/components/form-hook/input";
import TextAreaWithForm from "@/components/form-hook/text-area";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

const InputType = () => {
  const t = useTranslations("requestCorrection");
  const form = useFormContext();

  switch (form.watch("correction_type_id")) {
    case "1":
      return (
        <>
          <InputWithForm
            name="correction_data.new_clock_in_time"
            label={t("newClockInTime")}
            placeholder={t("enterClockInTime")}
            type="time"
          />
          <TextAreaWithForm
            name="comment"
            label={t("comment")}
            classNameInput="h-[140px]"
            placeholder={t("commentPlaceholder")}
          />
        </>
      );
    case "2":
      return (
        <>
          <InputWithForm
            name="correction_data.start_time"
            label={t("startTime")}
            placeholder={t("enterStartTime")}
            type="time"
          />
          <InputWithForm
            name="correction_data.end_time"
            label={t("endTime")}
            placeholder={t("enterEndTime")}
            type="time"
          />
          <InputWithForm
            name="correction_data.break_duration"
            label={t("breakDuration")}
            placeholder={t("enterBreakDuration")}
            type="number"
          />
          <TextAreaWithForm
            name="comment"
            label={t("comment")}
            classNameInput="h-[140px]"
            placeholder={t("commentPlaceholder")}
          />
        </>
      );
    case "3":
      return (
        <>
          <InputWithForm
            name="correction_data.new_clock_out_time"
            label={t("newClockOutTime")}
            placeholder={t("enterClockOutTime")}
            type="time"
          />
          <TextAreaWithForm
            name="comment"
            label={t("comment")}
            classNameInput="h-[140px]"
            placeholder={t("commentPlaceholder")}
          />
        </>
      );
    case "4":
      return (
        <>
          <InputWithForm
            name="correction_data.old_clock_in_time"
            label={t("oldClockInTime")}
            placeholder={t("enterOldClockInTime")}
            type="time"
          />
          <InputWithForm
            name="correction_data.new_clock_in_time"
            label={t("newClockInTime")}
            placeholder={t("enterClockInTime")}
            type="time"
          />
          <TextAreaWithForm
            name="comment"
            label={t("comment")}
            classNameInput="h-[140px]"
            placeholder={t("commentPlaceholder")}
          />
        </>
      );
    case "5":
      return (
        <>
          <InputWithForm
            name="correction_data.old_clock_out_time"
            label={t("oldClockOutTime")}
            placeholder={t("enterOldClockOutTime")}
            type="time"
          />
          <InputWithForm
            name="correction_data.new_clock_out_time"
            label={t("newClockOutTime")}
            placeholder={t("enterClockOutTime")}
            type="time"
          />
          <TextAreaWithForm
            name="comment"
            label={t("comment")}
            classNameInput="h-[140px]"
            placeholder={t("commentPlaceholder")}
          />
        </>
      );
    case "6":
      return (
        <>
          <InputWithForm
            name="correction_data.old_break_duration"
            label={t("oldBreakDuration")}
            placeholder={t("enterOldBreakDuration")}
          />
          <InputWithForm
            name="correction_data.new_break_duration"
            label={t("newBreakDuration")}
            placeholder={t("enterNewBreakDuration")}
          />
          <TextAreaWithForm
            name="comment"
            label={t("comment")}
            classNameInput="h-[140px]"
            placeholder={t("commentPlaceholder")}
          />
        </>
      );
    case "7":
      return (
        <>
          <InputWithForm
            name="correction_data.overtime_start"
            label={t("overtimeStart")}
            placeholder={t("enterOvertimeStart")}
            type="time"
          />
          <InputWithForm
            name="correction_data.overtime_end"
            label={t("overtimeEnd")}
            placeholder={t("enterOvertimeEnd")}
            type="time"
          />
          <TextAreaWithForm
            name="comment"
            label={t("comment")}
            classNameInput="h-[140px]"
            placeholder={t("commentPlaceholder")}
          />
        </>
      );
    default:
      return null;
  }
};

export default InputType;
