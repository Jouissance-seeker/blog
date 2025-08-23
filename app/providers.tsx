"use client";

import { ProgressProvider } from "@bprogress/next/app";
import { Toaster } from "@/uis/sonner";
import { MDXProvider } from "@mdx-js/react";
import { Suspense, useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [progressColor, setProgressColor] = useState("oklch(0.205 0 0)");

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.body.classList.contains("dark");
      setProgressColor(isDark ? "oklch(0.922 0 0)" : "oklch(0.205 0 0)");
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ProgressProvider
      height="4px"
      color={progressColor}
      options={{ showSpinner: false }}
      shallowRouting
    >
      <MDXProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            className: "!font-inherit",
          }}
        />
        <Suspense>{children}</Suspense>
      </MDXProvider>
    </ProgressProvider>
  );
}
