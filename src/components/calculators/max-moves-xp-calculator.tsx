"use client"

import { useState } from "react"
import { ArrowLeft, Zap, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LuckyEggCard } from "@/components/common/lucky-egg-card"

interface MaxMovesInputs {
  level_1_moves: number
  level_2_moves: number
  level_max_moves: number
  lucky_egg: boolean
}

interface MaxMovesXP {
  level_1: number
  level_2: number
  level_max: number
}

const maxMovesXP: MaxMovesXP = {
  level_1: 4000,
  level_2: 6000,
  level_max: 8000,
}

interface MaxMovesXPCalculatorProps {
  onBack: () => void
}

export function MaxMovesXPCalculator({ onBack }: MaxMovesXPCalculatorProps) {
  const [inputs, setInputs] = useState<MaxMovesInputs>({
    level_1_moves: 0,
    level_2_moves: 0,
    level_max_moves: 0,
    lucky_egg: false,
  })

  const calculateTotalXP = (): number => {
    let totalXP = 0
    totalXP += inputs.level_1_moves * maxMovesXP.level_1
    totalXP += inputs.level_2_moves * maxMovesXP.level_2
    totalXP += inputs.level_max_moves * maxMovesXP.level_max
    
    // Double XP if lucky egg is active
    if (inputs.lucky_egg) {
      totalXP *= 2
    }
    
    return totalXP
  }

  const updateInput = (field: keyof MaxMovesInputs, value: number | boolean) => {
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
              Max Moves XP Calculator
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Calculate XP from Max Moves</p>
          </div>
        </div>
        <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
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
              Max Moves Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="level_1_moves">Level 1 Moves</Label>
                <Input
                  id="level_1_moves"
                  type="number"
                  min="0"
                  value={inputs.level_1_moves}
                  onChange={(e) => updateInput("level_1_moves", Number.parseInt(e.target.value) || 0)}
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">+{maxMovesXP.level_1.toLocaleString()} XP each</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="level_2_moves">Level 2 Moves</Label>
                <Input
                  id="level_2_moves"
                  type="number"
                  min="0"
                  value={inputs.level_2_moves}
                  onChange={(e) => updateInput("level_2_moves", Number.parseInt(e.target.value) || 0)}
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">+{maxMovesXP.level_2.toLocaleString()} XP each</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="level_max_moves">Level Max Moves</Label>
                <Input
                  id="level_max_moves"
                  type="number"
                  min="0"
                  value={inputs.level_max_moves}
                  onChange={(e) => updateInput("level_max_moves", Number.parseInt(e.target.value) || 0)}
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">+{maxMovesXP.level_max.toLocaleString()} XP each</p>
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
