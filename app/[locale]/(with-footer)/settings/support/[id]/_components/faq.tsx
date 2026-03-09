'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { fetchWithCache } from '@/lib/offline-cache';
import { useEffect, useState } from 'react';

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
        const result = await fetchWithCache('faq', '/api/settings/support/faq');
        if (result?.data?.faqs) {
          setFaqs(result.data.faqs);
        }
      } catch (error) {
        console.warn('[offline] FAQ:', error);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <div className='p-5 flex flex-col gap-4'>
      <Accordion type='multiple'>
        {faqs?.map((faq) => (
          <AccordionItem value={String(faq.id)} key={faq.id}>
            <AccordionTrigger className='text-black text-sm'>
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className='text-sm text-body'>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
