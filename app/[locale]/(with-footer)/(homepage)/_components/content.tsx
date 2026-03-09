'use client';
import Header from './header';
import ClockContent from './clock';
import WorkSummary from './work-summary';
import { Spinner } from '@/components/ui/spinner';
import { useWorkTracker } from '@/hooks/use-work-tracker';
import { useEffect, useRef, useState } from 'react';
import { fetchWithCache } from '@/lib/offline-cache';
import { preloadEssentialData } from '@/lib/preload-cache';

const Content = () => {
  const { data, start, pause, resume, stop } = useWorkTracker();
  const [summary, setSummary] = useState(undefined);
  const preloaded = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchWithCache(
          'work_summary',
          '/api/timer/work-summary',
        );
        if (result?.data) {
          setSummary(result.data);
        } else if (result) {
          setSummary(result);
        }
      } catch (err) {
        console.warn('[offline] Failed to fetch work summary:', err);
      }
    };

    fetchData();

    // Preload ALL essential data for offline use (only once)
    if (!preloaded.current) {
      preloaded.current = true;
      preloadEssentialData();
    }
  }, []);

  if (!data) {
    return <Spinner color='loading' className='mx-auto my-auto size-6' />;
  }

  return (
    <div className='flex flex-col gap-6'>
      <Header summary={summary} />
      <ClockContent
        data={data}
        start={start}
        pause={pause}
        resume={resume}
        stop={stop}
      />
      <WorkSummary summary={summary} data={data} />
    </div>
  );
};

export default Content;
