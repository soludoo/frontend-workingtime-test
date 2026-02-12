import InputWithForm from "@/components/form-hook/input";
import SelectWithForm from "@/components/form-hook/select";

const WorkInformation = () => {
  return (
    <div className="flex-1 flex flex-col gap-4">
      <h3 className="font-semibold text-black">Work Information</h3>
      <div className="p-6 border border-border rounded-2xl flex flex-col gap-4">
        <SelectWithForm
          name="role"
          label="Role"
          options={[
            {
              key: "employee",
              label: "Employee",
            },
            {
              key: "admin",
              label: "Admin",
            },
          ]}
        />
        <SelectWithForm
          name="department"
          label="Department"
          options={[
            {
              key: "design",
              label: "Design",
            },
            {
              key: "it",
              label: "IT",
            },
          ]}
        />
        <div className="flex gap-4">
          <InputWithForm
            label="Working Hours Start"
            name="working_hours_start"
            type="time"
          />
          <InputWithForm
            label="Working Hours End"
            name="working_hours_end"
            type="time"
          />
        </div>
        <InputWithForm label="Work Model" name="work_model" />
        <InputWithForm label="Manager" name="manager" />
        <InputWithForm label="Employee ID" name="employee_id" disabled />
      </div>
    </div>
  );
};

export default WorkInformation;
