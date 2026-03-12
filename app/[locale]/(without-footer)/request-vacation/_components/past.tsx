/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { fetchWithCache } from '@/lib/offline-cache';
import { Palmtree, Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CardLeave from './card-leave';
import { Spinner } from '@/components/ui/spinner';
import { useTranslations } from 'next-intl';

const Past = () => {
  const t = useTranslations('requestVacation');
  const [data, setData] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchWithCache('leave_past', '/api/leave/past');
        setData(result?.data?.leaveRequests || undefined);
      } catch (error) {
        console.warn('[offline] leave past:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Spinner className='size-6 mx-auto my-10' />;
  }

  return (
    <>
      <div className='relative flex flex-1 overflow-auto flex-col justify-between h-full py-5 gap-y-5'>
        {!data || data.length === 0 ? (
          <div className='flex-1 min-h-[400px] flex items-center justify-center flex-col gap-3'>
            <div className='size-[60px] bg-primary/10 flex items-center justify-center rounded-full'>
              <Palmtree className='size-[30px] text-primary' />
            </div>
            <div className='flex flex-col gap-2'>
              <h3 className='text-black font-semibold text-center'>
                {t('noPast')}
              </h3>
              <p className='text-black text-sm text-center'>
                {t('noRequestDesc')}
              </p>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-3'>
            {data?.map((item: any, index: number) => (
              <CardLeave
                key={index}
                status={item.status}
                title={item.reason}
                startDate={item.startDate}
                endDate={item.endDate}
                type={item.leave_type_name}
              />
            ))}
          </div>
        )}
      </div>
      <div className='sticky bottom-0 py-5 bg-white'>
        <Link href={'/request-vacation/request'}>
          <Button className='text-sm'>
            <Plus />
            {t('newRequest')}
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Past;
