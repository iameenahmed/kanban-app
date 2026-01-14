"use client";

import { useTheme } from "next-themes";

import { MoonStar, Sun } from "lucide-react";
import { Switch } from "../ui/switch";

export const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <div className="text-medium-grey bg-light-grey hover:bg-light-grey dark:bg-very-dark-grey mx-4 flex h-12 items-center justify-center gap-4 rounded-md">
      <Sun className="size-5 cursor-pointer" />
      <Switch
        id="toggle-theme"
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label="Toggle dark mode"
        className="bg-purple cursor-pointer"
      />
      <MoonStar className="size-5 cursor-pointer" />
    </div>
  );
};
