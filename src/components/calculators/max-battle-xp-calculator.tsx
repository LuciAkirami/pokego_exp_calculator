"use client";

import { useState } from "react";
import { ArrowLeft, Shield, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LuckyEggCard } from "@/components/common/lucky-egg-card";
import { XP_MULTIPLIERS } from "@/types/xp-constants";

interface MaxBattleInputs {
  one_star_battles: string;
  two_star_battles: string;
  three_star_battles: string;
  four_star_battles: string;
  five_star_battles: string;
  six_star_battles: string;
  in_person_bonus_battles: string;
  lucky_egg: boolean;
}

interface MaxBattleXPCalculatorProps {
  onBack: () => void;
}

export function MaxBattleXPCalculator({ onBack }: MaxBattleXPCalculatorProps) {
  const [inputs, setInputs] = useState<MaxBattleInputs>({
    one_star_battles: "",
    two_star_battles: "",
    three_star_battles: "",
    four_star_battles: "",
    five_star_battles: "",
    six_star_battles: "",
    in_person_bonus_battles: "",
    lucky_egg: false,
  });

  const handleNumberInput = (
    field: keyof Pick<
      MaxBattleInputs,
      | "one_star_battles"
      | "two_star_battles"
      | "three_star_battles"
      | "four_star_battles"
      | "five_star_battles"
      | "six_star_battles"
      | "in_person_bonus_battles"
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

  const updateInput = (
    field: keyof MaxBattleInputs,
    value: string | boolean
  ) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateTotalXP = (): number => {
    let totalXP = 0;
    const oneStarBattles = Number.parseInt(inputs.one_star_battles) || 0;
    const twoStarBattles = Number.parseInt(inputs.two_star_battles) || 0;
    const threeStarBattles = Number.parseInt(inputs.three_star_battles) || 0;
    const fourStarBattles = Number.parseInt(inputs.four_star_battles) || 0;
    const fiveStarBattles = Number.parseInt(inputs.five_star_battles) || 0;
    const sixStarBattles = Number.parseInt(inputs.six_star_battles) || 0;
    const inPersonBonusBattles =
      Number.parseInt(inputs.in_person_bonus_battles) || 0;

    totalXP += oneStarBattles * XP_MULTIPLIERS.maxBattle.star_1;
    totalXP += twoStarBattles * XP_MULTIPLIERS.maxBattle.star_2;
    totalXP += threeStarBattles * XP_MULTIPLIERS.maxBattle.star_3;
    totalXP += fourStarBattles * XP_MULTIPLIERS.maxBattle.star_4;
    totalXP += fiveStarBattles * XP_MULTIPLIERS.maxBattle.star_5;
    totalXP += sixStarBattles * XP_MULTIPLIERS.maxBattle.star_6;
    totalXP += inPersonBonusBattles * XP_MULTIPLIERS.maxBattle.in_person_bonus;

    // Double XP if lucky egg is active
    if (inputs.lucky_egg) {
      totalXP *= 2;
    }

    return totalXP;
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
              Max Battle XP Calculator
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground mt-1">
              Calculate XP from Max Battles
            </p>
          </div>
        </div>
        {/* If totalXP is greater than 1000000 then show it as M */}
        {/* <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
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
              Max Battle Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="one_star_battles">1-Star Battles</Label>
                <Input
                  id="one_star_battles"
                  type="text"
                  inputMode="numeric"
                  min="0"
                  value={inputs.one_star_battles}
                  onChange={(e) =>
                    handleNumberInput("one_star_battles", e.target.value)
                  }
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  +{XP_MULTIPLIERS.maxBattle.star_1.toLocaleString()} XP each
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="two_star_battles">2-Star Battles</Label>
                <Input
                  id="two_star_battles"
                  type="text"
                  inputMode="numeric"
                  min="0"
                  value={inputs.two_star_battles}
                  onChange={(e) =>
                    handleNumberInput("two_star_battles", e.target.value)
                  }
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  +{XP_MULTIPLIERS.maxBattle.star_2.toLocaleString()} XP each
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="three_star_battles">3-Star Battles</Label>
                <Input
                  id="three_star_battles"
                  type="text"
                  inputMode="numeric"
                  min="0"
                  value={inputs.three_star_battles}
                  onChange={(e) =>
                    handleNumberInput("three_star_battles", e.target.value)
                  }
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  +{XP_MULTIPLIERS.maxBattle.star_3.toLocaleString()} XP each
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="four_star_battles">4-Star Battles</Label>
                <Input
                  id="four_star_battles"
                  type="text"
                  inputMode="numeric"
                  min="0"
                  value={inputs.four_star_battles}
                  onChange={(e) =>
                    handleNumberInput("four_star_battles", e.target.value)
                  }
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  +{XP_MULTIPLIERS.maxBattle.star_4.toLocaleString()} XP each
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="five_star_battles">5-Star Battles</Label>
                <Input
                  id="five_star_battles"
                  type="text"
                  inputMode="numeric"
                  min="0"
                  value={inputs.five_star_battles}
                  onChange={(e) =>
                    handleNumberInput("five_star_battles", e.target.value)
                  }
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  +{XP_MULTIPLIERS.maxBattle.star_5.toLocaleString()} XP each
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="six_star_battles">6-Star Battles</Label>
                <Input
                  id="six_star_battles"
                  type="text"
                  inputMode="numeric"
                  min="0"
                  value={inputs.six_star_battles}
                  onChange={(e) =>
                    handleNumberInput("six_star_battles", e.target.value)
                  }
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  +{XP_MULTIPLIERS.maxBattle.star_6.toLocaleString()} XP each
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="in_person_bonus_battles">
                  In-Person Bonus Battles
                </Label>
                <Input
                  id="in_person_bonus_battles"
                  type="text"
                  inputMode="numeric"
                  min="0"
                  value={inputs.in_person_bonus_battles}
                  onChange={(e) =>
                    handleNumberInput("in_person_bonus_battles", e.target.value)
                  }
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  +{XP_MULTIPLIERS.maxBattle.in_person_bonus.toLocaleString()}{" "}
                  XP each
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
