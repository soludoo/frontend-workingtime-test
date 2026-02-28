"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";

type Faqs = {
  id: number;
  question: string;
  answer: string;
  category: string;
  order_index: number;
  is_active: boolean;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
};

const Faq = () => {
  const [faqs, setFaqs] = useState<Faqs[]>([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch("/api/settings/support/faq");
        const { data } = await res.json();
        if (res.ok) {
          setFaqs(data.faqs);
        } else {
          console.error("Failed to fetch FAQs:", data.message);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <div className="p-5 flex flex-col gap-4">
      <Accordion type="multiple">
        {faqs?.map((faq) => (
          <AccordionItem value={String(faq.id)} key={faq.id}>
            <AccordionTrigger className="text-black text-sm">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-body">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
