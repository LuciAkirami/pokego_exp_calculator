"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Target, Calendar, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface Level50CalculatorProps {
  onBack: () => void
}

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

const TARGET_DATE = new Date("2025-10-14")

export function Level50Calculator({ onBack }: Level50CalculatorProps) {
  const [currentLevel, setCurrentLevel] = useState<number>(1)
  const [currentXP, setCurrentXP] = useState<number>(0)
  const [luckyEgg, setLuckyEgg] = useState<boolean>(false)
  const [totalXPNeeded, setTotalXPNeeded] = useState<number>(0)
  const [daysRemaining, setDaysRemaining] = useState<number>(0)
  const [dailyXPNeeded, setDailyXPNeeded] = useState<number>(0)

  useEffect(() => {
    const today = new Date()
    const timeDiff = TARGET_DATE.getTime() - today.getTime()
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24))
    setDaysRemaining(Math.max(0, days))
  }, [])

  useEffect(() => {
    if (currentLevel >= 1 && currentLevel <= 50) {
      const currentLevelXP = XP_REQUIREMENTS[currentLevel] || 0
      const totalCurrentXP = currentLevelXP + currentXP
      const level50XP = XP_REQUIREMENTS[50]
      const xpNeeded = Math.max(0, level50XP - totalCurrentXP)

      setTotalXPNeeded(xpNeeded)

      if (daysRemaining > 0) {
        const baseDaily = xpNeeded / daysRemaining
        const adjustedDaily = luckyEgg ? baseDaily / 2 : baseDaily
        setDailyXPNeeded(Math.ceil(adjustedDaily))
      }
    }
  }, [currentLevel, currentXP, luckyEgg, daysRemaining])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

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
              To Level 50
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Calculate XP needed to reach level 50</p>
          </div>
        </div>
        <div className="glass-card rounded-full p-3">
          <Target className="w-6 h-6 text-red-500" />
        </div>
      </header>

      {/* Calculator */}
      <main className="px-6 space-y-6 pb-8">
        {/* Input Section */}
        <div className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full" />
            <h2 className="text-lg font-semibold text-foreground">Current Progress</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentLevel" className="text-sm font-medium text-foreground">
                Current Level
              </Label>
              <Input
                id="currentLevel"
                type="number"
                min="1"
                max="50"
                value={currentLevel}
                onChange={(e) => setCurrentLevel(Number(e.target.value))}
                className="glass-input"
                placeholder="Enter level"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentXP" className="text-sm font-medium text-foreground">
                Current XP in Level
              </Label>
              <Input
                id="currentXP"
                type="number"
                min="0"
                value={currentXP}
                onChange={(e) => setCurrentXP(Number(e.target.value))}
                className="glass-input"
                placeholder="Enter XP"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 glass-card rounded-lg">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-yellow-500" />
              <div>
                <Label htmlFor="luckyEgg" className="text-sm font-medium text-foreground">
                  Lucky Egg Active
                </Label>
                <p className="text-xs text-muted-foreground">Doubles XP earned</p>
              </div>
            </div>
            <Switch id="luckyEgg" className="bg-red-500" checked={luckyEgg} onCheckedChange={setLuckyEgg} />
          </div>
        </div>

        {/* Results Section */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full" />
            <h2 className="text-lg font-semibold text-foreground">XP Calculation</h2>
          </div>

          <div className="grid gap-4">
            <div className="flex justify-between items-center p-4 glass-card rounded-lg">
              <span className="text-sm text-muted-foreground">Total XP Needed</span>
              <span className="font-semibold text-lg text-red-500">{formatNumber(totalXPNeeded)} XP</span>
            </div>

            <div className="flex justify-between items-center p-4 glass-card rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Target Date</span>
              </div>
              <span className="font-semibold text-foreground">{formatDate(TARGET_DATE)}</span>
            </div>

            <div className="flex justify-between items-center p-4 glass-card rounded-lg">
              <span className="text-sm text-muted-foreground">Days Remaining</span>
              <span className="font-semibold text-lg text-foreground">{daysRemaining} days</span>
            </div>

            <div className="flex justify-between items-center p-4 glass-card rounded-lg border-2 border-red-500/20">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-foreground">
                  Daily XP Needed {luckyEgg && "(with Lucky Egg)"}
                </span>
              </div>
              <span className="font-bold text-xl text-red-500">{formatNumber(dailyXPNeeded)} XP/day</span>
            </div>
          </div>

          {currentLevel >= 50 && (
            <div className="p-4 glass-card rounded-lg border-2 border-green-500/20 bg-green-500/5">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-500" />
                <span className="font-semibold text-green-500">Congratulations! You're already at level 50!</span>
              </div>
            </div>
          )}

          {daysRemaining <= 0 && currentLevel < 50 && (
            <div className="p-4 glass-card rounded-lg border-2 border-orange-500/20 bg-orange-500/5">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                <span className="font-semibold text-orange-500">Target date has passed. Set a new goal!</span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
