"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";


export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-full glass flex items-center justify-center"></div>;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 rounded-full glass flex items-center justify-center relative overflow-hidden text-gray-800 text-white"
      aria-label="Toggle Theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun
          className={`absolute transition-all duration-300 ${
            theme === "dark" ? "opacity-0 scale-50 rotate-90" : "opacity-100 scale-100 rotate-0 text-amber-500"
          }`}
          size={20}
        />
        <Moon
          className={`absolute transition-all duration-300 ${
            theme === "dark" ? "opacity-100 scale-100 rotate-0 text-blue-400" : "opacity-0 scale-50 -rotate-90"
          }`}
          size={20}
        />
      </div>
    </button>
  );
}
