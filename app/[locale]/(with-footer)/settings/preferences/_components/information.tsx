'use client';
import { useNetworkStatus } from '@/hooks/use-network-status';
import { ChevronRight } from 'lucide-react';
import { useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

const Informations = () => {
  const router = useRouter();
  const isOnline = useNetworkStatus();
  const locale = useLocale();
  const t = useTranslations('settings');
  const tLang = useTranslations('language');

  const getLanguageLabel = () => {
    switch (locale) {
      case 'en':
        return tLang('english');
      case 'de':
        return tLang('german');
      default:
        return tLang('english');
    }
  };
  return (
    <div className='p-5 flex flex-col gap-4'>
      <button
        onClick={() =>
          isOnline && router.push(`/settings/preferences/edit/language`)
        }
        className='flex items-center justify-between'
        disabled={!isOnline}>
        <p className='text-black text-sm'>{t('language')}</p>
        <div className='flex items-center gap-2'>
          <p className='text-body-400 text-sm'>{getLanguageLabel()}</p>
          {isOnline && <ChevronRight className='size-5 text-body-400' />}
        </div>
      </button>
      <div className='border-b border-border w-full' />
      <button
        onClick={() =>
          isOnline && router.push(`/settings/preferences/edit/time-format`)
        }
        className='flex items-center justify-between'
        disabled={!isOnline}>
        <p className='text-black text-sm'>{t('time-format')}</p>
        <div className='flex items-center gap-2'>
          <p className='text-body-400 text-sm'>24-hour</p>
          {isOnline && <ChevronRight className='size-5 text-body-400' />}
        </div>
      </button>
      <div className='border-b border-border w-full' />
      <button
        onClick={() =>
          isOnline && router.push(`/settings/preferences/edit/first-day`)
        }
        className='flex items-center justify-between'
        disabled={!isOnline}>
        <p className='text-black text-sm'>{t('first-day')}</p>
        <div className='flex items-center gap-2'>
          <p className='text-body-400 text-sm'>Monday</p>
          {isOnline && <ChevronRight className='size-5 text-body-400' />}
        </div>
      </button>
    </div>
  );
};

export default Informations;
