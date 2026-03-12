/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useNetworkStatus } from '@/hooks/use-network-status';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const PersonalInformation = ({ user }: { user: any }) => {
  const router = useRouter();
  const isOnline = useNetworkStatus();
  const t = useTranslations('personalInformation');

  return (
    <div className='p-4 flex flex-col gap-4 border border-border rounded-2xl'>
      <button
        onClick={() =>
          isOnline &&
          router.push(`/settings/personal-information/edit/full-name`)
        }
        className='flex items-center justify-between'
        disabled={!isOnline}>
        <p className='text-black text-sm'>{t('fullName')}</p>
        <div className='flex items-center gap-2'>
          <p className='text-body-400 text-sm'>{user.full_name}</p>
          {isOnline && <ChevronRight className='size-5 text-body-400' />}
        </div>
      </button>
      <div className='border-b border-border w-full' />
      <button
        onClick={() =>
          isOnline &&
          router.push(`/settings/personal-information/edit/phone-number`)
        }
        className='flex items-center justify-between'
        disabled={!isOnline}>
        <p className='text-black text-sm'>{t('phoneNumber')}</p>
        <div className='flex items-center gap-2'>
          <p className='text-body-400 text-sm'>{user.phone}</p>
          {isOnline && <ChevronRight className='size-5 text-body-400' />}
        </div>
      </button>
      <div className='border-b border-border w-full' />
      <button
        onClick={() =>
          isOnline &&
          router.push(`/settings/personal-information/edit/password`)
        }
        className='flex items-center justify-between'
        disabled={!isOnline}>
        <p className='text-black text-sm'>{t('password')}</p>
        <div className='flex items-center gap-2'>
          <p className='text-body-400 text-sm'>{t('changePassword')}</p>
          {isOnline && <ChevronRight className='size-5 text-body-400' />}
        </div>
      </button>
    </div>
  );
};

export default PersonalInformation;
