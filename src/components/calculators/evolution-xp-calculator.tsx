import { useState } from "react";
import { ArrowLeft, Shuffle, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LuckyEggCard } from "@/components/common/lucky-egg-card";
import { GAME_CONSTANTS } from "@/types/xp-constants";

interface EvolutionInputs {
  normal_evolutions: string;
  new_pokemon_evolutions: string;
  lucky_egg: boolean;
}

interface EvolutionXP {
  normal: number;
  new_pokemon: number;
}

const evolutionXP: EvolutionXP = {
  normal: 1000,
  new_pokemon: 1000,
};

interface EvolutionXPCalculatorProps {
  onBack: () => void;
}

export function EvolutionXPCalculator({ onBack }: EvolutionXPCalculatorProps) {
  const [inputs, setInputs] = useState<EvolutionInputs>({
    normal_evolutions: "",
    new_pokemon_evolutions: "",
    lucky_egg: false,
  });

  const calculateTotalXP = (): number => {
    let totalXP = 0;
    const normalEvolutions = Number.parseInt(inputs.normal_evolutions) || 0;
    const newPokemonEvolutions =
      Number.parseInt(inputs.new_pokemon_evolutions) || 0;

    totalXP += normalEvolutions * evolutionXP.normal;
    totalXP += newPokemonEvolutions * evolutionXP.new_pokemon;

    // Double XP if lucky egg is active
    if (inputs.lucky_egg) {
      totalXP *= 2;
    }

    return totalXP;
  };

  const updateInput = (
    field: keyof EvolutionInputs,
    value: string | boolean
  ) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNumberInput = (
    field: keyof Pick<
      EvolutionInputs,
      "normal_evolutions" | "new_pokemon_evolutions"
    >,
    value: string
  ) => {
    // Allow empty string or valid numbers only
    if (value === "" || /^\d+$/.test(value)) {
      const normal_evolutions = parseInt(inputs.normal_evolutions) || 0;
      const new_pokemon_evolutions =
        parseInt(inputs.new_pokemon_evolutions) || 0;
      const int_value = parseInt(value) || 0;
      // Limit to 1 Million
      if (int_value > 1000000) {
        value = "1000000";
      }
      if (field === "new_pokemon_evolutions") {
        if (int_value > normal_evolutions) {
          updateInput(field, normal_evolutions.toString());
        } else {
          updateInput(field, value);
        }
      } else if (field === "normal_evolutions") {
        if (int_value < new_pokemon_evolutions) {
          updateInput("new_pokemon_evolutions", value);
        }
        updateInput(field, value);
        // if normal_evolutions is 0 then set new_pokemon_evolutions to 0
        if (int_value === 0) {
          updateInput("new_pokemon_evolutions", "");
        }
      }
    }
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
            <h1 className="text-sm md:text-lg lg:text-xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              Evolution XP Calculator
            </h1>
            <p className="text-xs md:text-sm lg:text-base text-muted-foreground mt-1">
              Calculate XP from evolving Pokémon
            </p>
          </div>
        </div>
        <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2">
          <Shuffle className="w-4 h-4 text-primary" />
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
              Evolution Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="normal_evolutions">Normal Evolutions</Label>
                <Input
                  id="normal_evolutions"
                  type="text"
                  inputMode="numeric"
                  value={inputs.normal_evolutions}
                  onChange={(e) =>
                    handleNumberInput("normal_evolutions", e.target.value)
                  }
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  +{evolutionXP.normal} XP each
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new_pokemon_evolutions">
                  New Pokémon Evolutions
                </Label>
                <Input
                  id="new_pokemon_evolutions"
                  type="text"
                  inputMode="numeric"
                  value={inputs.new_pokemon_evolutions}
                  onChange={(e) =>
                    handleNumberInput("new_pokemon_evolutions", e.target.value)
                  }
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  +{evolutionXP.new_pokemon} XP each
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
