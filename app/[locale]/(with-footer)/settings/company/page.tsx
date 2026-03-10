'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import PageTitleBack from '@/components/share/page-title-back';
import React, { useEffect, useState } from 'react';
import Picture from './_components/picture';
import CompanyInformation from './_components/company-information';
import LoadingContent from '@/components/layout/loading-content';
import { fetchWithCache } from '@/lib/offline-cache';

const Page = () => {
  const [data, setData] = useState<any>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchWithCache(
          'company_settings',
          '/api/settings/company',
        );
        if (result?.data) setData(result.data);
      } catch (err) {
        console.warn('[offline] company settings:', err);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return <LoadingContent />;
  }

  return (
    <section className='flex flex-col h-full'>
      <PageTitleBack title='Company Settings' />
      <div className='py-5 flex flex-col gap-5'>
        <Picture />
        <CompanyInformation data={data} />
      </div>
    </section>
  );
};

export default Page;
