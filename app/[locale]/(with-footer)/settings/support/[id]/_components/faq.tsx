import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

const Faq = () => {
  return (
    <div className="p-5 flex flex-col gap-4">
      <Accordion type="multiple">
        <AccordionItem value="1">
          <AccordionTrigger className="text-black text-sm">
            How do I request time off?
          </AccordionTrigger>
          <AccordionContent className="text-sm text-body">
            To request time off, navigate to the {"'"}Time Off{"'"} section in
            the app, select the dates, choose a reason, and submit your request.
            Your manager will be notified for approval.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionTrigger className="text-black text-sm">
            What types of leave are available?
          </AccordionTrigger>
          <AccordionContent className="text-sm text-body">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="3">
          <AccordionTrigger className="text-black text-sm">
            How do I view my time off history?
          </AccordionTrigger>
          <AccordionContent className="text-sm text-body">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="4">
          <AccordionTrigger className="text-black text-sm">
            Can I edit or cancel a time off request?
          </AccordionTrigger>
          <AccordionContent className="text-sm text-body">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="5">
          <AccordionTrigger className="text-black text-sm">
            How is my accrual balance calculated?
          </AccordionTrigger>
          <AccordionContent className="text-sm text-body">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="6">
          <AccordionTrigger className="text-black text-sm">
            What holidays are observed by the company?
          </AccordionTrigger>
          <AccordionContent className="text-sm text-body">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="7">
          <AccordionTrigger className="text-black text-sm">
            Who do I contact for payroll questions?
          </AccordionTrigger>
          <AccordionContent className="text-sm text-body">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Faq;
