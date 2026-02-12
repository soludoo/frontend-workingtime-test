import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <main className="relative mx-auto max-w-md min-h-screen overflow-hidden bg-white dark:bg-[#03020F]">
      <Image
        src="/images/bg-onboarding.png"
        alt="Boarding"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 h-screen flex flex-col justify-end gap-24 pb-10 px-5">
        <div className="flex flex-col gap-3">
          <h3 className="text-white font-semibold text-2xl text-center">
            Track your work time easily
          </h3>
          <p className="text-white text-center">
            Clock in, manage time entries, and request leave — all in one place.
          </p>
        </div>
        <Link href="/login">
          <Button>Sign In</Button>
        </Link>
      </div>
    </main>
  );
};

export default Page;
