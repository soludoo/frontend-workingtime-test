/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import PageTitleBack from '@/components/share/page-title-back';
import { fetchWithCache } from '@/lib/offline-cache';
import { useEffect, useState } from 'react';
import Picture from './picture';
import PersonalInformation from './personal-information';
import DeleteAccount from './delete-account';
import LoadingContent from '@/components/layout/loading-content';
import Role from './role';

const Content = () => {
  const [data, setData] = useState<any>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchWithCache('profile', '/api/settings/profile');
        if (result?.data?.user) setData(result.data.user);
      } catch (err) {
        console.warn('[offline] profile:', err);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <LoadingContent />;
  }

  return (
    <section className='flex flex-col h-full'>
      <PageTitleBack title='Personal Information' />
      <div className='py-5 flex flex-col gap-5 px-5'>
        <Picture url={data.profile_photo} />
        <PersonalInformation user={data} />
        <Role user={data} />
        <DeleteAccount />
      </div>
    </section>
  );
};

export default Content;
