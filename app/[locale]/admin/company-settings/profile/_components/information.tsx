import React from "react";
import Picture from "./picture";
import InputGroupWithForm from "@/components/form-hook/input-group";
import {
  Box,
  Building2,
  Layers2,
  Mail,
  MapPin,
  MapPinHouse,
} from "lucide-react";
import SelectWithForm from "@/components/form-hook/select";
import PhoneInputWithForm from "@/components/form-hook/phone";

const Information = () => {
  return (
    <div className="flex gap-10">
      <div className="w-[290px] flex flex-col gap-2">
        <h4 className="text-black font-semibold">Company Information</h4>
        <p className="text-body text-sm">
          We are an innovative tech company providing solutions for businesses.
        </p>
      </div>
      <div className="flex-1 flex flex-col gap-8">
        <Picture />
        <div className="flex flex-col gap-5">
          <InputGroupWithForm
            icon={<Building2 className="size-5 text-black" />}
            label="Company Name"
            name="company_name"
          />
          <SelectWithForm
            className="data-[size=default]:h-12 rounded-2xl shadow-none"
            icon={<Layers2 className="size-5 text-black" />}
            label="Industry"
            name="industry"
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
          <InputGroupWithForm
            icon={<Mail className="size-5 text-black" />}
            label="Company Email"
            name="company_email"
          />
          <PhoneInputWithForm
            name="phone"
            label="Company Phone"
            classNameInput="border-border shadow-none"
          />
          <InputGroupWithForm
            icon={<MapPinHouse className="size-5 text-black" />}
            label="Street Address"
            name="stree_address"
          />
          <InputGroupWithForm
            icon={<MapPin className="size-5 text-black" />}
            label="City"
            name="city"
          />
          <InputGroupWithForm
            icon={<MapPin className="size-5 text-black" />}
            label="State / Region"
            name="state"
          />
          <InputGroupWithForm
            icon={<MapPin className="size-5 text-black" />}
            label="Country"
            name="country"
          />
          <InputGroupWithForm
            icon={<Box className="size-5 text-black" />}
            label="Postal / Zip Code"
            name="zip_code"
          />
        </div>
      </div>
    </div>
  );
};

export default Information;
