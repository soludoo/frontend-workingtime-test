import DatePickerWithForm from "@/components/form-hook/date-picker";
import DateRangePicker from "@/components/form-hook/date-range";
import TextAreaWithForm from "@/components/form-hook/text-area";
import { useFormContext } from "react-hook-form";

const InputType = () => {
  const form = useFormContext();

  switch (form.watch("leaveTypeId")) {
    case "paid_leave":
      return (
        <>
          <DateRangePicker
            startName="startDate"
            endName="endDate"
            label="Date range"
            placeholder="Choose your date range"
          />
          <TextAreaWithForm
            name="reason"
            label="Comment (Optional)"
            classNameInput="h-[140px]"
            placeholder="ex: “Family trip 🌴”"
          />
        </>
      );
    case "sick_leave":
      return (
        <>
          <DateRangePicker
            startName="startDate"
            endName="endDate"
            label="Date range"
            placeholder="Choose your date range"
          />
          <TextAreaWithForm
            name="reason"
            label="Comment (Optional)"
            classNameInput="h-[140px]"
            placeholder="ex: “Family trip 🌴”"
          />
        </>
      );
    case "personal_leave":
      return (
        <>
          <DateRangePicker
            startName="startDate"
            endName="endDate"
            label="Date range"
            placeholder="Choose your date range"
          />
          <TextAreaWithForm
            name="reason"
            label="Comment (Optional)"
            classNameInput="h-[140px]"
            placeholder="ex: “Family trip 🌴”"
          />
        </>
      );
    case "maternity_leave":
      return (
        <>
          <DateRangePicker
            startName="startDate"
            endName="endDate"
            label="Date range"
            placeholder="Select the date of your leave"
          />
          <DateRangePicker
            startName="startDateExpected"
            endName="endDateExpected"
            label="Expected Delivery Date (optional)"
            placeholder="Period of maternity leave"
          />
          <TextAreaWithForm
            name="reason"
            label="Comment (Optional)"
            classNameInput="h-[140px]"
            placeholder="ex: “Family trip 🌴”"
          />
        </>
      );
    case "half_day":
      return (
        <>
          <DatePickerWithForm
            name="startDate"
            label="Date"
            placeholder="Select the date of your leave"
          />
          <TextAreaWithForm
            name="reason"
            label="Comment (Optional)"
            classNameInput="h-[140px]"
            placeholder="ex: “Family trip 🌴”"
          />
        </>
      );
    default:
      return null;
  }
};

export default InputType;
