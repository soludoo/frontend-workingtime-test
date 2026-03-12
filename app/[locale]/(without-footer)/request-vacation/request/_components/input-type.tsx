import DatePickerWithForm from "@/components/form-hook/date-picker";
import DateRangePicker from "@/components/form-hook/date-range";
import InputWithForm from "@/components/form-hook/input";
import TextAreaWithForm from "@/components/form-hook/text-area";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

const RANGE_TYPE_IDS = [1, 2, 3, 6, 7, 8, 9, 10, 11];

const InputType = () => {
  const form = useFormContext();
  const t = useTranslations("requestVacation");
  const leaveTypeId = Number(form.watch("leave_type_id"));

  if (RANGE_TYPE_IDS.includes(leaveTypeId)) {
    return (
      <>
        <DateRangePicker
          startName="start_date"
          endName="end_date"
          label={t("dateRange")}
          placeholder={t("chooseDateRange")}
        />
        <TextAreaWithForm
          name="reason"
          label={t("comment")}
          classNameInput="h-[140px]"
          placeholder={t("commentPlaceholder")}
        />
      </>
    );
  }

  if (leaveTypeId === 4 || leaveTypeId === 5) {
    return (
      <>
        <DateRangePicker
          startName="start_date"
          endName="end_date"
          label={t("dateRange")}
          placeholder={t("chooseDateRange")}
        />
        <DatePickerWithForm
          name="expected_delivery_date"
          label={t("expectedDeliveryDate")}
          placeholder={t("periodMaternityLeave")}
        />
        <TextAreaWithForm
          name="reason"
          label={t("comment")}
          classNameInput="h-[140px]"
          placeholder={t("commentPlaceholder")}
        />
      </>
    );
  }

  if (leaveTypeId === 13) {
    return (
      <>
        <DatePickerWithForm
          name="start_date"
          label={t("date")}
          placeholder={t("selectDateLeave")}
        />
        <div className="flex flex-col gap-2">
          <p className="text-black font-medium text-xs">{t("dayPart")}</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className={cn(
                "flex-1 h-12 border border-border rounded-[12px]",
                form.watch("custom_data.day_part") === "Morning (AM)" &&
                  "border-primary",
              )}
              onClick={() => {
                form.setValue("custom_data.day_part", "Morning (AM)");
                form.setValue("specific_time", "9 AM - 12 PM");
              }}
            >
              {t("morning")}
            </button>
            <button
              type="button"
              className={cn(
                "flex-1 h-12 border border-border rounded-[12px]",
                form.watch("custom_data.day_part") === "Afternoon (PM)" &&
                  "border-primary",
              )}
              onClick={() => {
                form.setValue("custom_data.day_part", "Afternoon (PM)");
                form.setValue("specific_time", "12 PM - 5 PM");
              }}
            >
              {t("afternoon")}
            </button>
          </div>
        </div>
        <TextAreaWithForm
          name="reason"
          label={t("comment")}
          classNameInput="h-[140px]"
          placeholder={t("commentPlaceholder")}
        />
      </>
    );
  }

  if (leaveTypeId === 14) {
    return (
      <>
        <DateRangePicker
          startName="start_date"
          endName="end_date"
          label={t("dateRange")}
          placeholder={t("chooseDateRange")}
        />
        <InputWithForm
          name="custom_data.training_name"
          label={t("trainingName")}
          placeholder={t("enterTrainingName")}
        />
        <InputWithForm
          name="custom_data.provider_organizer"
          label={t("provider")}
          placeholder={t("enterProvider")}
        />
        <TextAreaWithForm
          name="reason"
          label={t("comment")}
          classNameInput="h-[140px]"
          placeholder={t("commentPlaceholder")}
        />
      </>
    );
  }

  return null;
};

export default InputType;
