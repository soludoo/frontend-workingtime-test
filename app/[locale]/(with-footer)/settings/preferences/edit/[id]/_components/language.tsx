'use client';
import { useNetworkStatus } from '@/hooks/use-network-status';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const languages = [
  { code: 'en', labelKey: 'english' },
  { code: 'de', labelKey: 'german' },
];

const Language = () => {
  const locale = useLocale();
  const isOnline = useNetworkStatus();
  const t = useTranslations('language');
  const [selected, setSelected] = useState(locale);

  useEffect(() => {
    const savedLocale = localStorage.getItem('i18nextLng') || localStorage.getItem('locale');
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'de')) {
      setSelected(savedLocale);
    }
  }, []);

  const handleSave = () => {
    if (!isOnline || selected === locale) return;
    
    localStorage.setItem('locale', selected);
    localStorage.setItem('i18nextLng', selected);
    document.cookie = `NEXT_LOCALE=${selected}; path=/; max-age=31536000`;
    
    
    toast.success(t('success'));
    
    setTimeout(() => {
      // Use window.location to forcefully reload the app with new locale, bypassing client cache
      const segments = window.location.pathname.split('/');
      if (segments[1] === 'en' || segments[1] === 'de') {
        segments[1] = selected;
      } else {
        segments.splice(1, 0, selected);
      }
      // Re-route back to preferences directly instead of current path to fix the "<" back button issue
      const prefPath = `/${selected}/settings/preferences`;
      window.location.replace(prefPath);
    }, 500);
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='flex flex-col gap-4 p-5 flex-1'>
        {languages.map((lang, index) => (
          <React.Fragment key={lang.code}>
            <button
              onClick={() => isOnline && setSelected(lang.code)}
              disabled={!isOnline}
              className='flex items-center justify-between'>
              <p className='text-black text-sm'>{t(lang.labelKey)}</p>
              <div
                className={`size-5 rounded-full border-2 flex items-center justify-center ${
                  selected === lang.code
                    ? 'border-primary'
                    : 'border-body-400'
                }`}>
                {selected === lang.code && (
                  <div className='size-3 rounded-full bg-primary' />
                )}
              </div>
            </button>
            {index < languages.length - 1 && (
              <div className='border-b border-border w-full' />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className='p-5'>
        <Button
          onClick={handleSave}
          disabled={!isOnline || selected === locale}
          className='w-full'>
          {t('save')}
        </Button>
      </div>
    </div>
  );
};

export default Language;
