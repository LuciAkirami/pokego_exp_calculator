import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { invoke } from '@tauri-apps/api/core';
import { Badge } from './ui/badge';

interface Level50CalculatorCardProps {
  currentLevel: number;
  onLevelChange: (field: string, value: number) => void;
}

const Level50CalculatorCard: React.FC<Level50CalculatorCardProps> = ({
  currentLevel,
  onLevelChange,
}) => {
  const [currentXp, setCurrentXp] = useState<number>(0);
  const [useLuckyEgg, setUseLuckyEgg] = useState<boolean>(false);
  const [xpPerDay, setXpPerDay] = useState<number>(0);
  const [daysRemaining, setDaysRemaining] = useState<number>(0);
  const [xpNeeded, setXpNeeded] = useState<number>(0);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Calculate days until October 15, 2025
  const calculateDaysRemaining = (): number => {
    const today = new Date();
    const targetDate = new Date('2025-10-15T00:00:00');
    
    // Calculate the difference in days
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  };

  // Calculate XP per day needed
  const calculateXpPerDay = async () => {
    if (currentLevel >= 50) {
      setXpPerDay(0);
      setDaysRemaining(0);
      setXpNeeded(0);
      return;
    }

    setIsCalculating(true);
    try {
      const days = calculateDaysRemaining();
      setDaysRemaining(days);
      
      // Call the Rust function
      const response = await invoke<{ xp_per_day: number; days_remaining: number; xp_needed: number }>(
        'calculate_xp_to_level_50',
        {
          currentLevel: currentLevel,
          currentXp: currentXp,
          daysRemaining: days,
        }
      );

      // Adjust for lucky egg if needed
      const adjustedXpPerDay = useLuckyEgg ? Math.ceil(response.xp_per_day / 2) : response.xp_per_day;
      
      setXpPerDay(adjustedXpPerDay);
      setXpNeeded(response.xp_needed);
    } catch (error) {
      console.error('Error calculating XP to level 50:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  // Recalculate when inputs change
  useEffect(() => {
    if (currentLevel > 0) {
      calculateXpPerDay();
    }
  }, [currentLevel, currentXp, useLuckyEgg]);

  // Format large numbers with commas
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Level 50 Calculator
        </CardTitle>
        <CardDescription className="text-center">
          Calculate the XP needed per day to reach Level 50 by October 15, 2025
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="current-level">Current Level</Label>
            <Input
              id="current-level"
              type="number"
              min="1"
              max="50"
              value={currentLevel}
              onChange={(e) =>
                onLevelChange(
                  "current_level",
                  Math.min(50, parseInt(e.target.value) || 1)
                )
              }
              className="text-center text-lg font-medium"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="current-xp">
              Current XP in Level {currentLevel}
            </Label>
            <Input
              id="current-xp"
              type="number"
              min="0"
              value={currentXp}
              onChange={(e) => setCurrentXp(parseInt(e.target.value) || 0)}
              placeholder="Enter current XP"
              className="text-center text-lg font-medium"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center">
            <Switch
              id="lucky-egg"
              checked={useLuckyEgg}
              onCheckedChange={() => setUseLuckyEgg(!useLuckyEgg)}
              className="data-[state=checked]:bg-blue-600"
            />
            <Label
              htmlFor="lucky-egg"
              className="ml-2 text-base font-medium cursor-pointer"
            >
              Using Lucky Egg
            </Label>
          </div>
          <div
            className={`transition-opacity duration-200 ${
              useLuckyEgg ? "opacity-100" : "opacity-0"
            }`}
          >
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200"
            >
              2× XP Active
            </Badge>
          </div>
          {/* Invisible spacer to prevent layout shift */}
          <div className="invisible absolute">
            <Badge variant="outline">2× XP Active</Badge>
          </div>
        </div>

        {/* Stats Section */}
        <div className="space-y-6 transition-opacity duration-300">
          {/* Days Remaining */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardContent className="p-4">
              <div className="flex flex-col justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">
                  Days until Oct 15, 2025
                </span>
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {daysRemaining} days
                </span>
              </div>
            </CardContent>
          </Card>

          {/* XP Needed */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardContent className="p-4">
              <div className="flex flex-col justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">
                  XP needed for Level 50
                </span>
                <span className="text-xl font-bold text-green-600 dark:text-green-400">
                  {formatNumber(xpNeeded)} XP
                </span>
              </div>
            </CardContent>
          </Card>

          {/* XP Per Day */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardContent className="p-4">
              <div className="flex flex-col justify-between items-center">
                <div className="flex flex-col items-center">
                  <div className="text-gray-700 dark:text-gray-300">
                    XP needed per day
                  </div>
                  {/* Smoothly show/hide the Lucky Egg text */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      useLuckyEgg
                        ? "max-h-6 opacity-100 mt-1"
                        : "max-h-0 opacity-0 mt-0"
                    }`}
                  >
                    <div className="text-xs text-muted-foreground">
                      (With Lucky Egg)
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    {formatNumber(xpPerDay)} XP / day
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {currentLevel >= 50 && (
          <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 mt-6">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-1">
              Congratulations! You're at the maximum level.
            </h3>
            <p className="text-green-600 dark:text-green-400">
              You've reached Level 50!
            </p>
          </div>
        )}

        {daysRemaining <= 0 && currentLevel < 50 && (
          <div className="text-center p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="text-4xl mb-2">⚠️</div>
            <h3 className="text-lg font-bold text-yellow-700 dark:text-yellow-300 mb-1">
              Target Date Passed
            </h3>
            <p className="text-yellow-600 dark:text-yellow-400">
              The target date (October 15, 2025) has already passed.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Level50CalculatorCard;
