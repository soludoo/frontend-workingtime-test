import React from "react";
import RegisterForm from "./_components/register-form";

const Page = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex-1 flex flex-col gap-6 pt-3">
        <div className="flex flex-col gap-3">
          <h1 className="text-black text-center text-2xl font-medium">
            Create your account
          </h1>
          <p className="text-body text-center text-sm">
            Set up your profile to start tracking your working hours.
          </p>
        </div>
        <RegisterForm />
      </div>
      <p className="text-primary text-center py-5">
        Terms of use & Privacy policy
      </p>
    </div>
  );
};

export default Page;
