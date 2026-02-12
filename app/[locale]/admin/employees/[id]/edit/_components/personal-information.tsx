import DatePickerWithForm from "@/components/form-hook/date-picker";
import InputWithForm from "@/components/form-hook/input";
import PhoneInputWithForm from "@/components/form-hook/phone";

const PersonalInformation = () => {
  return (
    <div className="flex-1 flex flex-col gap-4">
      <h3 className="font-semibold text-black">Personal Information</h3>
      <div className="p-6 border border-border rounded-2xl flex flex-col gap-4">
        <InputWithForm label="First Name" name="first_name" />
        <InputWithForm label="Last Name" name="last_name" />
        <InputWithForm type="email" label="Email address" name="email" />
        <PhoneInputWithForm label="Phone Number" name="phone_number" />
        <InputWithForm label="Address" name="address" />
        <DatePickerWithForm label="Date of Birth" name="date_of_birth" />
      </div>
    </div>
  );
};

export default PersonalInformation;
