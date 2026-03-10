'use client';
import { useNetworkStatus } from '@/hooks/use-network-status';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Information = () => {
  const router = useRouter();
  const isOnline = useNetworkStatus();
  return (
    <div className='p-5 flex flex-col gap-4'>
      <button
        onClick={() => router.push(`/settings/support/faq`)}
        className='flex items-center justify-between'>
        <p className='text-black text-sm'>FAQ</p>
        <div className='flex items-center gap-2'>
          <ChevronRight className='size-5 text-body-400' />
        </div>
      </button>
      <div className='border-b border-border w-full' />
      <button
        onClick={() => router.push(`/settings/support/contact-support`)}
        className='flex items-center justify-between'>
        <p className='text-black text-sm'>Contact Support</p>
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
          Report a problem
        </p>
        <div className='flex items-center gap-2'>
          {isOnline && <ChevronRight className='size-5 text-body-400' />}
        </div>
      </button>
    </div>
  );
};

export default Information;
