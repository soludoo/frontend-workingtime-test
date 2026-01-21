"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackAdmin = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      type="button"
      className="flex items-center gap-2 text-black text-sm"
    >
      <ChevronLeft className="size-5" />
      Back
    </button>
  );
};

export default BackAdmin;
