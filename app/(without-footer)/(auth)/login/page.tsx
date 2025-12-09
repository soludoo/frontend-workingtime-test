import React from "react";
import LoginForm from "./_components/login-form";

const Page = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex-1 flex flex-col gap-6 pt-3">
        <div className="flex flex-col gap-3">
          <h1 className="text-black text-center text-2xl font-medium">
            Sign in to your account
          </h1>
          <p className="text-body text-center text-sm">
            Manage your work schedule, request time off, and view your daily
            logs with ease. Stay organized and in control of your work life.
          </p>
        </div>
        <LoginForm />
      </div>
      <p className="text-primary text-center py-5">
        Terms of use & Privacy policy
      </p>
    </div>
  );
};

export default Page;
