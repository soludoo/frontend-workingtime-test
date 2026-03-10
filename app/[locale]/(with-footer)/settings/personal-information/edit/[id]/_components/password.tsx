/* eslint-disable @typescript-eslint/no-explicit-any */
import PasswordInputWithForm from '@/components/form-hook/password';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useNetworkStatus } from '@/hooks/use-network-status';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const passwordRules = z
  .string()
  .min(6, 'Password must be at least 6 characters');

export const passwordSchema = z
  .object({
    current_password: passwordRules,
    new_password: passwordRules,
    confirm_password: passwordRules,
  })
  .refine((data) => data.new_password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords do not match',
  });

export type FormValues = z.infer<typeof passwordSchema>;

const Password = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isOnline = useNetworkStatus();
  const form = useForm<FormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
  });
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/settings/profile/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          current_password: data.current_password.trim(),
          new_password: data.new_password.trim(),
          confirm_password: data.confirm_password.trim(),
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || 'Failed to update profile');
      }
      form.reset({
        current_password: data.current_password.trim(),
        new_password: result.data?.user?.new_password ?? data.new_password,
        confirm_password:
          result.data?.user?.confirm_password ?? data.confirm_password,
      });
      toast.success('Password updated successfully. Please log in again.');
      router.push('/login');
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
        <div className='flex flex-col gap-5'>
          <PasswordInputWithForm
            name={'current_password'}
            label={'Enter Password'}
            placeholder='******'
            disabled={!isOnline}
          />
          <PasswordInputWithForm
            name={'new_password'}
            label={'Enter new password'}
            placeholder='******'
            disabled={!isOnline}
          />
          <PasswordInputWithForm
            name={'confirm_password'}
            label={'Confirm new password'}
            placeholder='******'
            disabled={!isOnline}
          />
        </div>
        <Button disabled={isLoading || !isOnline}>
          {isLoading && <Spinner />}
          {isOnline ? 'Save' : 'Offline - Read Only'}
        </Button>
      </form>
    </FormProvider>
  );
};

export default Password;
