'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/uis/avatar';
import { ThemeSwitcher } from '../../../../components/theme-switcher';
import Link from 'next/link';
import { Home } from '@/components/home';

export const Header = () => {
  return (
    <header className="flex flex-col gap-4 border-b py-2 mt-4 px-3 sticky top-4 bg-background border rounded-xl z-20">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="flex gap-2 items-center">
            <Link href="/">
              <Avatar className="size-13 border">
                <AvatarImage src="/images/logo.jpg" className="dark:invert" />
                <AvatarFallback>HS</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <p className="font-bold">حمید شاهسونی</p>
              <p className="text-sm text-muted-foreground">پژوهشگر روانکاوی</p>
            </div>
          </div>
        </div>
        <div className="gap-2 flex items-center">
          <ThemeSwitcher />
          <Home />
        </div>
      </div>
    </header>
  );
};
