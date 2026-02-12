import RegisterForm from "./_components/register-form";

const Page = () => {
  return (
    <div className="flex flex-col justify-between h-full pt-5">
      <div className="flex-1 flex flex-col gap-6 pt-3">
        <div className="flex flex-col gap-3">
          <h1 className="text-black text-center text-2xl font-medium">
            Set your password
          </h1>
          <p className="text-body text-center text-sm">
            Create a password to activate your account and start using the
            system.
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Page;
