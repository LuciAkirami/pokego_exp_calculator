"use client"

import { useState } from "react"
import { ArrowLeft, Egg, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface HatchingInputs {
  two_km_eggs: number
  five_km_eggs: number
  seven_km_eggs: number
  ten_km_eggs: number
  twelve_km_eggs: number
}

interface HatchingXP {
  two_km: number
  five_km: number
  seven_km: number
  ten_km: number
  twelve_km: number
}

const hatchingXP: HatchingXP = {
  two_km: 500,
  five_km: 1000,
  seven_km: 1000,
  ten_km: 2000,
  twelve_km: 4000,
}

interface HatchingXPCalculatorProps {
  onBack: () => void
}

export function HatchingXPCalculator({ onBack }: HatchingXPCalculatorProps) {
  const [inputs, setInputs] = useState<HatchingInputs>({
    two_km_eggs: 0,
    five_km_eggs: 0,
    seven_km_eggs: 0,
    ten_km_eggs: 0,
    twelve_km_eggs: 0,
  })

  const calculateTotalXP = (): number => {
    let totalXP = 0
    totalXP += inputs.two_km_eggs * hatchingXP.two_km
    totalXP += inputs.five_km_eggs * hatchingXP.five_km
    totalXP += inputs.seven_km_eggs * hatchingXP.seven_km
    totalXP += inputs.ten_km_eggs * hatchingXP.ten_km
    totalXP += inputs.twelve_km_eggs * hatchingXP.twelve_km
    return totalXP
  }

  const updateInput = (field: keyof HatchingInputs, value: number) => {
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
              Hatching XP Calculator
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Calculate XP from hatching eggs</p>
          </div>
        </div>
        <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2">
          <Egg className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">{totalXP.toLocaleString()} XP</span>
        </div>
      </header>

      {/* Calculator Content */}
      <main className="px-6 space-y-6 pb-8">
        {/* Input Fields */}
        <Card className="glass-card glass-card-hover">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              Egg Hatching Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="two_km_eggs">2km Eggs</Label>
                <Input
                  id="two_km_eggs"
                  type="number"
                  min="0"
                  value={inputs.two_km_eggs}
                  onChange={(e) => updateInput("two_km_eggs", Number.parseInt(e.target.value) || 0)}
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">+{hatchingXP.two_km} XP each</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="five_km_eggs">5km Eggs</Label>
                <Input
                  id="five_km_eggs"
                  type="number"
                  min="0"
                  value={inputs.five_km_eggs}
                  onChange={(e) => updateInput("five_km_eggs", Number.parseInt(e.target.value) || 0)}
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">+{hatchingXP.five_km} XP each</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seven_km_eggs">7km Eggs</Label>
                <Input
                  id="seven_km_eggs"
                  type="number"
                  min="0"
                  value={inputs.seven_km_eggs}
                  onChange={(e) => updateInput("seven_km_eggs", Number.parseInt(e.target.value) || 0)}
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">+{hatchingXP.seven_km} XP each</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ten_km_eggs">10km Eggs</Label>
                <Input
                  id="ten_km_eggs"
                  type="number"
                  min="0"
                  value={inputs.ten_km_eggs}
                  onChange={(e) => updateInput("ten_km_eggs", Number.parseInt(e.target.value) || 0)}
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">+{hatchingXP.ten_km} XP each</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="twelve_km_eggs">12km Eggs</Label>
                <Input
                  id="twelve_km_eggs"
                  type="number"
                  min="0"
                  value={inputs.twelve_km_eggs}
                  onChange={(e) => updateInput("twelve_km_eggs", Number.parseInt(e.target.value) || 0)}
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">+{hatchingXP.twelve_km} XP each</p>
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
