"use client"

import { useState } from "react"
import { ArrowLeft, BarChart3, Target, Clock, Zap, Calculator, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// XP requirements for each level (cumulative)
const XP_REQUIREMENTS: Record<number, number> = {
  1: 0,
  2: 1000,
  3: 3000,
  4: 6000,
  5: 10000,
  6: 15000,
  7: 21000,
  8: 28000,
  9: 36000,
  10: 45000,
  11: 55000,
  12: 65000,
  13: 75000,
  14: 85000,
  15: 100000,
  16: 120000,
  17: 140000,
  18: 160000,
  19: 185000,
  20: 210000,
  21: 260000,
  22: 335000,
  23: 435000,
  24: 560000,
  25: 710000,
  26: 900000,
  27: 1100000,
  28: 1350000,
  29: 1650000,
  30: 2000000,
  31: 2500000,
  32: 3000000,
  33: 3750000,
  34: 4750000,
  35: 6000000,
  36: 7500000,
  37: 9500000,
  38: 12000000,
  39: 15000000,
  40: 20000000,
  41: 26000000,
  42: 33500000,
  43: 42500000,
  44: 53500000,
  45: 66500000,
  46: 82000000,
  47: 100000000,
  48: 121000000,
  49: 146000000,
  50: 176000000,
}

// XP multipliers for all activities
const XP_MULTIPLIERS = {
  catching: {
    normal: 100,
    new_pokemon: 1000,
    excellent_throw: 1000,
    curve_ball: 20,
    first_throw: 50,
    great_throw: 100,
    nice_throw: 20,
    xp_celebration: 500,
  },
  evolution: { normal: 1000, new_pokemon: 1000 },
  hatching: { km_2: 500, km_5: 1000, km_7: 1500, km_10: 2000, km_12: 4000 },
  raids: { star_1: 3000, star_3: 3000, star_5: 10000, mega: 10000, shadow: 1000 },
  maxBattle: { star_1: 300, star_2: 400, star_3: 500, star_4: 600, star_5: 700, star_6: 800, in_person_bonus: 100 },
  maxMoves: { level_1: 10, level_2: 25, max_moves: 100 },
  friendship: { good_friends: 3000, great_friends: 10000, ultra_friends: 50000, best_friends: 100000 },
}

interface DetailedXPInputs {
  // Current progress
  currentLevel: number
  currentXP: number
  targetLevel: number

  // Catching
  normal_catches: number
  new_pokemon_catches: number
  excellent_throws: number
  curve_balls: number
  first_throws: number
  great_throws: number
  nice_throws: number
  xp_celebration: number

  // Evolution
  normal_evolutions: number
  new_pokemon_evolutions: number

  // Hatching
  km_2_eggs: number
  km_5_eggs: number
  km_7_eggs: number
  km_10_eggs: number
  km_12_eggs: number

  // Raids
  star_1_raids: number
  star_3_raids: number
  star_5_raids: number
  mega_raids: number
  shadow_raids: number

  // Max Battles
  star_1_battles: number
  star_2_battles: number
  star_3_battles: number
  star_4_battles: number
  star_5_battles: number
  star_6_battles: number
  in_person_bonus: number

  // Max Moves
  level_1_moves: number
  level_2_moves: number
  max_moves: number

  // Friendship
  good_friends: number
  great_friends: number
  ultra_friends: number
  best_friends: number

  // Options
  lucky_egg: boolean
  target_type: "date" | "days"
  target_date: string
  target_days: number
}

interface DetailedXPCalculatorProps {
  onBack: () => void
}

export function DetailedXPCalculator({ onBack }: DetailedXPCalculatorProps) {
  const [inputs, setInputs] = useState<DetailedXPInputs>({
    currentLevel: 1,
    currentXP: 0,
    targetLevel: 50,
    normal_catches: 0,
    new_pokemon_catches: 0,
    excellent_throws: 0,
    curve_balls: 0,
    first_throws: 0,
    great_throws: 0,
    nice_throws: 0,
    xp_celebration: 0,
    normal_evolutions: 0,
    new_pokemon_evolutions: 0,
    km_2_eggs: 0,
    km_5_eggs: 0,
    km_7_eggs: 0,
    km_10_eggs: 0,
    km_12_eggs: 0,
    star_1_raids: 0,
    star_3_raids: 0,
    star_5_raids: 0,
    mega_raids: 0,
    shadow_raids: 0,
    star_1_battles: 0,
    star_2_battles: 0,
    star_3_battles: 0,
    star_4_battles: 0,
    star_5_battles: 0,
    star_6_battles: 0,
    in_person_bonus: 0,
    level_1_moves: 0,
    level_2_moves: 0,
    max_moves: 0,
    good_friends: 0,
    great_friends: 0,
    ultra_friends: 0,
    best_friends: 0,
    lucky_egg: false,
    target_type: "date",
    target_date: "2025-12-31",
    target_days: 30,
  })

  const calculateCategoryXP = () => {
    const catching =
      inputs.normal_catches * XP_MULTIPLIERS.catching.normal +
      inputs.new_pokemon_catches * XP_MULTIPLIERS.catching.new_pokemon +
      inputs.excellent_throws * XP_MULTIPLIERS.catching.excellent_throw +
      inputs.curve_balls * XP_MULTIPLIERS.catching.curve_ball +
      inputs.first_throws * XP_MULTIPLIERS.catching.first_throw +
      inputs.great_throws * XP_MULTIPLIERS.catching.great_throw +
      inputs.nice_throws * XP_MULTIPLIERS.catching.nice_throw +
      inputs.xp_celebration * XP_MULTIPLIERS.catching.xp_celebration

    const evolution =
      inputs.normal_evolutions * XP_MULTIPLIERS.evolution.normal +
      inputs.new_pokemon_evolutions * XP_MULTIPLIERS.evolution.new_pokemon

    const hatching =
      inputs.km_2_eggs * XP_MULTIPLIERS.hatching.km_2 +
      inputs.km_5_eggs * XP_MULTIPLIERS.hatching.km_5 +
      inputs.km_7_eggs * XP_MULTIPLIERS.hatching.km_7 +
      inputs.km_10_eggs * XP_MULTIPLIERS.hatching.km_10 +
      inputs.km_12_eggs * XP_MULTIPLIERS.hatching.km_12

    const raids =
      inputs.star_1_raids * XP_MULTIPLIERS.raids.star_1 +
      inputs.star_3_raids * XP_MULTIPLIERS.raids.star_3 +
      inputs.star_5_raids * XP_MULTIPLIERS.raids.star_5 +
      inputs.mega_raids * XP_MULTIPLIERS.raids.mega +
      inputs.shadow_raids * XP_MULTIPLIERS.raids.shadow

    const maxBattle =
      inputs.star_1_battles * XP_MULTIPLIERS.maxBattle.star_1 +
      inputs.star_2_battles * XP_MULTIPLIERS.maxBattle.star_2 +
      inputs.star_3_battles * XP_MULTIPLIERS.maxBattle.star_3 +
      inputs.star_4_battles * XP_MULTIPLIERS.maxBattle.star_4 +
      inputs.star_5_battles * XP_MULTIPLIERS.maxBattle.star_5 +
      inputs.star_6_battles * XP_MULTIPLIERS.maxBattle.star_6 +
      inputs.in_person_bonus * XP_MULTIPLIERS.maxBattle.in_person_bonus

    const maxMoves =
      inputs.level_1_moves * XP_MULTIPLIERS.maxMoves.level_1 +
      inputs.level_2_moves * XP_MULTIPLIERS.maxMoves.level_2 +
      inputs.max_moves * XP_MULTIPLIERS.maxMoves.max_moves

    const friendship =
      inputs.good_friends * XP_MULTIPLIERS.friendship.good_friends +
      inputs.great_friends * XP_MULTIPLIERS.friendship.great_friends +
      inputs.ultra_friends * XP_MULTIPLIERS.friendship.ultra_friends +
      inputs.best_friends * XP_MULTIPLIERS.friendship.best_friends

    // Apply lucky egg to daily activities (not friendship)
    const dailyXP = catching + evolution + hatching + raids + maxBattle + maxMoves
    const adjustedDailyXP = inputs.lucky_egg ? dailyXP * 2 : dailyXP

    return {
      catching: inputs.lucky_egg ? catching * 2 : catching,
      evolution: inputs.lucky_egg ? evolution * 2 : evolution,
      hatching: inputs.lucky_egg ? hatching * 2 : hatching,
      raids: inputs.lucky_egg ? raids * 2 : raids,
      maxBattle: inputs.lucky_egg ? maxBattle * 2 : maxBattle,
      maxMoves: inputs.lucky_egg ? maxMoves * 2 : maxMoves,
      friendship, // Friendship XP is not affected by lucky egg
      total: adjustedDailyXP + friendship,
      dailyXP: adjustedDailyXP,
    }
  }

  const calculateLevelProgress = () => {
    const categoryXP = calculateCategoryXP()
    const currentTotalXP = XP_REQUIREMENTS[inputs.currentLevel] + inputs.currentXP
    const targetTotalXP = XP_REQUIREMENTS[inputs.targetLevel] || XP_REQUIREMENTS[50]
    const newTotalXP = currentTotalXP + categoryXP.total

    const xpNeeded = Math.max(0, targetTotalXP - currentTotalXP)
    const xpRemaining = Math.max(0, targetTotalXP - newTotalXP)
    const targetReached = newTotalXP >= targetTotalXP

    // Find what level they'll reach
    let reachedLevel = inputs.currentLevel
    for (let level = inputs.currentLevel + 1; level <= 50; level++) {
      if (newTotalXP >= XP_REQUIREMENTS[level]) {
        reachedLevel = level
      } else {
        break
      }
    }

    return {
      currentTotalXP,
      newTotalXP,
      xpNeeded,
      xpRemaining,
      targetReached,
      reachedLevel,
      categoryXP,
    }
  }

  const calculateDailyRequirements = () => {
    const progress = calculateLevelProgress()
    if (progress.targetReached) return { daysNeeded: 0, dailyXPNeeded: 0 }

    let days = 0
    if (inputs.target_type === "date") {
      const targetDate = new Date(inputs.target_date)
      const today = new Date()
      const timeDiff = targetDate.getTime() - today.getTime()
      days = Math.ceil(timeDiff / (1000 * 3600 * 24))
    } else {
      days = inputs.target_days
    }

    if (days <= 0) return { daysNeeded: 0, dailyXPNeeded: 0 }

    const dailyXPNeeded = Math.ceil(progress.xpRemaining / days)
    return { daysNeeded: days, dailyXPNeeded }
  }

  const updateInput = (field: keyof DetailedXPInputs, value: number | boolean | string) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
  }

  const progress = calculateLevelProgress()
  const dailyReq = calculateDailyRequirements()

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
              Detailed XP Calculator
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Comprehensive XP calculation between levels
            </p>
          </div>
        </div>
        <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            {progress.categoryXP.total.toLocaleString()} XP
          </span>
        </div>
      </header>

      <main className="px-6 space-y-6 pb-8">
        {/* Level Progress Section */}
        <Card className="glass-card glass-card-hover">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Level Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentLevel" className="text-sm font-medium">
                  Current Level
                </Label>
                <Input
                  id="currentLevel"
                  type="number"
                  min="1"
                  max="50"
                  value={inputs.currentLevel}
                  onChange={(e) =>
                    updateInput("currentLevel", Number(e.target.value))
                  }
                  className="glass-card border-white/20 h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentXP" className="text-sm font-medium">
                  Current XP in Level
                </Label>
                <Input
                  id="currentXP"
                  type="number"
                  min="0"
                  value={inputs.currentXP}
                  onChange={(e) =>
                    updateInput("currentXP", Number(e.target.value))
                  }
                  className="glass-card border-white/20 h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetLevel" className="text-sm font-medium">
                  Target Level
                </Label>
                <Input
                  id="targetLevel"
                  type="number"
                  min="1"
                  max="50"
                  value={inputs.targetLevel}
                  onChange={(e) =>
                    updateInput("targetLevel", Number(e.target.value))
                  }
                  className="glass-card border-white/20 h-10"
                />
              </div>
            </div>

            {/* Target Date/Days Toggle */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Target Timeline</Label>
                <div className="flex items-center gap-2">
                  <span
                    className={
                      inputs.target_type === "date"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }
                  >
                    Date
                  </span>
                  <Switch
                    checked={inputs.target_type === "days"}
                    onCheckedChange={(checked) =>
                      updateInput("target_type", checked ? "days" : "date")
                    }
                  />
                  <span
                    className={
                      inputs.target_type === "days"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }
                  >
                    Days
                  </span>
                </div>
              </div>

              {inputs.target_type === "date" ? (
                <Input
                  type="date"
                  value={inputs.target_date}
                  onChange={(e) => updateInput("target_date", e.target.value)}
                  className="glass-card border-white/20"
                />
              ) : (
                <Input
                  type="number"
                  min="1"
                  value={inputs.target_days}
                  onChange={(e) =>
                    updateInput("target_days", Number(e.target.value))
                  }
                  className="glass-card border-white/20"
                  placeholder="Number of days"
                />
              )}
            </div>

            {/* Lucky Egg Toggle */}
            <div className="flex items-center justify-between p-4 glass-card rounded-lg">
              <div className="space-y-1">
                <Label className="text-base font-semibold">
                  Lucky Egg Active
                </Label>
                <p className="text-sm text-muted-foreground">
                  Double XP for daily activities (not friendship)
                </p>
              </div>
              <Switch
                checked={inputs.lucky_egg}
                onCheckedChange={(checked) => updateInput("lucky_egg", checked)}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          </CardContent>
        </Card>

        {/* XP Input Tabs */}
        <Tabs defaultValue="catching" className="space-y-4">
          <div className="overflow-x-auto">
            <TabsList className="flex w-max min-w-full glass-card p-1">
              <TabsTrigger
                value="catching"
                className="whitespace-nowrap px-4 py-2"
              >
                Catch
              </TabsTrigger>
              <TabsTrigger
                value="evolution"
                className="whitespace-nowrap px-4 py-2"
              >
                Evolution
              </TabsTrigger>
              <TabsTrigger
                value="hatching"
                className="whitespace-nowrap px-4 py-2"
              >
                Hatching
              </TabsTrigger>
              <TabsTrigger
                value="raids"
                className="whitespace-nowrap px-4 py-2"
              >
                Raids
              </TabsTrigger>
              <TabsTrigger
                value="battles"
                className="whitespace-nowrap px-4 py-2"
              >
                Battles
              </TabsTrigger>
              <TabsTrigger
                value="moves"
                className="whitespace-nowrap px-4 py-2"
              >
                Moves
              </TabsTrigger>
              <TabsTrigger
                value="friendship"
                className="whitespace-nowrap px-4 py-2"
              >
                Friends
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="catching">
            <Card className="glass-card glass-card-hover">
              <CardHeader>
                <CardTitle>Catching Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Normal Catches</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.normal_catches}
                      onChange={(e) =>
                        updateInput("normal_catches", Number(e.target.value))
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.catching.normal} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>New Pokémon Catches</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.new_pokemon_catches}
                      onChange={(e) =>
                        updateInput(
                          "new_pokemon_catches",
                          Number(e.target.value)
                        )
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.catching.new_pokemon} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Excellent Throws</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.excellent_throws}
                      onChange={(e) =>
                        updateInput("excellent_throws", Number(e.target.value))
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.catching.excellent_throw} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Great Throws</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.great_throws}
                      onChange={(e) =>
                        updateInput("great_throws", Number(e.target.value))
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.catching.great_throw} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Nice Throws</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.nice_throws}
                      onChange={(e) =>
                        updateInput("nice_throws", Number(e.target.value))
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.catching.nice_throw} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Curve Balls</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.curve_balls}
                      onChange={(e) =>
                        updateInput("curve_balls", Number(e.target.value))
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.catching.curve_ball} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>First Throws</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.first_throws}
                      onChange={(e) =>
                        updateInput("first_throws", Number(e.target.value))
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.catching.first_throw} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>XP Celebrations</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.xp_celebration}
                      onChange={(e) =>
                        updateInput("xp_celebration", Number(e.target.value))
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.catching.xp_celebration} XP each
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evolution">
            <Card className="glass-card glass-card-hover">
              <CardHeader>
                <CardTitle>Evolution Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Normal Evolutions</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.normal_evolutions}
                      onChange={(e) =>
                        updateInput("normal_evolutions", Number(e.target.value))
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.evolution.normal} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>New Pokémon Evolutions</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.new_pokemon_evolutions}
                      onChange={(e) =>
                        updateInput(
                          "new_pokemon_evolutions",
                          Number(e.target.value)
                        )
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.evolution.new_pokemon} XP each
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hatching">
            <Card className="glass-card glass-card-hover">
              <CardHeader>
                <CardTitle>Egg Hatching</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>2km Eggs</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.km_2_eggs}
                      onChange={(e) =>
                        updateInput("km_2_eggs", Number(e.target.value))
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.hatching.km_2} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>5km Eggs</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.km_5_eggs}
                      onChange={(e) =>
                        updateInput("km_5_eggs", Number(e.target.value))
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.hatching.km_5} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>7km Eggs</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.km_7_eggs}
                      onChange={(e) =>
                        updateInput("km_7_eggs", Number(e.target.value))
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.hatching.km_7} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>10km Eggs</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.km_10_eggs}
                      onChange={(e) =>
                        updateInput("km_10_eggs", Number(e.target.value))
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.hatching.km_10} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>12km Eggs</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.km_12_eggs}
                      onChange={(e) =>
                        updateInput("km_12_eggs", Number(e.target.value))
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.hatching.km_12} XP each
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="raids">
            <Card className="glass-card glass-card-hover">
              <CardHeader>
                <CardTitle>Raid Battles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>1-Star Raids</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.star_1_raids}
                      onChange={(e) =>
                        updateInput("star_1_raids", Number(e.target.value))
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.raids.star_1} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>3-Star Raids</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.star_3_raids}
                      onChange={(e) =>
                        updateInput("star_3_raids", Number(e.target.value))
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.raids.star_3} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>5-Star Raids</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.star_5_raids}
                      onChange={(e) =>
                        updateInput("star_5_raids", Number(e.target.value))
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.raids.star_5} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Mega Raids</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.mega_raids}
                      onChange={(e) =>
                        updateInput("mega_raids", Number(e.target.value))
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.raids.mega} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Shadow Raids</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.shadow_raids}
                      onChange={(e) =>
                        updateInput("shadow_raids", Number(e.target.value))
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.raids.shadow} XP each
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="battles">
            <Card className="glass-card glass-card-hover">
              <CardHeader>
                <CardTitle>Max Battles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((star) => (
                    <div key={star} className="space-y-2">
                      <Label>{star}-Star Battles</Label>
                      <Input
                        type="number"
                        min="0"
                        value={
                          inputs[
                            `star_${star}_battles` as keyof DetailedXPInputs
                          ] as number
                        }
                        onChange={(e) =>
                          updateInput(
                            `star_${star}_battles` as keyof DetailedXPInputs,
                            Number(e.target.value)
                          )
                        }
                        className="glass-card border-white/20"
                      />
                      <p className="text-xs text-muted-foreground">
                        +
                        {
                          XP_MULTIPLIERS.maxBattle[
                            `star_${star}` as keyof typeof XP_MULTIPLIERS.maxBattle
                          ]
                        }{" "}
                        XP each
                      </p>
                    </div>
                  ))}
                  <div className="space-y-2">
                    <Label>In-Person Bonus</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.in_person_bonus}
                      onChange={(e) =>
                        updateInput("in_person_bonus", Number(e.target.value))
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.maxBattle.in_person_bonus} XP each
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="moves">
            <Card className="glass-card glass-card-hover">
              <CardHeader>
                <CardTitle>Max Moves</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Level 1 Moves</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.level_1_moves}
                      onChange={(e) =>
                        updateInput("level_1_moves", Number(e.target.value))
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.maxMoves.level_1} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Level 2 Moves</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.level_2_moves}
                      onChange={(e) =>
                        updateInput("level_2_moves", Number(e.target.value))
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.maxMoves.level_2} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Max Moves</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.max_moves}
                      onChange={(e) =>
                        updateInput("max_moves", Number(e.target.value))
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.maxMoves.max_moves} XP each
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="friendship">
            <Card className="glass-card glass-card-hover">
              <CardHeader>
                <CardTitle>Friendship Levels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Good Friends</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.good_friends}
                      onChange={(e) =>
                        updateInput("good_friends", Number(e.target.value))
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.friendship.good_friends.toLocaleString()}{" "}
                      XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Great Friends</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.great_friends}
                      onChange={(e) =>
                        updateInput("great_friends", Number(e.target.value))
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +
                      {XP_MULTIPLIERS.friendship.great_friends.toLocaleString()}{" "}
                      XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Ultra Friends</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.ultra_friends}
                      onChange={(e) =>
                        updateInput("ultra_friends", Number(e.target.value))
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +
                      {XP_MULTIPLIERS.friendship.ultra_friends.toLocaleString()}{" "}
                      XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Best Friends</Label>
                    <Input
                      type="number"
                      min="0"
                      value={inputs.best_friends}
                      onChange={(e) =>
                        updateInput("best_friends", Number(e.target.value))
                      }
                      className="glass-card border-white/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.friendship.best_friends.toLocaleString()}{" "}
                      XP each
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Results Summary */}
        <div className="space-y-4">
          {/* Category Breakdown */}
          <Card className="glass-card glass-card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                XP Breakdown by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-3 glass-card rounded-lg">
                  <p className="text-sm text-muted-foreground">Catching</p>
                  <p className="text-lg font-semibold text-primary">
                    {progress.categoryXP.catching.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-3 glass-card rounded-lg">
                  <p className="text-sm text-muted-foreground">Evolution</p>
                  <p className="text-lg font-semibold text-primary">
                    {progress.categoryXP.evolution.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-3 glass-card rounded-lg">
                  <p className="text-sm text-muted-foreground">Hatching</p>
                  <p className="text-lg font-semibold text-primary">
                    {progress.categoryXP.hatching.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-3 glass-card rounded-lg">
                  <p className="text-sm text-muted-foreground">Raids</p>
                  <p className="text-lg font-semibold text-primary">
                    {progress.categoryXP.raids.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-3 glass-card rounded-lg">
                  <p className="text-sm text-muted-foreground">Max Battles</p>
                  <p className="text-lg font-semibold text-primary">
                    {progress.categoryXP.maxBattle.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-3 glass-card rounded-lg">
                  <p className="text-sm text-muted-foreground">Max Moves</p>
                  <p className="text-lg font-semibold text-primary">
                    {progress.categoryXP.maxMoves.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-3 glass-card rounded-lg">
                  <p className="text-sm text-muted-foreground">Friendship</p>
                  <p className="text-lg font-semibold text-primary">
                    {progress.categoryXP.friendship.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-3 glass-card rounded-lg border-2 border-primary/40">
                  <p className="text-sm text-muted-foreground">Total XP</p>
                  <p className="text-lg font-bold text-primary">
                    {progress.categoryXP.total.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Level Progress Results */}
          <Card className="glass-card glass-card-hover border-primary/40 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Level Progress Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    You will reach:
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    Level {progress.reachedLevel}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Target reached:
                  </p>
                  <p
                    className={`text-2xl font-bold ${
                      progress.targetReached
                        ? "text-green-500"
                        : "text-orange-500"
                    }`}
                  >
                    {progress.targetReached ? "Yes!" : "No"}
                  </p>
                </div>
              </div>

              {!progress.targetReached && (
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        XP still needed:
                      </p>
                      <p className="text-xl font-semibold text-orange-500">
                        {progress.xpRemaining.toLocaleString()} XP
                      </p>
                    </div>
                    {dailyReq.daysNeeded > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Daily XP needed:
                        </p>
                        <p className="text-xl font-semibold text-red-500">
                          {dailyReq.dailyXPNeeded.toLocaleString()} XP/day
                        </p>
                      </div>
                    )}
                  </div>

                  {dailyReq.daysNeeded > 0 && (
                    <div className="p-4 glass-card rounded-lg border border-orange-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span className="font-medium text-orange-500">
                          Timeline Analysis
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        You have {dailyReq.daysNeeded} days to reach level{" "}
                        {inputs.targetLevel}. You need to earn{" "}
                        {dailyReq.dailyXPNeeded.toLocaleString()} XP per day
                        from daily activities
                        {inputs.lucky_egg && " (with Lucky Egg active)"}.
                        {progress.categoryXP.friendship > 0 &&
                          " Friendship XP is counted as a one-time bonus."}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {inputs.lucky_egg && (
                <div className="p-4 glass-card rounded-lg border border-yellow-500/20">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium text-yellow-500">
                      Lucky Egg Active - Daily XP Doubled!
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
