/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/theme/theme-provider";
import PrimaryColorProvider from "@/components/theme/primary-color-provider";
import { Toaster } from "@/components/ui/sonner";
import { Spinner } from "@/components/ui/spinner";
import { ServiceWorkerRegister } from "@/components/layout/service-worker";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <React.Suspense fallback={<Spinner className="size-6" />}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </React.Suspense>

      <ServiceWorkerRegister />
      <PrimaryColorProvider />
      <Toaster richColors position="top-center" />
    </ThemeProvider>
  );
}
