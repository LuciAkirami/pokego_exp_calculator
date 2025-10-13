"use client";

import { useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  Target,
  // Clock,
  Zap,
  Calculator,
  TrendingUp,
  Calendar,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  XP_REQUIREMENTS,
  XP_MULTIPLIERS,
  GAME_CONSTANTS,
} from "@/types/xp-constants";
import type {
  DetailedXPInputs,
  DetailedXPCalculatorProps,
} from "@/types/xp-calculator";

export function DetailedXPCalculator({ onBack }: DetailedXPCalculatorProps) {
  const [inputs, setInputs] = useState<DetailedXPInputs>({
    currentLevel: "",
    currentXP: "",
    targetLevel: "",
    normal_catches: "",
    new_pokemon_catches: "",
    excellent_throws: "",
    curve_balls: "",
    first_throws: "",
    great_throws: "",
    nice_throws: "",
    normal_evolutions: "",
    new_pokemon_evolutions: "",
    km_2_eggs: "",
    km_5_eggs: "",
    km_7_eggs: "",
    km_10_eggs: "",
    km_12_eggs: "",
    star_1_raids: "",
    star_3_raids: "",
    star_5_raids: "",
    mega_raids: "",
    shadow_raids: "",
    star_1_battles: "",
    star_2_battles: "",
    star_3_battles: "",
    star_4_battles: "",
    star_5_battles: "",
    star_6_battles: "",
    in_person_bonus: "",
    level_1_moves: "",
    level_2_moves: "",
    level_max_moves: "",
    good_friends: "",
    great_friends: "",
    ultra_friends: "",
    best_friends: "",
    lucky_egg: false,
    use_target_timeline: true,
    target_type: "date",
    target_date: "2025-12-31",
    target_days: "",
  });

  const calculateCategoryXP = () => {
    // --------  Catching ----------
    const normal_catches = Number.parseInt(inputs.normal_catches) || 0;
    const new_pokemon_catches =
      Number.parseInt(inputs.new_pokemon_catches) || 0;
    const excellent_throws = Number.parseInt(inputs.excellent_throws) || 0;
    const curve_balls = Number.parseInt(inputs.curve_balls) || 0;
    const first_throws = Number.parseInt(inputs.first_throws) || 0;
    const great_throws = Number.parseInt(inputs.great_throws) || 0;
    const nice_throws = Number.parseInt(inputs.nice_throws) || 0;

    const catching =
      normal_catches * XP_MULTIPLIERS.catching.normal +
      new_pokemon_catches * XP_MULTIPLIERS.catching.new_pokemon +
      excellent_throws * XP_MULTIPLIERS.catching.excellent_throw +
      curve_balls * XP_MULTIPLIERS.catching.curve_ball +
      first_throws * XP_MULTIPLIERS.catching.first_throw +
      great_throws * XP_MULTIPLIERS.catching.great_throw +
      nice_throws * XP_MULTIPLIERS.catching.nice_throw;

    // --------  Evolution ----------
    const normal_evolutions = Number.parseInt(inputs.normal_evolutions) || 0;
    const new_pokemon_evolutions =
      Number.parseInt(inputs.new_pokemon_evolutions) || 0;
    const evolution =
      normal_evolutions * XP_MULTIPLIERS.evolution.normal +
      new_pokemon_evolutions * XP_MULTIPLIERS.evolution.new_pokemon;

    // --------  Hatching ----------
    const km_2_eggs = Number.parseInt(inputs.km_2_eggs) || 0;
    const km_5_eggs = Number.parseInt(inputs.km_5_eggs) || 0;
    const km_7_eggs = Number.parseInt(inputs.km_7_eggs) || 0;
    const km_10_eggs = Number.parseInt(inputs.km_10_eggs) || 0;
    const km_12_eggs = Number.parseInt(inputs.km_12_eggs) || 0;
    const hatching =
      km_2_eggs * XP_MULTIPLIERS.hatching.km_2 +
      km_5_eggs * XP_MULTIPLIERS.hatching.km_5 +
      km_7_eggs * XP_MULTIPLIERS.hatching.km_7 +
      km_10_eggs * XP_MULTIPLIERS.hatching.km_10 +
      km_12_eggs * XP_MULTIPLIERS.hatching.km_12;

    // --------  Raids ----------
    const star_1_raids = Number.parseInt(inputs.star_1_raids) || 0;
    const star_3_raids = Number.parseInt(inputs.star_3_raids) || 0;
    const star_5_raids = Number.parseInt(inputs.star_5_raids) || 0;
    const mega_raids = Number.parseInt(inputs.mega_raids) || 0;
    const shadow_raids = Number.parseInt(inputs.shadow_raids) || 0;
    const raids =
      star_1_raids * XP_MULTIPLIERS.raids.star_1 +
      star_3_raids * XP_MULTIPLIERS.raids.star_3 +
      star_5_raids * XP_MULTIPLIERS.raids.star_5 +
      mega_raids * XP_MULTIPLIERS.raids.mega +
      shadow_raids * XP_MULTIPLIERS.raids.shadow;

    // --------  Max Battles ----------
    const star_1_battles = Number.parseInt(inputs.star_1_battles) || 0;
    const star_2_battles = Number.parseInt(inputs.star_2_battles) || 0;
    const star_3_battles = Number.parseInt(inputs.star_3_battles) || 0;
    const star_4_battles = Number.parseInt(inputs.star_4_battles) || 0;
    const star_5_battles = Number.parseInt(inputs.star_5_battles) || 0;
    const star_6_battles = Number.parseInt(inputs.star_6_battles) || 0;
    const in_person_bonus = Number.parseInt(inputs.in_person_bonus) || 0;
    const maxBattle =
      star_1_battles * XP_MULTIPLIERS.maxBattle.star_1 +
      star_2_battles * XP_MULTIPLIERS.maxBattle.star_2 +
      star_3_battles * XP_MULTIPLIERS.maxBattle.star_3 +
      star_4_battles * XP_MULTIPLIERS.maxBattle.star_4 +
      star_5_battles * XP_MULTIPLIERS.maxBattle.star_5 +
      star_6_battles * XP_MULTIPLIERS.maxBattle.star_6 +
      in_person_bonus * XP_MULTIPLIERS.maxBattle.in_person_bonus;

    // --------  Max Moves ----------
    const level_1_moves = Number.parseInt(inputs.level_1_moves) || 0;
    const level_2_moves = Number.parseInt(inputs.level_2_moves) || 0;
    const level_max_moves = Number.parseInt(inputs.level_max_moves) || 0;
    const maxMoves =
      level_1_moves * XP_MULTIPLIERS.maxMoves.level_1 +
      level_2_moves * XP_MULTIPLIERS.maxMoves.level_2 +
      level_max_moves * XP_MULTIPLIERS.maxMoves.level_max;

    // --------  Friendship ----------
    // Friendship XP is only calculated once not per day
    const good_friends = Number.parseInt(inputs.good_friends) || 0;
    const great_friends = Number.parseInt(inputs.great_friends) || 0;
    const ultra_friends = Number.parseInt(inputs.ultra_friends) || 0;
    const best_friends = Number.parseInt(inputs.best_friends) || 0;
    const friendship =
      good_friends * XP_MULTIPLIERS.friendship.good_friends +
      great_friends * XP_MULTIPLIERS.friendship.great_friends +
      ultra_friends * XP_MULTIPLIERS.friendship.ultra_friends +
      best_friends * XP_MULTIPLIERS.friendship.best_friends;

    // Apply lucky egg to daily activities (not friendship)
    const dailyXP =
      catching + evolution + hatching + raids + maxBattle + maxMoves;
    const adjustedDailyXP = inputs.lucky_egg ? dailyXP * 2 : dailyXP;

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
    };
  };

  const calculateLevelProgress = () => {
    const categoryXP = calculateCategoryXP();
    const currentXP = Number.parseInt(inputs.currentXP) || 0;
    const currentLevel = Number.parseInt(inputs.currentLevel) || 1;
    const targetLevel = Number.parseInt(inputs.targetLevel) || 50;
    const currentTotalXP = XP_REQUIREMENTS[currentLevel] + currentXP;
    const targetTotalXP = XP_REQUIREMENTS[targetLevel] || XP_REQUIREMENTS[50];
    const newTotalXP = currentTotalXP + categoryXP.total;

    const xpNeeded = Math.max(0, targetTotalXP - currentTotalXP);
    const xpRemaining = Math.max(0, targetTotalXP - newTotalXP);
    const targetReached = newTotalXP >= targetTotalXP;

    // Find what level they'll reach
    let reachedLevel = currentLevel;
    for (let level = currentLevel + 1; level <= 50; level++) {
      if (newTotalXP >= XP_REQUIREMENTS[level]) {
        reachedLevel = level;
      } else {
        break;
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
    };
  };

  const updateInput = (
    field: keyof DetailedXPInputs,
    value: string | boolean
  ) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Everything except lucky_egg and use_target_timeline
  const handleNumberInput = (
    // field: keyof Pick<
    //   DetailedXPInputs,
    //   | "currentLevel"
    //   | "currentXP"
    //   | "targetLevel"
    //   | "normal_catches"
    //   | "new_pokemon_catches"
    //   | "excellent_throws"
    //   | "curve_balls"
    //   | "first_throws"
    //   | "great_throws"
    //   | "nice_throws"
    //   | "normal_evolutions"
    //   | "new_pokemon_evolutions"
    //   | "km_2_eggs"
    //   | "km_5_eggs"
    //   | "km_7_eggs"
    //   | "km_10_eggs"
    //   | "km_12_eggs"
    //   | "star_1_raids"
    //   | "star_3_raids"
    //   | "star_5_raids"
    //   | "mega_raids"
    //   | "shadow_raids"
    //   | "star_1_battles"
    //   | "star_2_battles"
    //   | "star_3_battles"
    //   | "star_4_battles"
    //   | "star_5_battles"
    //   | "star_6_battles"
    //   | "in_person_bonus"
    //   | "level_1_moves"
    //   | "level_2_moves"
    //   | "level_max_moves"
    //   | "good_friends"
    //   | "great_friends"
    //   | "ultra_friends"
    //   | "best_friends"
    //   | "target_days"
    // >,
    // star_{1 to 6}_battles was giving error for above
    field: keyof DetailedXPInputs,
    value: string
  ) => {
    // Allow empty string or valid numbers only
    if (value === "" || /^\d+$/.test(value)) {
      // If blocks for each field to handle edge cases
      // If the field is current_level and the value is greater than 50, cap it at 50
      if (field === "currentLevel" && value !== "") {
        if (parseInt(value) > GAME_CONSTANTS.MAX_LEVEL) {
          updateInput(field, GAME_CONSTANTS.MAX_LEVEL.toString());
        } else {
          updateInput(field, value);
        }
      }
      // If the field is current_xp and the value is greater than 100000000, cap it at 100000000
      else if (field === "currentXP" && value !== "") {
        if (parseInt(value) > GAME_CONSTANTS.MAX_XP) {
          updateInput(field, GAME_CONSTANTS.MAX_XP.toString());
        } else {
          updateInput(field, value);
        }
      }
      // If the field is target_level and the value is greater than 50, cap it at 50
      else if (field === "targetLevel" && value !== "") {
        if (parseInt(value) > GAME_CONSTANTS.MAX_LEVEL) {
          updateInput(field, GAME_CONSTANTS.MAX_LEVEL.toString());
        } else {
          updateInput(field, value);
        }
      }
      // If the field is one of the catching activities, check if the value is valid and within the constraints
      // -- To be implemented
      // else if (
      //   field === "normal_catches" ||
      //   field === "excellent_throws" ||
      //   field === "great_throws" ||
      //   field === "nice_throws"
      // ) {
      //   const normalCatches = parseInt(inputs.normal_catches) || 0;
      //   const excellentCatches = parseInt(inputs.excellent_throws) || 0;
      //   const greatCatches = parseInt(inputs.great_throws) || 0;
      //   const niceCatches = parseInt(inputs.nice_throws) || 0;

      //   if (field === "normal_catches") {
      //     if (parseInt(value) < excellentCatches + greatCatches + niceCatches) {
      //       updateInput(
      //         field,
      //         (excellentCatches + greatCatches + niceCatches).toString()
      //       );
      //     } else {
      //       updateInput(field, value);
      //     }
      //   } else {
      //     const totalCatches = excellentCatches + greatCatches + niceCatches;
      //     if (parseInt(value) > normalCatches - totalCatches) {
      //       updateInput(
      //         "normal_catches",
      //         (totalCatches + parseInt(value)).toString()
      //       );
      //       updateInput(field, value);
      //     } else {
      //       updateInput(field, value);
      //     }
      //   }
      // }
      // If the field is curve_balls or first_throws, check if the value is valid and within the constraints
      else if (
        field === "curve_balls" ||
        field === "first_throws" ||
        field === "new_pokemon_catches" ||
        field === "normal_catches" ||
        field === "nice_throws" ||
        field === "great_throws" ||
        field === "excellent_throws"
      ) {
        const normal_catches = parseInt(inputs.normal_catches) || 0;
        const curve_balls = parseInt(inputs.curve_balls) || 0;
        const first_throws = parseInt(inputs.first_throws) || 0;
        const excellent_throws = parseInt(inputs.excellent_throws) || 0;
        const great_throws = parseInt(inputs.great_throws) || 0;
        const nice_throws = parseInt(inputs.nice_throws) || 0;
        const new_pokemon_catches = parseInt(inputs.new_pokemon_catches) || 0;
        const int_value = parseInt(value) || 0;

        // if value is > 3000, set it to 3000
        if (int_value > GAME_CONSTANTS.MAX_CATCHES) {
          value = GAME_CONSTANTS.MAX_CATCHES.toString();
        }

        if (field === "normal_catches") {
          if (int_value < curve_balls) {
            updateInput("curve_balls", value);
          }
          if (int_value < first_throws) {
            updateInput("first_throws", value);
          }
          if (int_value < new_pokemon_catches) {
            updateInput("new_pokemon_catches", value);
          }
          if (int_value < excellent_throws) {
            updateInput("excellent_throws", value);
          }
          if (int_value < great_throws) {
            updateInput("great_throws", value);
          }
          if (int_value < nice_throws) {
            updateInput("nice_throws", value);
          }
          updateInput(field, value);

          if (int_value === 0) {
            updateInput("curve_balls", "");
            updateInput("first_throws", "");
            updateInput("new_pokemon_catches", "");
            updateInput("nice_throws", "");
            updateInput("great_throws", "");
            updateInput("excellent_throws", "");
          }
        } else if (field === "curve_balls") {
          if (int_value > normal_catches) {
            updateInput(field, normal_catches.toString());
          } else {
            updateInput(field, value);
          }
        } else if (field === "first_throws") {
          if (int_value > normal_catches) {
            updateInput(field, normal_catches.toString());
          } else {
            updateInput(field, value);
          }
        } else if (field === "new_pokemon_catches") {
          if (int_value > normal_catches) {
            updateInput(field, normal_catches.toString());
          } else {
            updateInput(field, value);
          }
        } else if (field === "nice_throws") {
          if (int_value > normal_catches) {
            updateInput(field, normal_catches.toString());
          } else {
            updateInput(field, value);
          }
        } else if (field === "great_throws") {
          if (int_value > normal_catches) {
            updateInput(field, normal_catches.toString());
          } else {
            updateInput(field, value);
          }
        } else if (field === "excellent_throws") {
          if (int_value > normal_catches) {
            updateInput(field, normal_catches.toString());
          } else {
            updateInput(field, value);
          }
        }
      }
      // -------- Evolution XP --------
      // New Pokemon Evolution count should be <= Normal Evolution count
      // Limit is 3000
      else if (
        field === "new_pokemon_evolutions" ||
        field === "normal_evolutions"
      ) {
        const normal_evolutions = parseInt(inputs.normal_evolutions) || 0;
        const new_pokemon_evolutions =
          parseInt(inputs.new_pokemon_evolutions) || 0;
        const int_value = parseInt(value) || 0;

        if (
          field === "normal_evolutions" &&
          int_value > GAME_CONSTANTS.MAX_EVOLUTIONS
        ) {
          updateInput(field, GAME_CONSTANTS.MAX_EVOLUTIONS.toString());
        }

        else if (field === "new_pokemon_evolutions") {
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
      // -------- Friendship XP --------
      // Limit is 450
      else if (field === "good_friends" || field === "great_friends" || field === "ultra_friends" || field === "best_friends") {
        const int_value = parseInt(value) || 0;
        if (int_value > GAME_CONSTANTS.MAX_FRIENDSHIP) {
          updateInput(field, GAME_CONSTANTS.MAX_FRIENDSHIP.toString());
        } else {
          updateInput(field, value);
        }
      } 
      // -------- Hatching XP --------
      // Limit is 300
      else if (field === "km_2_eggs" || field === "km_5_eggs" || field === "km_7_eggs" || field === "km_10_eggs" || field === "km_12_eggs") {
        const int_value = parseInt(value) || 0;
        if (int_value > GAME_CONSTANTS.MAX_HATCHES) {
          updateInput(field, GAME_CONSTANTS.MAX_HATCHES.toString());
        } else {
          updateInput(field, value);
        }
      } 
      // -------- Raid XP --------
      // Limit is 300
      else if (field === "star_1_raids" || field === "star_3_raids" || field === "star_5_raids" || field === "mega_raids" || field === "shadow_raids") {
        const int_value = parseInt(value) || 0;
        if (int_value > GAME_CONSTANTS.MAX_RAIDS) {
          updateInput(field, GAME_CONSTANTS.MAX_RAIDS.toString());
        } else {
          updateInput(field, value);
        }
      } 
      // -------- Max Battle XP --------
      // Limit is 300
      else if (field === "star_1_battles" || field === "star_2_battles" || field === "star_3_battles" || field === "star_4_battles" || field === "star_5_battles" || field === "star_6_battles" || field === "in_person_bonus") {
        const int_value = parseInt(value) || 0;
        if (int_value > GAME_CONSTANTS.MAX_MAX_BATTLES) {
          updateInput(field, GAME_CONSTANTS.MAX_MAX_BATTLES.toString());
        } else {
          updateInput(field, value);
        }
      } 
      // -------- Max Moves XP --------
      // Limit is 300
      else if (field === "level_1_moves" || field === "level_2_moves" || field === "level_max_moves") {
        const int_value = parseInt(value) || 0;
        if (int_value > GAME_CONSTANTS.MAX_MAX_MOVES) {
          updateInput(field, GAME_CONSTANTS.MAX_MAX_MOVES.toString());
        } else {
          updateInput(field, value);
        }
      } 
      else {
        updateInput(field, value);
      }
    }
  };

  const calculateTimeToTarget = () => {
    const progress = calculateLevelProgress();
    if (progress.targetReached) return { daysToTarget: 0 };

    // Only count daily activities for ongoing progress (friendship is one-time)
    const dailyXPEarned = progress.categoryXP.dailyXP;

    if (dailyXPEarned <= 0) return { daysToTarget: Infinity };

    const daysToTarget = Math.ceil(progress.xpRemaining / dailyXPEarned);
    return { daysToTarget };
  };

  const calculateDailyRequirements = () => {
    const progress = calculateLevelProgress();
    if (progress.targetReached || !inputs.use_target_timeline)
      return { daysNeeded: 0, dailyXPNeeded: 0 };

    let days = 0;
    if (inputs.target_type === "date") {
      const targetDate = new Date(inputs.target_date);
      const today = new Date();
      const timeDiff = targetDate.getTime() - today.getTime();
      days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    } else {
      const targetDays = Number.parseInt(inputs.target_days) || 0;
      days = targetDays;
    }

    if (days <= 0) return { daysNeeded: 0, dailyXPNeeded: 0 };

    const dailyXPNeeded = Math.ceil(progress.xpRemaining / days);
    return { daysNeeded: days, dailyXPNeeded };
  };

  // const updateInput = (
  //   field: keyof DetailedXPInputs,
  //   value: number | boolean | string
  // ) => {
  //   setInputs((prev) => ({ ...prev, [field]: value }));
  // };

  const progress = calculateLevelProgress();
  const dailyReq = calculateDailyRequirements();
  const timeToTarget = calculateTimeToTarget();

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
              Detailed XP Calculator
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground mt-1">
              Comprehensive XP calculation between levels
            </p>
          </div>
        </div>
        {/* If progress.categoryXP.total is greater than 1000000 then show it as M */}
        {/* <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-primary" />
          <div className="flex items-center gap-1">
            <span className="text-xs md:text-sm lg:text-base font-medium text-primary">
              
              {progress.categoryXP.total > 1000000
                ? (progress.categoryXP.total / 1000000).toFixed(1) + "M"
                : progress.categoryXP.total.toLocaleString()}
            </span>
            <span className="text-xs md:text-sm lg:text-base font-medium text-primary">
              XP
            </span>
          </div>
        </div> */}
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
                  type="text"
                  inputMode="numeric"
                  min="1"
                  max="50"
                  value={inputs.currentLevel}
                  onChange={(e) =>
                    handleNumberInput("currentLevel", e.target.value)
                  }
                  className="glass-card border-white/20 h-10"
                  placeholder="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentXP" className="text-sm font-medium">
                  Current XP in Level
                </Label>
                <Input
                  id="currentXP"
                  type="text"
                  inputMode="numeric"
                  min="0"
                  value={inputs.currentXP}
                  onChange={(e) =>
                    handleNumberInput("currentXP", e.target.value)
                  }
                  className="glass-card border-white/20 h-10"
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetLevel" className="text-sm font-medium">
                  Target Level
                </Label>
                <Input
                  id="targetLevel"
                  type="text"
                  inputMode="numeric"
                  min="1"
                  max="50"
                  value={inputs.targetLevel}
                  onChange={(e) =>
                    handleNumberInput("targetLevel", e.target.value)
                  }
                  className="glass-card border-white/20 h-10"
                  placeholder="50"
                />
              </div>
            </div>

            {/* Target Timeline Toggle */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 glass-card rounded-lg">
                <div className="space-y-1">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Set Target Timeline
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Calculate daily XP needed based on a target date/days
                  </p>
                </div>
                <Switch
                  checked={inputs.use_target_timeline}
                  onCheckedChange={(checked) =>
                    updateInput("use_target_timeline", checked)
                  }
                  className="data-[state=checked]:bg-primary"
                />
              </div>

              {inputs.use_target_timeline && (
                <>
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
                      onChange={(e) =>
                        updateInput("target_date", e.target.value)
                      }
                      className="glass-card border-white/20"
                    />
                  ) : (
                    <Input
                      type="text"
                      inputMode="numeric"
                      min="1"
                      value={inputs.target_days}
                      onChange={(e) =>
                        handleNumberInput("target_days", e.target.value)
                      }
                      className="glass-card border-white/20"
                      placeholder="Number of days"
                    />
                  )}
                </>
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
                      type="text"
                      inputMode="numeric"
                      min="0"
                      value={inputs.normal_catches}
                      onChange={(e) =>
                        handleNumberInput("normal_catches", e.target.value)
                      }
                      className="glass-card border-white/20"
                      placeholder="0"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.catching.normal} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>
                      {/* New Pokémon Catches */}
                      New Pokemon
                    </Label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      min="0"
                      value={inputs.new_pokemon_catches}
                      onChange={(e) =>
                        handleNumberInput("new_pokemon_catches", e.target.value)
                      }
                      className="glass-card border-white/20"
                      placeholder="0"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.catching.new_pokemon} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Excellent Throws</Label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      min="0"
                      value={inputs.excellent_throws}
                      onChange={(e) =>
                        handleNumberInput("excellent_throws", e.target.value)
                      }
                      className="glass-card border-white/20"
                      placeholder="0"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.catching.excellent_throw} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Great Throws</Label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      min="0"
                      value={inputs.great_throws}
                      onChange={(e) =>
                        handleNumberInput("great_throws", e.target.value)
                      }
                      className="glass-card border-white/20"
                      placeholder="0"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.catching.great_throw} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Nice Throws</Label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      min="0"
                      value={inputs.nice_throws}
                      onChange={(e) =>
                        handleNumberInput("nice_throws", e.target.value)
                      }
                      className="glass-card border-white/20"
                      placeholder="0"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.catching.nice_throw} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Curve Balls</Label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      min="0"
                      value={inputs.curve_balls}
                      onChange={(e) =>
                        handleNumberInput("curve_balls", e.target.value)
                      }
                      className="glass-card border-white/20"
                      placeholder="0"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.catching.curve_ball} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>First Throws</Label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      min="0"
                      value={inputs.first_throws}
                      onChange={(e) =>
                        handleNumberInput("first_throws", e.target.value)
                      }
                      className="glass-card border-white/20"
                      placeholder="0"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.catching.first_throw} XP each
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
                      type="text"
                      inputMode="numeric"
                      min="0"
                      value={inputs.normal_evolutions}
                      onChange={(e) =>
                        handleNumberInput("normal_evolutions", e.target.value)
                      }
                      className="glass-card border-white/20"
                      placeholder="0"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.evolution.normal} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>New Poke Evolutions</Label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      min="0"
                      value={inputs.new_pokemon_evolutions}
                      onChange={(e) =>
                        handleNumberInput(
                          "new_pokemon_evolutions",
                          e.target.value
                        )
                      }
                      className="glass-card border-white/20"
                      placeholder="0"
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
                      type="text"
                      inputMode="numeric"
                      min="0"
                      value={inputs.km_2_eggs}
                      onChange={(e) =>
                        handleNumberInput("km_2_eggs", e.target.value)
                      }
                      className="glass-card border-white/20"
                      placeholder="0"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.hatching.km_2} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>5km Eggs</Label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      min="0"
                      value={inputs.km_5_eggs}
                      onChange={(e) =>
                        handleNumberInput("km_5_eggs", e.target.value)
                      }
                      className="glass-card border-white/20"
                      placeholder="0"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.hatching.km_5} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>7km Eggs</Label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      min="0"
                      value={inputs.km_7_eggs}
                      onChange={(e) =>
                        handleNumberInput("km_7_eggs", e.target.value)
                      }
                      className="glass-card border-white/20"
                      placeholder="0"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.hatching.km_7} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>10km Eggs</Label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      min="0"
                      value={inputs.km_10_eggs}
                      onChange={(e) =>
                        handleNumberInput("km_10_eggs", e.target.value)
                      }
                      className="glass-card border-white/20"
                      placeholder="0"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.hatching.km_10} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>12km Eggs</Label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      min="0"
                      value={inputs.km_12_eggs}
                      onChange={(e) =>
                        handleNumberInput("km_12_eggs", e.target.value)
                      }
                      className="glass-card border-white/20"
                      placeholder="0"
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
                      type="text"
                      inputMode="numeric"
                      min="0"
                      value={inputs.star_1_raids}
                      onChange={(e) =>
                        handleNumberInput("star_1_raids", e.target.value)
                      }
                      className="glass-card border-white/20"
                      placeholder="0"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.raids.star_1} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>3-Star Raids</Label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      min="0"
                      value={inputs.star_3_raids}
                      onChange={(e) =>
                        handleNumberInput("star_3_raids", e.target.value)
                      }
                      className="glass-card border-white/20"
                      placeholder="0"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.raids.star_3} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>5-Star Raids</Label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      min="0"
                      value={inputs.star_5_raids}
                      onChange={(e) =>
                        handleNumberInput("star_5_raids", e.target.value)
                      }
                      className="glass-card border-white/20"
                      placeholder="0"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.raids.star_5} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Mega Raids</Label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      min="0"
                      value={inputs.mega_raids}
                      onChange={(e) =>
                        handleNumberInput("mega_raids", e.target.value)
                      }
                      className="glass-card border-white/20"
                      placeholder="0"
                    />
                    <p className="text-xs text-muted-foreground">
                      +{XP_MULTIPLIERS.raids.mega} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Shadow Raids</Label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      min="0"
                      value={inputs.shadow_raids}
                      onChange={(e) =>
                        handleNumberInput("shadow_raids", e.target.value)
                      }
                      className="glass-card border-white/20"
                      placeholder="0"
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
                        type="text"
                        inputMode="numeric"
                        min="0"
                        value={
                          inputs[
                            `star_${star}_battles` as keyof DetailedXPInputs
                          ] as string
                        }
                        onChange={(e) => {
                          let field =
                            `star_${star}_battles` as keyof DetailedXPInputs;
                          handleNumberInput(field, e.target.value);
                        }}
                        className="glass-card border-white/20"
                        placeholder="0"
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
                      type="text"
                      inputMode="numeric"
                      min="0"
                      value={inputs.in_person_bonus}
                      onChange={(e) =>
                        handleNumberInput("in_person_bonus", e.target.value)
                      }
                      className="glass-card border-white/20"
                      placeholder="0"
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
                      +{XP_MULTIPLIERS.maxMoves.level_1} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Level 2 Moves</Label>
                    <Input
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
                      +{XP_MULTIPLIERS.maxMoves.level_2} XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Level Max Moves</Label>
                    <Input
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
                      +{XP_MULTIPLIERS.maxMoves.level_max} XP each
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
                      +{XP_MULTIPLIERS.friendship.good_friends.toLocaleString()}{" "}
                      XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Great Friends</Label>
                    <Input
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
                      +
                      {XP_MULTIPLIERS.friendship.great_friends.toLocaleString()}{" "}
                      XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Ultra Friends</Label>
                    <Input
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
                      +
                      {XP_MULTIPLIERS.friendship.ultra_friends.toLocaleString()}{" "}
                      XP each
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Best Friends</Label>
                    <Input
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
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Activity className="w-4 h-4" />
                        Time at current pace:
                      </p>
                      <p className="text-xl font-semibold text-blue-500">
                        {timeToTarget.daysToTarget === Infinity
                          ? "Never (no daily XP)"
                          : timeToTarget.daysToTarget === 0
                          ? "Already reached!"
                          : timeToTarget.daysToTarget === 1
                          ? "1 day"
                          : `${timeToTarget.daysToTarget} days`}
                      </p>
                    </div>
                  </div>

                  {inputs.use_target_timeline && dailyReq.daysNeeded > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Daily XP needed for target:
                      </p>
                      <p className="text-xl font-semibold text-red-500">
                        {dailyReq.dailyXPNeeded.toLocaleString()} XP/day
                      </p>
                    </div>
                  )}

                  {/* Timeline Analysis */}
                  <div className="space-y-4">
                    {/* Current Pace Analysis */}
                    <div className="p-4 glass-card rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-blue-500">
                          Current Pace Analysis
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {progress.categoryXP.dailyXP > 0 ? (
                          <>
                            Based on your daily activities, you're earning{" "}
                            {progress.categoryXP.dailyXP.toLocaleString()} XP
                            per day
                            {inputs.lucky_egg && " (with Lucky Egg)"}. At this
                            pace, you'll reach level {inputs.targetLevel} in{" "}
                            {timeToTarget.daysToTarget} days.
                            {progress.categoryXP.friendship > 0 &&
                              " This includes your one-time friendship XP bonus."}
                          </>
                        ) : (
                          "You haven't entered any daily activities yet. Add some activities to see how long it will take to reach your target level."
                        )}
                      </p>
                    </div>

                    {/* Target Timeline Analysis */}
                    {inputs.use_target_timeline && dailyReq.daysNeeded > 0 && (
                      <div className="p-4 glass-card rounded-lg border border-red-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-red-500" />
                          <span className="font-medium text-red-500">
                            Target Timeline Analysis
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          To reach level {inputs.targetLevel} in{" "}
                          {dailyReq.daysNeeded} days, you need{" "}
                          {dailyReq.dailyXPNeeded.toLocaleString()} XP per day
                          from daily activities
                          {inputs.lucky_egg && " (with Lucky Egg active)"}.
                          {progress.categoryXP.dailyXP > 0 && (
                            <>
                              {" "}
                              Currently you're earning{" "}
                              {progress.categoryXP.dailyXP.toLocaleString()}{" "}
                              XP/day, so you need{" "}
                              {Math.max(
                                0,
                                dailyReq.dailyXPNeeded -
                                  progress.categoryXP.dailyXP
                              ).toLocaleString()}{" "}
                              more XP per day.
                            </>
                          )}
                          {progress.categoryXP.friendship > 0 &&
                            " Friendship XP is counted as a one-time bonus."}
                        </p>
                      </div>
                    )}
                  </div>
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
