// Types for XP calculation inputs

export interface CatchingInputs {
  normal_catches: number;
  new_pokemon_catches: number;
  excellent_throws: number;
  curve_balls: number;
  first_throws: number;
  great_throws: number;
  nice_throws: number;
  xp_celebration: number;
  event_bonus: number;
}

export interface EvolutionInputs {
  normal_evolutions: number;
  new_pokemon_evolutions: number;
}

export interface HatchingInputs {
  two_km_eggs: number;
  five_km_eggs: number;
  seven_km_eggs: number;
  ten_km_eggs: number;
  twelve_km_eggs: number;
}

export interface RaidInputs {
  one_star_raids: number;
  three_star_raids: number;
  five_star_raids: number;
  mega_raids: number;
  shadow_raids: number;
}

export interface FriendshipInputs {
  good_friends: number;
  great_friends: number;
  ultra_friends: number;
  best_friends: number;
}

export interface OtherActivitiesInputs {
  research_breakthroughs: number;
  field_research: number;
  special_research: number;
  gym_battles: number;
  pvp_battles: number;
  trades: number;
  photobombs: number;
}

export interface XPInputs {
  catching: CatchingInputs;
  evolution: EvolutionInputs;
  hatching: HatchingInputs;
  raids: RaidInputs;
  friendship: FriendshipInputs;
  other: OtherActivitiesInputs;
  lucky_egg: boolean;
  current_level: number;
  target_level: number;
}
