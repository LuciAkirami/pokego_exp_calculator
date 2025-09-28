"use client"

import { useState } from "react"
import { ArrowLeft, Sword, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LuckyEggCard } from "@/components/common/lucky-egg-card"

interface RaidInputs {
  one_star_raids: number
  three_star_raids: number
  five_star_raids: number
  mega_raids: number
  shadow_raids: number
  lucky_egg: boolean
}

interface RaidsXP {
  one_star: number
  three_star: number
  five_star: number
  mega: number
  shadow: number
}

const raidsXP: RaidsXP = {
  one_star: 3500,
  three_star: 5000,
  five_star: 10000,
  mega: 10000,
  shadow: 10000,
}

interface RaidXPCalculatorProps {
  onBack: () => void
}

export function RaidXPCalculator({ onBack }: RaidXPCalculatorProps) {
  const [inputs, setInputs] = useState<RaidInputs>({
    one_star_raids: 0,
    three_star_raids: 0,
    five_star_raids: 0,
    mega_raids: 0,
    shadow_raids: 0,
    lucky_egg: false,
  })

  const calculateTotalXP = (): number => {
    let totalXP = 0
    totalXP += inputs.one_star_raids * raidsXP.one_star
    totalXP += inputs.three_star_raids * raidsXP.three_star
    totalXP += inputs.five_star_raids * raidsXP.five_star
    totalXP += inputs.mega_raids * raidsXP.mega
    totalXP += inputs.shadow_raids * raidsXP.shadow
    
    // Double XP if lucky egg is active
    if (inputs.lucky_egg) {
      totalXP *= 2
    }
    
    return totalXP
  }

  const updateInput = (field: keyof RaidInputs, value: number | boolean) => {
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
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              Raid XP Calculator
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Calculate XP from raid battles</p>
          </div>
        </div>
        <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2">
          <Sword className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">{totalXP.toLocaleString()} XP</span>
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
                  type="number"
                  min="0"
                  value={inputs.one_star_raids}
                  onChange={(e) => updateInput("one_star_raids", Number.parseInt(e.target.value) || 0)}
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">+{raidsXP.one_star.toLocaleString()} XP each</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="three_star_raids">3-Star Raids</Label>
                <Input
                  id="three_star_raids"
                  type="number"
                  min="0"
                  value={inputs.three_star_raids}
                  onChange={(e) => updateInput("three_star_raids", Number.parseInt(e.target.value) || 0)}
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">+{raidsXP.three_star.toLocaleString()} XP each</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="five_star_raids">5-Star Raids</Label>
                <Input
                  id="five_star_raids"
                  type="number"
                  min="0"
                  value={inputs.five_star_raids}
                  onChange={(e) => updateInput("five_star_raids", Number.parseInt(e.target.value) || 0)}
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">+{raidsXP.five_star.toLocaleString()} XP each</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mega_raids">Mega Raids</Label>
                <Input
                  id="mega_raids"
                  type="number"
                  min="0"
                  value={inputs.mega_raids}
                  onChange={(e) => updateInput("mega_raids", Number.parseInt(e.target.value) || 0)}
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">+{raidsXP.mega.toLocaleString()} XP each</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shadow_raids">Shadow Raids</Label>
                <Input
                  id="shadow_raids"
                  type="number"
                  min="0"
                  value={inputs.shadow_raids}
                  onChange={(e) => updateInput("shadow_raids", Number.parseInt(e.target.value) || 0)}
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">+{raidsXP.shadow.toLocaleString()} XP each</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Card */}
        <Card className="glass-card glass-card-hover border-primary/40 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Total XP Earned</h3>
              <div className="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                {totalXP.toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
