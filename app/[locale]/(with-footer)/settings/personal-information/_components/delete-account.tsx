'use client';
import DeleteAccountModal from '@/components/modals/delete-account';
import { useNetworkStatus } from '@/hooks/use-network-status';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

const DeleteAccount = () => {
  const t = useTranslations('personalInformation');
  const [open, setOpen] = React.useState(false);
  const isOnline = useNetworkStatus();

  if (!isOnline) return null;

  return (
    <>
      <DeleteAccountModal open={open} onClose={() => setOpen(false)} />
      <button
        onClick={() => setOpen(true)}
        className='flex items-center justify-between p-4 border border-border rounded-2xl'>
        <p className='text-red text-sm'>{t('deleteAccount')}</p>
        <ChevronRight className='size-5 text-red' />
      </button>
    </>
  );
};

export default DeleteAccount;
