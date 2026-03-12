/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { fetchWithCache } from '@/lib/offline-cache';
import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';

const ProfilePictures = () => {
  const t = useTranslations('settingsMain');
  const [data, setData] = useState<any>(undefined);
  const formatted = useMemo(() => {
    if (!data?.start_date) return null;

    const date = new Date(data.start_date);

    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }, [data?.start_date]);

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

  return (
    <div className='flex flex-col gap-4 items-center justify-center'>
      <Avatar className='size-20'>
        <AvatarImage
          src={data?.profile_photo}
          alt={data?.full_name || 'Profile Picture'}
        />
      </Avatar>
      <div className='flex flex-col gap-1 items-center justify-center'>
        <h1 className='text-black text-xl font-semibold text-center'>
          {data?.full_name}
        </h1>
        {data && (
          <p className='text-body text-sm text-center'>{t('joined')} {formatted}</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePictures;
