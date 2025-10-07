import { useState } from "react"
import { ArrowLeft, Heart, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LuckyEggCard } from "@/components/common/lucky-egg-card"
import { XP_MULTIPLIERS, GAME_CONSTANTS } from "@/types/xp-constants"

interface FriendshipInputs {
  good_friends: string
  great_friends: string
  ultra_friends: string
  best_friends: string
  lucky_egg: boolean
}


interface FriendshipXPCalculatorProps {
  onBack: () => void
}

export function FriendshipXPCalculator({ onBack }: FriendshipXPCalculatorProps) {
  const [inputs, setInputs] = useState<FriendshipInputs>({
    good_friends: "",
    great_friends: "",
    ultra_friends: "",
    best_friends: "",
    lucky_egg: false,
  })

  const calculateTotalXP = (): number => {
    let totalXP = 0
    const goodFriends = Number.parseInt(inputs.good_friends) || 0
    const greatFriends = Number.parseInt(inputs.great_friends) || 0
    const ultraFriends = Number.parseInt(inputs.ultra_friends) || 0
    const bestFriends = Number.parseInt(inputs.best_friends) || 0
    totalXP += goodFriends * XP_MULTIPLIERS.friendship.good_friends
    totalXP += greatFriends * XP_MULTIPLIERS.friendship.great_friends
    totalXP += ultraFriends * XP_MULTIPLIERS.friendship.ultra_friends
    totalXP += bestFriends * XP_MULTIPLIERS.friendship.best_friends
    
    // Double XP if lucky egg is active
    if (inputs.lucky_egg) {
      totalXP *= 2
    }
    
    return totalXP
  }

  const handleNumberInput = (field: keyof Pick<FriendshipInputs, 'good_friends' | 'great_friends' | 'ultra_friends' | 'best_friends'>, value: string) => {
    // Allow empty string or valid numbers only
    if (value === "" || /^\d+$/.test(value)) {
      const int_value = parseInt(value) || 0;
      // Limit to 450
      if (int_value > GAME_CONSTANTS.MAX_FRIENDSHIP) {
        value = GAME_CONSTANTS.MAX_FRIENDSHIP.toString();
      }
      updateInput(field, value)
    }
  }

  const updateInput = (field: keyof FriendshipInputs, value: string | boolean) => {
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
              {/* Apply line break only on mobile */}
              Friendship XP <br className="sm:hidden" /> Calculator
            </h1>
            <p className="text-xs md:text-sm lg:text-base text-muted-foreground mt-1">
              {/* Apply line break only on mobile */}
              Calculate XP from <br className="sm:hidden" /> friendship levels
            </p>
          </div>
        </div>
        <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2">
          <Heart className="w-4 h-4 text-primary" />
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
              Friendship Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="good_friends">Good Friends</Label>
                <Input
                  id="good_friends"
                  type="text"
                  inputMode="numeric"
                  min="0"
                  value={inputs.good_friends}
                  onChange={(e) =>
                    handleNumberInput("good_friends", e.target.value)
                  }
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  +{XP_MULTIPLIERS.friendship.good_friends.toLocaleString()} XP
                  each
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="great_friends">Great Friends</Label>
                <Input
                  id="great_friends"
                  type="text"
                  inputMode="numeric"
                  min="0"
                  value={inputs.great_friends}
                  onChange={(e) =>
                    handleNumberInput("great_friends", e.target.value)
                  }
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  +{XP_MULTIPLIERS.friendship.great_friends.toLocaleString()} XP
                  each
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ultra_friends">Ultra Friends</Label>
                <Input
                  id="ultra_friends"
                  type="text"
                  inputMode="numeric"
                  min="0"
                  value={inputs.ultra_friends}
                  onChange={(e) =>
                    handleNumberInput("ultra_friends", e.target.value)
                  }
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  +{XP_MULTIPLIERS.friendship.ultra_friends.toLocaleString()} XP
                  each
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="best_friends">Best Friends</Label>
                <Input
                  id="best_friends"
                  type="text"
                  inputMode="numeric"
                  min="0"
                  value={inputs.best_friends}
                  onChange={(e) =>
                    handleNumberInput("best_friends", e.target.value)
                  }
                  className="glass-card border-white/20"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  +{XP_MULTIPLIERS.friendship.best_friends.toLocaleString()} XP
                  each
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
