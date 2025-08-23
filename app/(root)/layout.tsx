import "../globals.css";
import localFont from "next/font/local";
import { Metadata } from "next";
import { Providers } from "../providers";
import { Header } from "@/containers/layout/root/header";
import { cn } from "@/utils/cn";
import { getPosts } from "@/services/get-posts";
import { ReactNode } from "react";

const iranYekan = localFont({
  src: [
    {
      path: "../../public/fonts/iran-yekan/thin.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/iran-yekan/light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/iran-yekan/regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/iran-yekan/medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/iran-yekan/bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/iran-yekan/extra-bold.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/iran-yekan/black.woff",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/iran-yekan/extra-black.woff",
      weight: "950",
      style: "normal",
    },
  ],
  variable: "--font-iran-yekan",
  display: "swap",
});

export const metadata: Metadata = {
  title: "روانکاوی لکانی",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout(props: RootLayoutProps) {
  const postsData = await getPosts({ type: "all" });

  return (
    <html lang="fa" dir="rtl" className="container mx-auto max-w-screen-lg">
      <body className={cn(iranYekan.className, "mx-3 sm:mx-5")}>
        <Providers>
          <Header postsData={postsData} />
          <main className="flex flex-col">{props.children}</main>
        </Providers>
      </body>
    </html>
  );
}
