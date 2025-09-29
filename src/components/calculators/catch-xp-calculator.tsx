"use client"

import { useState } from "react"
import { ArrowLeft, Zap, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LuckyEggCard } from "@/components/common/lucky-egg-card"

interface CatchingInputs {
  normal_catches: string
  new_pokemon_catches: string
  excellent_throws: string
  curve_balls: string
  first_throws: string
  great_throws: string
  nice_throws: string
  lucky_egg: boolean
}

interface CatchingXP {
  normal: number
  new_pokemon: number
  excellent_throw: number
  curve_ball: number
  first_throw: number
  great_throw: number
  nice_throw: number
  xp_celebration: number
}

const catchingXP: CatchingXP = {
  normal: 100,
  new_pokemon: 1000,
  excellent_throw: 1000,
  curve_ball: 20,
  first_throw: 50,
  great_throw: 100,
  nice_throw: 20,
  xp_celebration: 500,
}

interface CatchXPCalculatorProps {
  onBack: () => void
}

export function CatchXPCalculator({ onBack }: CatchXPCalculatorProps) {
  const [inputs, setInputs] = useState<CatchingInputs>({
    normal_catches: "",
    new_pokemon_catches: "",
    excellent_throws: "",
    curve_balls: "",
    first_throws: "",
    great_throws: "",
    nice_throws: "",
    lucky_egg: false,
  })

  const calculateTotalXP = (): number => {
    let totalXP = 0
    const normalCatches = Number.parseInt(inputs.normal_catches) || 0
    const newPokemonCatches = Number.parseInt(inputs.new_pokemon_catches) || 0
    const excellentThrows = Number.parseInt(inputs.excellent_throws) || 0
    const curveBalls = Number.parseInt(inputs.curve_balls) || 0
    const firstThrows = Number.parseInt(inputs.first_throws) || 0
    const greatThrows = Number.parseInt(inputs.great_throws) || 0
    const niceThrows = Number.parseInt(inputs.nice_throws) || 0

    totalXP += normalCatches * catchingXP.normal
    totalXP += newPokemonCatches * catchingXP.new_pokemon
    totalXP += excellentThrows * catchingXP.excellent_throw
    totalXP += curveBalls * catchingXP.curve_ball
    totalXP += firstThrows * catchingXP.first_throw
    totalXP += greatThrows * catchingXP.great_throw
    totalXP += niceThrows * catchingXP.nice_throw

    // Double XP if lucky egg is active
    if (inputs.lucky_egg) {
      totalXP *= 2
    }

    return totalXP
  }

  const updateInput = (field: keyof CatchingInputs, value: number | boolean) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNumberInput = (field: keyof Pick<CatchingInputs, 'normal_catches' | 'new_pokemon_catches' | 'excellent_throws' | 'curve_balls' | 'first_throws' | 'great_throws' | 'nice_throws'>, value: string) => {
    // Allow empty string or valid numbers only
    if (value === "" || /^\d+$/.test(value)) {
      updateInput(field, Number.parseInt(value) || 0)
    }
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
              Catch XP Calculator
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Calculate XP from catching Pokémon</p>
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
        <div className="grid gap-4">
          <Card className="glass-card glass-card-hover">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                Catching Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="normal_catches">Normal Catches</Label>
                  <Input
                    id="normal_catches"
                    type="text"
                    inputMode="numeric"
                    min="0"
                    value={inputs.normal_catches}
                    onChange={(e) => handleNumberInput("normal_catches", e.target.value)}
                    className="glass-card border-white/20"
                    placeholder="0"
                  />
                  <p className="text-xs text-muted-foreground">+{catchingXP.normal} XP each</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new_pokemon_catches">New Pokémon Catches</Label>
                  <Input
                    id="new_pokemon_catches"
                    type="text"
                    inputMode="numeric"
                    min="0"
                    value={inputs.new_pokemon_catches}
                    onChange={(e) => handleNumberInput("new_pokemon_catches", e.target.value)}
                    className="glass-card border-white/20"
                    placeholder="0"
                  />
                  <p className="text-xs text-muted-foreground">+{catchingXP.new_pokemon} XP each</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excellent_throws">Excellent Throws</Label>
                  <Input
                    id="excellent_throws"
                    type="text"
                    inputMode="numeric"
                    min="0"
                    value={inputs.excellent_throws}
                    onChange={(e) => handleNumberInput("excellent_throws", e.target.value)}
                    className="glass-card border-white/20"
                    placeholder="0"
                  />
                  <p className="text-xs text-muted-foreground">+{catchingXP.excellent_throw} XP each</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="great_throws">Great Throws</Label>
                  <Input
                    id="great_throws"
                    type="text"
                    inputMode="numeric"
                    min="0"
                    value={inputs.great_throws}
                    onChange={(e) => handleNumberInput("great_throws", e.target.value)}
                    className="glass-card border-white/20"
                    placeholder="0"
                  />
                  <p className="text-xs text-muted-foreground">+{catchingXP.great_throw} XP each</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nice_throws">Nice Throws</Label>
                  <Input
                    id="nice_throws"
                    type="text"
                    inputMode="numeric"
                    min="0"
                    value={inputs.nice_throws}
                    onChange={(e) => handleNumberInput("nice_throws", e.target.value)}
                    className="glass-card border-white/20"
                    placeholder="0"
                  />
                  <p className="text-xs text-muted-foreground">+{catchingXP.nice_throw} XP each</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="curve_balls">Curve Balls</Label>
                  <Input
                    id="curve_balls"
                    type="text"
                    inputMode="numeric"
                    min="0"
                    value={inputs.curve_balls}
                    onChange={(e) => handleNumberInput("curve_balls", e.target.value)}
                    className="glass-card border-white/20"
                    placeholder="0"
                  />
                  <p className="text-xs text-muted-foreground">+{catchingXP.curve_ball} XP each</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="first_throws">First Throws</Label>
                  <Input
                    id="first_throws"
                    type="text"
                    inputMode="numeric"
                    min="0"
                    value={inputs.first_throws}
                    onChange={(e) => handleNumberInput("first_throws", e.target.value)}
                    className="glass-card border-white/20"
                    placeholder="0"
                  />
                  <p className="text-xs text-muted-foreground">+{catchingXP.first_throw} XP each</p>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Card */}
        <Card className="glass-card glass-card-hover border-primary/40 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Total XP Earned</h3>
              <div className="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                {totalXP.toLocaleString()}
              </div>
              {inputs.lucky_egg && <p className="text-sm text-primary font-medium">Lucky Egg Active - XP Doubled!</p>}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
