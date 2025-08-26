import './globals.css';
import localFont from 'next/font/local';
import { Metadata } from 'next';
import { Providers } from './providers';
import { Header } from '@/containers/layout/header';
import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

const iranYekan = localFont({
  src: [
    {
      path: '../public/fonts/iran-yekan/thin.woff',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/iran-yekan/light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/iran-yekan/regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/iran-yekan/medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/iran-yekan/bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/iran-yekan/extra-bold.woff',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/iran-yekan/black.woff',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/fonts/iran-yekan/extra-black.woff',
      weight: '950',
      style: 'normal',
    },
  ],
  variable: '--font-iran-yekan',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'jouissance seeker',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout(props: RootLayoutProps) {
  return (
    <html lang="fa" dir="rtl" className="min-h-dvh relative">
      <div className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat filter blur-sm bg-[url('/images/bg.webp')]" />
      <div className="absolute inset-0 -z-10 bg-background/80 backdrop-blur-sm" />
      <body
        className={cn(
          iranYekan.className,
          'px-3 sm:px-5 container mx-auto h-full',
        )}
      >
        <Providers>
          <Header />
          <main className="flex flex-col h-full">{props.children}</main>
        </Providers>
      </body>
    </html>
  );
}
