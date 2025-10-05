import { useState, useEffect } from "react";
import {
  // Settings,
  Target,
  BarChart3,
  Zap,
  Sword,
  Shuffle,
  Egg,
  Shield,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { XPCalculatorCard } from "./components/common/xp-calculator-card";
import { CatchXPCalculator } from "./components/calculators/catch-xp-calculator";
import { EvolutionXPCalculator } from "./components/calculators/evolution-xp-calculator";
import { HatchingXPCalculator } from "./components/calculators/hatching-xp-calculator";
import { RaidXPCalculator } from "./components/calculators/raid-xp-calculator";
import { MaxBattleXPCalculator } from "./components/calculators/max-battle-xp-calculator";
import { MaxMovesXPCalculator } from "./components/calculators/max-moves-xp-calculator";
import { FriendshipXPCalculator } from "./components/calculators/friendship-xp-calculator";
import { Level50Calculator } from "./components/calculators/level-50-calculator";
import { DetailedXPCalculator } from "./components/calculators/detailed-xp-calculator";
import { ModeToggle } from "./components/mode-toggle";

// Declare global type for androidBackCallback
declare global {
  interface Window {
    androidBackCallback?: () => boolean;
  }
}

export default function HomePage() {
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(
    null
  );

  // NEW: Handle Android back button
  useEffect(() => {
    // useEffect runs after the component renders
    // This is perfect for setting up event handlers

    window.androidBackCallback = () => {
      // NEW: Define the function that Kotlin will call
      // This is attached to the global window object so Kotlin can find it
      // Arrow function captures the current value of 'selectedCalculator'

      if (selectedCalculator) {
        // If selectedCalculator has a value (not null)
        // That means we're currently viewing a calculator

        setSelectedCalculator(null);
        // Set it back to null - this makes React re-render and show the home page
        // React sees selectedCalculator is null and renders the calculator list

        return false;
        // Return false tells Kotlin: "Don't close the app, I handled the navigation"
      }

      // If we reach here, selectedCalculator is null (we're on home page)
      return true;
      // Return true tells Kotlin: "Go ahead and close the app"
    };

    // NEW: Cleanup function
    return () => {
      delete window.androidBackCallback;
      // This runs when the component unmounts (app closes or component removed)
      // We remove our function from the window object to prevent memory leaks
      // Good practice to clean up after ourselves
    };
  }, [selectedCalculator]);
  // NEW: Dependency array with [selectedCalculator]
  // This means: "Re-run this effect whenever selectedCalculator changes"
  // This ensures our callback always has the latest value of selectedCalculator
  // Without this, the function would always see the initial value (null)
  const calculators = [
    {
      id: "level-50",
      title: "To Level 50",
      subtitle: "Simple XP calculator",
      description: "Calculate XP needed to reach level 50",
      icon: Target,
      color: "from-red-600 to-red-500",
    },
    {
      id: "detailed-xp",
      title: "Detailed XP",
      subtitle: "Between levels",
      description: "Calculate XP between specific levels",
      icon: BarChart3,
      color: "from-red-500 to-rose-500",
    },
    {
      id: "catch-xp",
      title: "Catch XP",
      subtitle: "From catches",
      description: "Calculate XP from catching Pokémon",
      icon: Zap,
      color: "from-red-700 to-red-600",
    },
    {
      id: "evolution-xp",
      title: "Evolution XP",
      subtitle: "From evolutions",
      description: "Calculate XP from evolving Pokémon",
      icon: Shuffle,
      color: "from-rose-600 to-red-500",
    },
    {
      id: "hatching-xp",
      title: "Hatching XP",
      subtitle: "From eggs",
      description: "Calculate XP from hatching eggs",
      icon: Egg,
      color: "from-red-600 to-rose-600",
    },
    {
      id: "raid-xp",
      title: "Raid XP",
      subtitle: "From raids",
      description: "Calculate XP from raid battles",
      icon: Sword,
      color: "from-rose-700 to-red-600",
    },
    {
      id: "max-battle-xp",
      title: "Max Battle XP",
      subtitle: "From Max Battles",
      description: "Calculate XP from Max Battles",
      icon: Shield,
      color: "from-red-500 to-red-700",
    },
    {
      id: "max-moves-xp",
      title: "Max Moves XP",
      subtitle: "From Max Moves",
      description: "Calculate XP from Max Moves",
      icon: Zap,
      color: "from-rose-500 to-red-500",
    },
    {
      id: "friendship-xp",
      title: "Friendship XP",
      subtitle: "From friendships",
      description: "Calculate XP from friendship levels",
      icon: Heart,
      color: "from-red-700 to-rose-700",
    },
  ];

  if (selectedCalculator === "level-50") {
    return <Level50Calculator onBack={() => setSelectedCalculator(null)} />;
  }

  if (selectedCalculator === "detailed-xp") {
    return <DetailedXPCalculator onBack={() => setSelectedCalculator(null)} />;
  }

  if (selectedCalculator === "catch-xp") {
    return <CatchXPCalculator onBack={() => setSelectedCalculator(null)} />;
  }

  if (selectedCalculator === "evolution-xp") {
    return <EvolutionXPCalculator onBack={() => setSelectedCalculator(null)} />;
  }

  if (selectedCalculator === "hatching-xp") {
    return <HatchingXPCalculator onBack={() => setSelectedCalculator(null)} />;
  }

  if (selectedCalculator === "raid-xp") {
    return <RaidXPCalculator onBack={() => setSelectedCalculator(null)} />;
  }

  if (selectedCalculator === "max-battle-xp") {
    return <MaxBattleXPCalculator onBack={() => setSelectedCalculator(null)} />;
  }

  if (selectedCalculator === "max-moves-xp") {
    return <MaxMovesXPCalculator onBack={() => setSelectedCalculator(null)} />;
  }

  if (selectedCalculator === "friendship-xp") {
    return (
      <FriendshipXPCalculator onBack={() => setSelectedCalculator(null)} />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-6 pb-4">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
            XP Calculators
          </h1>
          <p className="text-sm text-muted-foreground mt-1">App Home Screen</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="glass-card glass-card-hover rounded-full w-10 h-10"
        >
          <ModeToggle />
          {/* <Settings className="w-5 h-5 text-primary" /> */}
        </Button>
      </header>

      {/* Calculator Cards */}
      <main className="px-6 space-y-4 pb-8">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          {calculators.map((calculator) => (
            <XPCalculatorCard
              key={calculator.id}
              {...calculator}
              isSelected={selectedCalculator === calculator.id}
              onClick={() => setSelectedCalculator(calculator.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
