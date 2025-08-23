"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { Tabs } from "../../../../components/tabs";
import { usePathname } from "next/navigation";
import { Home } from "@/components/home";
import { ModalAddPost } from "./modal-add-post";

export const Header = () => {
  const pathname = usePathname();

  if (pathname !== "/dashboard") return;

  return (
    <header className="flex flex-col gap-4 py-4 sticky top-0 border-b z-10 bg-background">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Home />
          <ThemeSwitcher />
        </div>
        <Tabs />
        <ModalAddPost />
      </div>
    </header>
  );
};
