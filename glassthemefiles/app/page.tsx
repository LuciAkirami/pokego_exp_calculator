"use client"

import { useState } from "react"
import { Settings, Target, BarChart3, Zap, Sword } from "lucide-react"
import { Button } from "@/components/ui/button"
import { XPCalculatorCard } from "@/components/xp-calculator-card"

export default function HomePage() {
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null)

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
      id: "raid-xp",
      title: "Raid XP",
      subtitle: "From raids",
      description: "Calculate XP from raid battles",
      icon: Sword,
      color: "from-rose-600 to-red-500",
    },
  ]

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
        <Button variant="ghost" size="icon" className="glass-card glass-card-hover rounded-full w-10 h-10">
          <Settings className="w-5 h-5 text-primary" />
        </Button>
      </header>

      {/* Calculator Cards */}
      <main className="px-6 space-y-4 pb-8">
        {calculators.map((calculator) => (
          <XPCalculatorCard
            key={calculator.id}
            {...calculator}
            isSelected={selectedCalculator === calculator.id}
            onClick={() => setSelectedCalculator(calculator.id)}
          />
        ))}
      </main>

      {/* Bottom Navigation Indicator */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="glass-card rounded-full px-4 py-2">
          <div className="w-8 h-1 bg-primary/60 rounded-full" />
        </div>
      </div>
    </div>
  )
}
