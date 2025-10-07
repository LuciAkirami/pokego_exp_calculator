"use client"

import { useState } from "react"
import { ArrowLeft, Sword, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LuckyEggCard } from "@/components/common/lucky-egg-card"
import { XP_MULTIPLIERS } from "@/types/xp-constants"

interface RaidInputs {
  one_star_raids: string
  three_star_raids: string
  five_star_raids: string
  mega_raids: string
  shadow_raids: string
  lucky_egg: boolean
}

interface RaidXPCalculatorProps {
  onBack: () => void
}

export function RaidXPCalculator({ onBack }: RaidXPCalculatorProps) {
  const [inputs, setInputs] = useState<RaidInputs>({
    one_star_raids: "",
    three_star_raids: "",
    five_star_raids: "",
    mega_raids: "",
    shadow_raids: "",
    lucky_egg: false,
  })

  const calculateTotalXP = (): number => {
    let totalXP = 0
    const oneStarRaids = Number.parseInt(inputs.one_star_raids) || 0
    const threeStarRaids = Number.parseInt(inputs.three_star_raids) || 0
    const fiveStarRaids = Number.parseInt(inputs.five_star_raids) || 0
    const megaRaids = Number.parseInt(inputs.mega_raids) || 0
    const shadowRaids = Number.parseInt(inputs.shadow_raids) || 0
    
    totalXP += oneStarRaids * XP_MULTIPLIERS.raids.star_1
    totalXP += threeStarRaids * XP_MULTIPLIERS.raids.star_3
    totalXP += fiveStarRaids * XP_MULTIPLIERS.raids.star_5
    totalXP += megaRaids * XP_MULTIPLIERS.raids.mega
    totalXP += shadowRaids * XP_MULTIPLIERS.raids.shadow
    
    // Double XP if lucky egg is active
    if (inputs.lucky_egg) {
      totalXP *= 2
    }
    
    return totalXP
  }

  const handleNumberInput = (field: keyof Pick<RaidInputs, 'one_star_raids' | 'three_star_raids' | 'five_star_raids' | 'mega_raids' | 'shadow_raids'>, value: string) => {
    // Allow empty string or valid numbers only
    if (value === "" || /^\d+$/.test(value)) {
      const int_value = parseInt(value) || 0
      // Limit to 100000
      if (int_value > 100000) {
        value = "100000"
      }
      updateInput(field, value)
    }
  }

  const updateInput = (field: keyof RaidInputs, value: string | boolean) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const totalXP = calculateTotalXP()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="glass-card glass-card-hover rounded-full w-10 h-10"
          >
            <ArrowLeft className="w-5 h-5 text-primary" />
          </Button>
          <div>
            <h1 className="text-sm md:text-lg lg:text-xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              Raid XP Calculator
            </h1>
            <p className="text-xs md:text-sm lg:text-base text-muted-foreground mt-1">
              {/* Apply line break only on mobile */}
              Calculate XP from <br className="md:hidden" /> Raid Battles
            </p>
          </div>
        </div>
        <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2">
          <Sword className="w-4 h-4 text-primary" />
          <div className="flex items-center gap-1">
            <span className="text-xs md:text-sm lg:text-base font-medium text-primary">
              {/* If totalXP is greater than 1000000 then show it as M */}
              {totalXP > 1000000
                ? (totalXP / 1000000).toFixed(1) + "M"
                : totalXP.toLocaleString()}
            </span>
            <span className="text-xs md:text-sm lg:text-base font-medium text-primary">
              XP
            </span>
          </div>
        </div>
      </header>

      {/* Calculator Content */}
      <main className="px-6 space-y-6 pb-8">
        {/* Lucky Egg Toggle */}
        <LuckyEggCard
          isActive={inputs.lucky_egg}
          onToggle={(checked) => updateInput("lucky_egg", checked)}
        />

        {/* Input Fields */}
        <Card className="glass-card glass-card-hover">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              Raid Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="one_star_raids">1-Star Raids</Label>
                <Input
                  id="one_star_raids"
                  type="text"
                  inputMode="numeric"
                  min="0"
                  value={inputs.one_star_raids}
                  onChange={(e) =>
                    handleNumberInput("one_star_raids", e.target.value)
                  }
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  +{XP_MULTIPLIERS.raids.star_1.toLocaleString()} XP each
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="three_star_raids">3-Star Raids</Label>
                <Input
                  id="three_star_raids"
                  type="text"
                  inputMode="numeric"
                  min="0"
                  value={inputs.three_star_raids}
                  onChange={(e) =>
                    handleNumberInput("three_star_raids", e.target.value)
                  }
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  +{XP_MULTIPLIERS.raids.star_3.toLocaleString()} XP each
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="five_star_raids">5-Star Raids</Label>
                <Input
                  id="five_star_raids"
                  type="text"
                  inputMode="numeric"
                  min="0"
                  value={inputs.five_star_raids}
                  onChange={(e) =>
                    handleNumberInput("five_star_raids", e.target.value)
                  }
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  +{XP_MULTIPLIERS.raids.star_5.toLocaleString()} XP each
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mega_raids">Mega Raids</Label>
                <Input
                  id="mega_raids"
                  type="text"
                  inputMode="numeric"
                  min="0"
                  value={inputs.mega_raids}
                  onChange={(e) =>
                    handleNumberInput("mega_raids", e.target.value)
                  }
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  +{XP_MULTIPLIERS.raids.mega.toLocaleString()} XP each
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shadow_raids">Shadow Raids</Label>
                <Input
                  id="shadow_raids"
                  type="text"
                  inputMode="numeric"
                  min="0"
                  value={inputs.shadow_raids}
                  onChange={(e) =>
                    handleNumberInput("shadow_raids", e.target.value)
                  }
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  +{XP_MULTIPLIERS.raids.shadow.toLocaleString()} XP each
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Card */}
        <Card className="glass-card glass-card-hover border-primary/40 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Total XP Earned
              </h3>
              <div className="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                {totalXP.toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
