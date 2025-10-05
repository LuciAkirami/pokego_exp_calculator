"use client";

import { ThemeProvider } from "./components/theme-provider";
import "./App.css";
import HomePage from "./HomePage";

export default function App() {
  return (
    <ThemeProvider>
      <div className="mx-auto bg-background min-h-screen relative overflow-hidden w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4 sm:px-6">
        <HomePage />
      </div>
    </ThemeProvider>
  );
}
