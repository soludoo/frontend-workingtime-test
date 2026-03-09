'use client';
import React, { useEffect, useState } from 'react';
import { fetchWithCache } from '@/lib/offline-cache';

type SupportInfo = {
  phone: {
    number: string;
    display: string;
    available_hours: string;
  };
  email: {
    address: string;
    response_time: string;
  };
  office: {
    name: string;
    street: string;
    city: string;
    postal_code: string;
    country: string;
    full_address: string;
  };
  social: {
    website: string;
    linkedin: string;
  };
};

const ContactSupport = () => {
  const [support, setSupport] = useState<SupportInfo | undefined>(undefined);

  useEffect(() => {
    const fetchSupport = async () => {
      try {
        const result = await fetchWithCache(
          'support_info',
          '/api/settings/support/info',
        );
        if (result?.data) {
          setSupport(result.data);
        }
      } catch (error) {
        console.warn('[offline] support info:', error);
      }
    };

    fetchSupport();
  }, []);

  return (
    <div className='p-5 flex flex-col gap-4'>
      <div className='flex items-center justify-between gap-10'>
        <div className='flex flex-col gap-2'>
          <h3 className='text-black text-sm text-start'>
            {support?.phone?.display}
          </h3>
          <p className='text-body text-sm text-start'>Phone number</p>
        </div>
      </div>
      <div className='border-b border-border w-full' />
      <div className='flex items-center justify-between gap-10'>
        <div className='flex flex-col gap-2'>
          <h3 className='text-black text-sm text-start'>
            {support?.email?.address}
          </h3>
          <p className='text-body text-sm text-start'>Email address</p>
        </div>
      </div>
      <div className='border-b border-border w-full' />
      <div className='flex items-center justify-between gap-10'>
        <div className='flex flex-col gap-2'>
          <h3 className='text-black text-sm text-start'>
            {support?.office?.full_address}
          </h3>
          <p className='text-body text-sm text-start'>Office address</p>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;
