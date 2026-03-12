'use client';
import { useNetworkStatus } from '@/hooks/use-network-status';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';

const Information = () => {
  const router = useRouter();
  const isOnline = useNetworkStatus();
  const t = useTranslations('support');
  return (
    <div className='p-5 flex flex-col gap-4'>
      <button
        onClick={() => router.push(`/settings/support/faq`)}
        className='flex items-center justify-between'>
        <p className='text-black text-sm'>{t('faq')}</p>
        <div className='flex items-center gap-2'>
          <ChevronRight className='size-5 text-body-400' />
        </div>
      </button>
      <div className='border-b border-border w-full' />
      <button
        onClick={() => router.push(`/settings/support/contact-support`)}
        className='flex items-center justify-between'>
        <p className='text-black text-sm'>{t('contactSupport')}</p>
        <div className='flex items-center gap-2'>
          <ChevronRight className='size-5 text-body-400' />
        </div>
      </button>
      <div className='border-b border-border w-full' />
      <button
        onClick={() => isOnline && router.push(`/settings/support/report`)}
        className='flex items-center justify-between'
        disabled={!isOnline}>
        <p className={`text-sm ${!isOnline ? 'text-body-400' : 'text-black'}`}>
          {t('reportProblem')}
        </p>
        <div className='flex items-center gap-2'>
          {isOnline && <ChevronRight className='size-5 text-body-400' />}
        </div>
      </button>
    </div>
  );
};

export default Information;
