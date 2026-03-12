'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { useNetworkStatus } from '@/hooks/use-network-status';
import { useTranslations } from 'next-intl';
import React from 'react';

const TimeFormat = () => {
  const isOnline = useNetworkStatus();
  const t = useTranslations('timeFormat');
  return (
    <div className='flex flex-col gap-4 p-5'>
      <div className='flex items-center justify-between gap-5'>
        <div className='flex flex-col gap-2'>
          <h3 className='text-sm text-black'>{t('24hour')}</h3>
          <p className='text-body text-sm'>{t('24hourDesc')}</p>
        </div>
        <Checkbox className='rounded-full size-5' disabled={!isOnline} />
      </div>
      <div className='border-b border-border w-full' />
      <div className='flex items-center justify-between gap-5'>
        <div className='flex flex-col gap-2'>
          <h3 className='text-sm text-black'>{t('12hour')}</h3>
          <p className='text-body text-sm'>{t('12hourDesc')}</p>
        </div>
        <Checkbox className='rounded-full size-5' disabled={!isOnline} />
      </div>
    </div>
  );
};

export default TimeFormat;
