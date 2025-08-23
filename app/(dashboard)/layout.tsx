import "../globals.css";
import localFont from "next/font/local";
import { Metadata } from "next";
import { Providers } from "../providers";
import { cn } from "@/utils/cn";
import { Header } from "@/containers/layout/dashboard/header";
import { redirect } from "next/navigation";

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
  title: "jouissance seeker",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout(props: DashboardLayoutProps) {
  // only run on development
  if (process.env.NODE_ENV === "production") {
    redirect("/");
  }

  return (
    <html lang="fa" dir="rtl" className="container mx-auto max-w-screen-lg">
      <body className={cn(iranYekan.className, "mx-2 sm:mx-5")}>
        <Providers>
          <Header />
          <main className="flex flex-col">{props.children}</main>
        </Providers>
      </body>
    </html>
  );
}
