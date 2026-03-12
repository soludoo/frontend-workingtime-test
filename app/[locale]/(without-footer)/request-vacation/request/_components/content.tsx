/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import SelectDrawerWithForm from '@/components/form-hook/select-drawer';
import { Button } from '@/components/ui/button';
import { fetchWithCache } from '@/lib/offline-cache';
import { useEffect, useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import InputType from './input-type';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const Content = () => {
  const t = useTranslations('requestVacation');
  const form = useForm();
  const leaveTypeId = useWatch({
    control: form.control,
    name: 'leave_type_id',
  });

  const router = useRouter();
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchWithCache('leave_types', '/api/leave/type');
        if (result?.data?.leave_types) {
          setOptions(
            result.data.leave_types.map(
              (item: { id: string; name: string }) => ({
                key: item.id,
                label: item.name,
              }),
            ),
          );
        }
      } catch (err) {
        console.warn('[offline] leave types:', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!leaveTypeId) return;

    form.reset(
      {
        leave_type_id: leaveTypeId,
      },
      {
        keepDirty: false,
        keepTouched: false,
      },
    );
  }, [leaveTypeId, form]);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/leave/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || 'Failed to update profile');
      }
      form.reset({});
      toast.success(
        result.message || t('successSubmit'),
      );
      router.push('/request-vacation');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className='flex-1 flex flex-col justify-between gap-10 py-5'
        onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4'>
          <SelectDrawerWithForm
            options={options}
            name='leave_type_id'
            label={t('typeOfLeave')}
            placeholder={t('chooseLeave')}
          />
          <InputType />
        </div>
        <Button disabled={isLoading}>
          {isLoading && <Spinner className='size-5' />} {t('submitRequest')}
        </Button>
      </form>
    </FormProvider>
  );
};

export default Content;
