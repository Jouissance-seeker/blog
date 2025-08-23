"use client";

import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setThemeState] = useState<"light" | "dark">("light");

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  };

  const setCookie = (name: string, value: string, days = 365) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
  };

  const changeTheme = (newTheme: "light" | "dark") => {
    setThemeState(newTheme);
    setCookie("theme", newTheme);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(newTheme);
  };

  useEffect(() => {
    const savedTheme = getCookie("theme") as "light" | "dark" | null;
    if (savedTheme) {
      changeTheme(savedTheme);
    } else {
      changeTheme("light");
    }
  }, []);

  return { theme, setTheme: changeTheme };
}
