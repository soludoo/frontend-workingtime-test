import PageTitleBack from '@/components/share/page-title-back';
import React from 'react';
import Content from './_components/content';
import { getTranslations } from 'next-intl/server';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const t = await getTranslations('settings');
  
  let translatedTitle = id;
  if (id === 'language') translatedTitle = t('language');
  if (id === 'time-format') translatedTitle = t('time-format');
  if (id === 'first-day') translatedTitle = t('first-day');

  return (
    <section className='flex flex-col'>
      <PageTitleBack title={translatedTitle} />
      <Content id={id} />
    </section>
  );
};

export default Page;
