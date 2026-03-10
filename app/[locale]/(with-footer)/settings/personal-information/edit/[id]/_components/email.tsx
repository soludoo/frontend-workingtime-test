/* eslint-disable @typescript-eslint/no-explicit-any */
import InputWithForm from '@/components/form-hook/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useNetworkStatus } from '@/hooks/use-network-status';
import { fetchWithCache } from '@/lib/offline-cache';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type FormValues = {
  email: string;
};

const EmailAddress = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isOnline = useNetworkStatus();
  const form = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchWithCache('profile', '/api/settings/profile');
      const user = result?.data?.user;
      if (user) {
        form.reset({
          email: user?.email || '',
        });
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/settings/profile/email`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email.trim(),
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || 'Failed to update profile');
      }
      form.reset({
        email: result.data?.user?.email ?? data.email,
      });
      toast.success(result.message);
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
        <InputWithForm
          type='email'
          name={'email'}
          label={'Email Address'}
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

export default EmailAddress;
