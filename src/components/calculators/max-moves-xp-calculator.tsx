"use client";

import { useState } from "react";
import { ArrowLeft, Zap, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LuckyEggCard } from "@/components/common/lucky-egg-card";
import { XP_MULTIPLIERS } from "@/types/xp-constants";

interface MaxMovesInputs {
  level_1_moves: string;
  level_2_moves: string;
  level_max_moves: string;
  lucky_egg: boolean;
}

interface MaxMovesXPCalculatorProps {
  onBack: () => void;
}

export function MaxMovesXPCalculator({ onBack }: MaxMovesXPCalculatorProps) {
  const [inputs, setInputs] = useState<MaxMovesInputs>({
    level_1_moves: "",
    level_2_moves: "",
    level_max_moves: "",
    lucky_egg: false,
  });

  const handleNumberInput = (
    field: keyof Pick<
      MaxMovesInputs,
      "level_1_moves" | "level_2_moves" | "level_max_moves"
    >,
    value: string
  ) => {
    // Allow empty string or valid numbers only
    if (value === "" || /^\d+$/.test(value)) {
      const int_value = parseInt(value) || 0;
      // Limit to 10000
      if (int_value > 10000) {
        value = "10000";
      }
      updateInput(field, value);
    }
  };

  const calculateTotalXP = (): number => {
    let totalXP = 0;
    const level1Moves = Number.parseInt(inputs.level_1_moves) || 0;
    const level2Moves = Number.parseInt(inputs.level_2_moves) || 0;
    const levelMaxMoves = Number.parseInt(inputs.level_max_moves) || 0;

    totalXP += level1Moves * XP_MULTIPLIERS.maxMoves.level_1;
    totalXP += level2Moves * XP_MULTIPLIERS.maxMoves.level_2;
    totalXP += levelMaxMoves * XP_MULTIPLIERS.maxMoves.level_max;

    // Double XP if lucky egg is active
    if (inputs.lucky_egg) {
      totalXP *= 2;
    }

    return totalXP;
  };

  const updateInput = (
    field: keyof MaxMovesInputs,
    value: string | boolean
  ) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const totalXP = calculateTotalXP();

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
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              Max Moves XP Calculator
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground mt-1">
              Calculate XP from Max Moves
            </p>
          </div>
        </div>
        {/* If totalXP is greater than 1000000 then show it as M */}
        {/* <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-xs md:text-sm lg:text-base font-medium text-primary">
            {totalXP > 1000000
              ? (totalXP / 1000000).toFixed(1) + "M"
              : totalXP.toLocaleString()}
          </span>
          <span className="text-xs md:text-sm lg:text-base font-medium text-primary">
            XP
          </span>
        </div> */}
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
                  type="text"
                  inputMode="numeric"
                  min="0"
                  value={inputs.level_1_moves}
                  onChange={(e) =>
                    handleNumberInput("level_1_moves", e.target.value)
                  }
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  +{XP_MULTIPLIERS.maxMoves.level_1.toLocaleString()} XP each
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="level_2_moves">Level 2 Moves</Label>
                <Input
                  id="level_2_moves"
                  type="text"
                  inputMode="numeric"
                  min="0"
                  value={inputs.level_2_moves}
                  onChange={(e) =>
                    handleNumberInput("level_2_moves", e.target.value)
                  }
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  +{XP_MULTIPLIERS.maxMoves.level_2.toLocaleString()} XP each
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="level_max_moves">Level Max Moves</Label>
                <Input
                  id="level_max_moves"
                  type="text"
                  inputMode="numeric"
                  min="0"
                  value={inputs.level_max_moves}
                  onChange={(e) =>
                    handleNumberInput("level_max_moves", e.target.value)
                  }
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  +{XP_MULTIPLIERS.maxMoves.level_max.toLocaleString()} XP each
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
