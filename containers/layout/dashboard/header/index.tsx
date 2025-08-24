"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { usePathname } from "next/navigation";
import { Home } from "@/components/home";
import { ModalPost } from "../../../routes/(dashboard)/dashboard/modal-post";

export const Header = () => {
  const pathname = usePathname();

  if (pathname !== "/dashboard") return;

  return (
    <header className="flex flex-col gap-4 py-4 sticky top-0 border-b z-10 bg-background">
      <div className="flex justify-between items-center">
        <ModalPost mode="add" />
        <div className="flex gap-3">
          <ThemeSwitcher />
          <Home />
        </div>
      </div>
    </header>
  );
};
