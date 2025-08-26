'use client';

import { Toaster } from '@/uis/sonner';
import { PropsWithChildren, Suspense } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export function Providers(props: PropsWithChildren) {
  return (
    <NuqsAdapter>
      <Toaster
        position="top-center"
        toastOptions={{
          className: '!font-inherit',
        }}
      />
      <Suspense>{props.children}</Suspense>
    </NuqsAdapter>
  );
}
