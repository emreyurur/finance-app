"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useCookies } from "react-cookie";

const useDarkMode = (defaultTheme: string = "dark") => {
  const [theme, setTheme] = useState<string>(defaultTheme);
  const [_, setCookie] = useCookies(["theme"]);

  const setAndSaveTheme = (newTheme: string | SetStateAction<string>) => {
    const resolvedTheme =
      typeof newTheme === "function"
        ? newTheme(theme)
        : newTheme;

    setTheme(resolvedTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(resolvedTheme);
    setCookie("theme", resolvedTheme);
  };

  const toggleTheme = () => {
    setAndSaveTheme(theme === "dark" ? "light" : "dark");
  };

  return { theme, toggleTheme };
};

export default useDarkMode;
