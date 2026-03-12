'use client';
import SignOut from '@/components/modals/sign-out';
import BorderSection from '@/components/share/border-section';
import { DarkModeSwitch } from '@/components/theme/dark-mode-switch';
import { useNetworkStatus } from '@/hooks/use-network-status';
import {
  Building2,
  CircleUserRound,
  FileQuestionMark,
  FileSliders,
  Info,
  LogOut,
  SunMoon,
} from 'lucide-react';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

const Sections = () => {
  const t = useTranslations('settingsMain');
  const [modal, setModal] = useState(false);
  const isOnline = useNetworkStatus();
  return (
    <>
      <SignOut open={modal} onClose={() => setModal(false)} />
      <div className='flex flex-col gap-4'>
        <BorderSection
          content={[
            {
              icon: <CircleUserRound className='size-5 text-black' />,
              title: t('personalInformation'),
              url: '/settings/personal-information',
            },
            // {
            //   icon: <Building2 className="size-5 text-black" />,
            //   title: "Company settings",
            //   url: "/settings/company",
            // },
            {
              icon: <FileSliders className='size-5 text-black' />,
              title: t('preferences'),
              url: '/settings/preferences',
            },
          ]}
        />
        <BorderSection
          content={[
            {
              icon: <SunMoon className='size-5 text-black' />,
              title: t('appearance'),
              customIcon: <DarkModeSwitch />,
              customAction: () => {},
            },
            {
              icon: <FileQuestionMark className='size-5 text-black' />,
              title: t('helpSupport'),
              url: '/settings/support',
            },
            {
              icon: <Info className='size-5 text-black' />,
              title: t('aboutApp'),
              url: '/settings/about-app',
            },
          ]}
        />
        {isOnline && (
          <BorderSection
            content={[
              {
                icon: <LogOut className='size-5 text-black' />,
                title: t('signOut'),
                customAction: () => setModal(true),
              },
            ]}
          />
        )}
      </div>
    </>
  );
};

export default Sections;
