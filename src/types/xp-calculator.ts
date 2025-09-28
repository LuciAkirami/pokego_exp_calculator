// XP Calculator Types

export type TargetType = "date" | "days";

// Base interface with common fields
export interface BaseXPInputs {
  currentLevel: number;
  currentXP: number;
  targetLevel: number;
  lucky_egg: boolean;
  use_target_timeline: boolean;
  target_type: TargetType;
  target_date: string;
  target_days: number;
}

// Catching related types
export interface CatchingInputs {
  normal_catches: number;
  new_pokemon_catches: number;
  excellent_throws: number;
  curve_balls: number;
  first_throws: number;
  great_throws: number;
  nice_throws: number;
  xp_celebration: number;
}

// Evolution related types
export interface EvolutionInputs {
  normal_evolutions: number;
  new_pokemon_evolutions: number;
}

// Hatching related types
export interface HatchingInputs {
  km_2_eggs: number;
  km_5_eggs: number;
  km_7_eggs: number;
  km_10_eggs: number;
  km_12_eggs: number;
}

// Raid related types
export interface RaidInputs {
  star_1_raids: number;
  star_3_raids: number;
  star_5_raids: number;
  mega_raids: number;
  shadow_raids: number;
}

// Max Battle related types
export interface MaxBattleInputs {
  star_1_battles: number;
  star_2_battles: number;
  star_3_battles: number;
  star_4_battles: number;
  star_5_battles: number;
  star_6_battles: number;
  in_person_bonus: number;
}

// Max Moves related types
export interface MaxMovesInputs {
  level_1_moves: number;
  level_2_moves: number;
  level_max_moves: number;
}

// Friendship related types
export interface FriendshipInputs {
  good_friends: number;
  great_friends: number;
  ultra_friends: number;
  best_friends: number;
}

// Main detailed XP inputs that combines all categories
export interface DetailedXPInputs extends 
  BaseXPInputs, 
  CatchingInputs, 
  EvolutionInputs, 
  HatchingInputs, 
  RaidInputs, 
  MaxBattleInputs, 
  MaxMovesInputs, 
  FriendshipInputs {}

export interface CategoryXP {
  catching: number;
  evolution: number;
  hatching: number;
  raids: number;
  maxBattle: number;
  maxMoves: number;
  friendship: number;
  total: number;
  dailyXP: number;
}

export interface LevelProgress {
  currentTotalXP: number;
  newTotalXP: number;
  xpNeeded: number;
  xpRemaining: number;
  targetReached: boolean;
  reachedLevel: number;
  categoryXP: CategoryXP;
}

export interface TimeToTarget {
  daysToTarget: number;
}

export interface DailyRequirements {
  daysNeeded: number;
  dailyXPNeeded: number;
}

export interface DetailedXPCalculatorProps {
  onBack: () => void;
}

// Helper types for individual calculators
export interface CatchXPCalculatorProps {
  inputs: CatchingInputs;
  onUpdate: (updates: Partial<CatchingInputs>) => void;
}

export interface EvolutionXPCalculatorProps {
  inputs: EvolutionInputs;
  onUpdate: (updates: Partial<EvolutionInputs>) => void;
}

export interface HatchingXPCalculatorProps {
  inputs: HatchingInputs;
  onUpdate: (updates: Partial<HatchingInputs>) => void;
}

export interface RaidXPCalculatorProps {
  inputs: RaidInputs;
  onUpdate: (updates: Partial<RaidInputs>) => void;
}

export interface MaxBattleXPCalculatorProps {
  inputs: MaxBattleInputs;
  onUpdate: (updates: Partial<MaxBattleInputs>) => void;
}

export interface MaxMovesXPCalculatorProps {
  inputs: MaxMovesInputs;
  onUpdate: (updates: Partial<MaxMovesInputs>) => void;
}

export interface FriendshipXPCalculatorProps {
  inputs: FriendshipInputs;
  onUpdate: (updates: Partial<FriendshipInputs>) => void;
}
