/* eslint-disable @typescript-eslint/no-explicit-any */
import PhoneInputWithForm from '@/components/form-hook/phone';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useNetworkStatus } from '@/hooks/use-network-status';
import { fetchWithCache } from '@/lib/offline-cache';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type FormValues = {
  phone: string;
};

const PhoneNumber = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isOnline = useNetworkStatus();
  const form = useForm<FormValues>({
    defaultValues: {
      phone: '',
    },
  });
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchWithCache('profile', '/api/settings/profile');
      const user = result?.data?.user;
      if (user) {
        form.reset({
          phone: user?.phone || '',
        });
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/settings/profile/phone`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: data.phone.trim(),
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || 'Failed to update profile');
      }
      form.reset({
        phone: data.phone.trim(),
      });
      toast.success(result.message);
      router.push('/settings/personal-information');
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
        onSubmit={form.handleSubmit(onSubmit)}
        className='px-5 flex-1 flex flex-col justify-between py-9 gap-10'>
        <PhoneInputWithForm
          name={'phone'}
          label={'Phone Number'}
          disabled={!isOnline}
        />
        <Button disabled={isLoading || !isOnline}>
          {isLoading && <Spinner />}
          {isOnline ? 'Save' : 'Offline - Read Only'}
        </Button>
      </form>
    </FormProvider>
  );
};

export default PhoneNumber;
