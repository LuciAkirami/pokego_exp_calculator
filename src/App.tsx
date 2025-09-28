"use client";

import { ThemeProvider } from "./components/theme-provider";
import "./App.css"
import HomePage from "./HomePage";

export default function App() {




  return (
    // <ThemeProvider>
    //   <div className="min-h-screen bg-background">
    //     {/* Header */}
    //     <header className="flex items-center justify-between p-6 pb-4">
    //       <div>
    //         <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
    //           XP Calculators
    //         </h1>
    //         <p className="text-sm text-muted-foreground mt-1">
    //           App Home Screen
    //         </p>
    //       </div>
    //       <Button
    //         variant="ghost"
    //         size="icon"
    //         // className="glass-card glass-card-hover rounded-full w-10 h-10"
    //       >
    //         {/* <Settings className="w-5 h-5 text-primary" /> */}
    //         <ModeToggle />
    //       </Button>
    //     </header>

    //     {/* Calculator Cards */}
    //     <main className="px-6 space-y-4 pb-8">
    //       {calculators.map((calculator) => (
    //         <XPCalculatorCard
    //           key={calculator.id}
    //           {...calculator}
    //           isSelected={selectedCalculator === calculator.id}
    //           onClick={() => setSelectedCalculator(calculator.id)}
    //         />
    //       ))}
    //     </main>

    //   </div>
    // </ThemeProvider>
    <ThemeProvider>
    <HomePage />
    </ThemeProvider>
  );
}
