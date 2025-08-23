"use client";

import { Toaster } from "@/uis/sonner";
import { MDXProvider } from "@mdx-js/react";
import { Suspense } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MDXProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "!font-inherit",
        }}
      />
      <Suspense>{children}</Suspense>
    </MDXProvider>
  );
}
