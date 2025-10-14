"use client";
import ReasonModal from "@/components/modals/reason";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const Page = () => {
  const [isClockIn, setIsClockIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <ReasonModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
      <section className="flex flex-col gap-5 items-center justify-center h-screen max-w-xl mx-auto">
        <h1 className="text-2xl font-semibold">Absence Tracking</h1>
        {isClockIn ? (
          <Button size={"lg"} onClick={() => setIsModalOpen(true)}>
            Clock Out
          </Button>
        ) : (
          <Button size={"lg"} onClick={() => setIsClockIn(!isClockIn)}>
            Clock In
          </Button>
        )}
        <div className="flex flex-col gap-4 justify-start">
          <h2 className="text-lg font-medium">Status: Day finished</h2>
        </div>
        <div className="flex flex-col gap-3 items-start">
          <h2 className="text-lg font-medium text-start">History:</h2>
          <div className="flex items-center gap-2">1. Present at 9:00 AM</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">2. Break at 12:00 PM</div>
            <div className="ml-4 flex items-center gap-2">
              Reason: Lunch Break
            </div>
          </div>
          <div className="flex items-center gap-2">3. Present at 13:00 PM</div>
          <div className="flex items-center gap-2">4. Finished at 17:00 PM</div>
        </div>
      </section>
    </>
  );
};

export default Page;
