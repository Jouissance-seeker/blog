'use client';

import { Toaster } from '@/uis/sonner';
import { Suspense } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <Toaster
        position="top-center"
        toastOptions={{
          className: '!font-inherit',
        }}
      />
      <Suspense>{children}</Suspense>
    </NuqsAdapter>
  );
}
