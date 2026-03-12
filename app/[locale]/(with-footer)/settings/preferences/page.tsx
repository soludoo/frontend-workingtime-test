import PageTitleBack from '@/components/share/page-title-back';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import Informations from './_components/information';

const Page = async () => {
  const t = await getTranslations('settings');
  return (
    <section className='flex flex-col h-full'>
      <PageTitleBack title={t('preferences')} customLink="/settings" />
      <Informations />
    </section>
  );
};

export default Page;
