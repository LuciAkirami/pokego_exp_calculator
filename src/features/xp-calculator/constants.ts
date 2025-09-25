import { XPInputs } from '../../types/xp-inputs';

export const initialInputs: XPInputs = {
  catching: {
    normal_catches: 0,
    new_pokemon_catches: 0,
    excellent_throws: 0,
    curve_balls: 0,
    first_throws: 0,
    great_throws: 0,
    nice_throws: 0,
    xp_celebration: 1,
    event_bonus: 1
  },
  evolution: {
    normal_evolutions: 0,
    new_pokemon_evolutions: 0,
  },
  hatching: {
    two_km_eggs: 0,
    five_km_eggs: 0,
    seven_km_eggs: 0,
    ten_km_eggs: 0,
    twelve_km_eggs: 0,
  },
  raids: {
    one_star_raids: 0,
    three_star_raids: 0,
    five_star_raids: 0,
    mega_raids: 0,
    shadow_raids: 0,
  },
  max_battle: {
    one_star_battles: 0,
    two_star_battles: 0,
    three_star_battles: 0,
    four_star_battles: 0,
    five_star_battles: 0,
    six_star_battles: 0,
    in_person_bonus_battles: 0,
  },
  max_moves: {
    level_1_moves: 0,
    level_2_moves: 0,
    level_max_moves: 0,
  },
  friendship: {
    good_friends: 0,
    great_friends: 0,
    ultra_friends: 0,
    best_friends: 0,
  },
  other: {
    research_breakthroughs: 0,
    field_research: 0,
    special_research: 0,
    gym_battles: 0,
    pvp_battles: 0,
    trades: 0,
    photobombs: 0,
  },
  lucky_egg: false,
  current_level: 1,
  target_level: 2,
};
