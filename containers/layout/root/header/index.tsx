"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/uis/avatar";
import { Home } from "../../../../components/home";
import { Post } from "@/types/post";
import { Search } from "./search";
import { Tabs } from "../../../../components/tabs";
import { ThemeSwitcher } from "../../../../components/theme-switcher";

interface HeaderProps {
  postsData: Post[];
}

export const Header = (props: HeaderProps) => {
  return (
    <header className="flex flex-col gap-4 border-b py-4 sticky top-0 bg-background z-20">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Avatar className="size-13 border">
            <AvatarImage
              src="/images/logo.jpg"
              className="dark:invert"
            />
            <AvatarFallback>HS</AvatarFallback>
          </Avatar>
          <div className="flex-col flex">
            <p className="font-bold">حمید شاهسونی</p>
            <p className="text-sm text-muted-foreground">
              پژوهشگر روانکاوی لکانی
            </p>
          </div>
        </div>
        <Tabs />
        <div className="gap-2 flex items-center">
          <ThemeSwitcher />
          <Search postsData={props.postsData} />
          <Home />
        </div>
      </div>
    </header>
  );
};
