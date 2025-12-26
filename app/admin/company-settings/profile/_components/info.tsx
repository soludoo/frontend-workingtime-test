import InputGroupWithForm from "@/components/form-hook/input-group";
import { Clock10, FileDigit, Globe } from "lucide-react";

const Info = () => {
  return (
    <div className="flex gap-10">
      <div className="w-[290px] flex flex-col gap-2">
        <h4 className="text-black font-semibold">Additional Info</h4>
        <p className="text-body text-sm">
          Lorem ipsum dolor sit amet neplut amplitudo.
        </p>
      </div>
      <div className="flex-1 flex flex-col gap-5">
        <InputGroupWithForm
          icon={<Globe className="size-5 text-black" />}
          label="Website"
          name="website"
        />
        <InputGroupWithForm
          icon={<FileDigit className="size-5 text-black" />}
          label="Company Registration Number"
          name="company_registration_number"
        />
        <InputGroupWithForm
          icon={<Clock10 className="size-5 text-black" />}
          label="Timezone"
          name="timezone"
        />
      </div>
    </div>
  );
};

export default Info;
