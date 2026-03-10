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
  industry: string;
};

const Category = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isOnline = useNetworkStatus();
  const form = useForm<FormValues>({
    defaultValues: {
      industry: '',
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchWithCache(
        'company_settings',
        '/api/settings/company',
      );
      const company = result?.data?.company;
      if (company) {
        form.reset({
          industry: company?.industry || '',
        });
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/settings/company/industry`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          industry: data.industry.trim(),
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || 'Failed to update company');
      }
      form.reset({
        industry: result.data?.company?.industry ?? data.industry,
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
          name={'industry'}
          label={'Industry / Category'}
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

export default Category;
