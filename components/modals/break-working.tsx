/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import SelectWithForm from '../form-hook/select';
import TextAreaWithForm from '../form-hook/text-area';
import { Button } from '../ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../ui/drawer';
import { FormProvider, useForm } from 'react-hook-form';
import { fetchWithCache } from '@/lib/offline-cache';
import { useTranslations } from 'next-intl';

const BreakWorking = ({
  open,
  onClose,
  onAction,
}: {
  open: boolean;
  onClose: () => void;
  onAction: (value: any) => void;
}) => {
  const form = useForm();
  const t = useTranslations('trackers.break');
  const [breakTypes, setBreakTypes] = useState<
    { key: string; label: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchWithCache('break_types', '/api/break-types');
        if (result?.data?.break_types) {
          setBreakTypes(
            result.data.break_types.map(
              (item: { id: number; name: string }) => ({
                key: item.id,
                label: item.name,
              }),
            ),
          );
        }
      } catch (err) {
        console.warn('[offline] Failed to fetch break types:', err);
      }
    };
    if (open) {
      fetchData();
    }
  }, [open]);

  const onSubmit = (data: any) => {
    onAction({
      breakType: breakTypes?.find((item: any) => item?.id === data.break_type)
        ?.label,
      breakTypeId: data.break_type,
      notes: data.note,
    });
    onClose();
    form.reset();
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader className='items-start px-0'>
          <DrawerTitle>{t('title')}</DrawerTitle>
          <DrawerDescription>
            {t('desc')}
          </DrawerDescription>
        </DrawerHeader>
        <FormProvider {...form}>
          <form
            className='flex flex-col gap-4'
            onSubmit={form.handleSubmit(onSubmit)}>
            <SelectWithForm
              label={t('breakType')}
              name='break_type'
              options={breakTypes}
              placeholder={t('selectBreakType')}
            />
            <TextAreaWithForm
              name='note'
              label={t('note')}
              placeholder={t('notePlaceholder')}
              classNameInput='h-[140px]'
            />
            <DrawerFooter className='flex items-center gap-2 flex-row px-0'>
              <Button
                className='flex-1'
                variant={'outline'}
                type='button'
                onClick={onClose}>
                {t('cancel')}
              </Button>
              <Button className='flex-1'>{t('startBreak')}</Button>
            </DrawerFooter>
          </form>
        </FormProvider>
      </DrawerContent>
    </Drawer>
  );
};

export default BreakWorking;
