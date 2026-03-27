import InputWithForm from "@/components/form-hook/input";
import TextAreaWithForm from "@/components/form-hook/text-area";

type Field = {
  label: string;
  required: boolean;
  field_name: string;
  field_type: string;
};

const InputType = ({ fields }: { fields: Field[] }) => {
  if (!fields?.length) return null;

  return (
    <>
      {fields.map((field) => {
        const name = `correction_data.${field.field_name}`;

        switch (field.field_type) {
          case "time":
          case "number":
          case "text":
            return (
              <InputWithForm
                key={name}
                name={name}
                label={field.label}
                placeholder={field.label}
                type={field.field_type}
              />
            );

          case "textarea":
            return (
              <TextAreaWithForm
                key={name}
                name={name}
                label={field.label}
                placeholder={field.label}
                classNameInput="h-[140px]"
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
};

export default InputType;
