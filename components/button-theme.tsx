"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Botón de ShadCN
import { Sun, Moon } from "lucide-react"; // Iconos para los temas

export default function ToggleThemeButton() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Al cargar, verifica el tema almacenado en localStorage o usa el tema del sistema
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark";
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    const initialTheme = storedTheme || systemTheme;
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  // Cambiar tema y actualizar localStorage
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme}>
      {theme === "light" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
