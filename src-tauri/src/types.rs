use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Serialize, Deserialize)]
pub struct XPValues {
    pub catching: CatchingXP,
    pub evolution: EvolutionXP,
    pub hatching: HatchingXP,
    pub raids: RaidsXP,
    pub max_battle: MaxBattleXP,
    pub max_moves: MaxMovesXP,
    pub friendship: FriendshipXP,
    pub other: OtherXP,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CatchingXP {
    pub normal: u32,
    pub new_pokemon: u32,
    pub excellent_throw: u32,
    pub curve_ball: u32,
    pub first_throw: u32,
    pub great_throw: u32,
    pub nice_throw: u32,
    pub event_bonus: u32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct EvolutionXP {
    pub normal: u32,
    pub new_pokemon: u32,
    pub event_bonus: u32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct HatchingXP {
    pub two_km: u32,
    pub five_km: u32,
    pub seven_km: u32,
    pub ten_km: u32,
    pub twelve_km: u32,
    pub event_bonus: u32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RaidsXP {
    pub one_star: u32,
    pub three_star: u32,
    pub five_star: u32,
    pub mega: u32,
    pub legendary_or_mega: u32,
    pub legendary_and_mega: u32,
    pub shadow: u32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct MaxBattleXP {
    pub one_star: u32,
    pub two_star: u32,
    pub three_star: u32,
    pub four_star: u32,
    pub five_star: u32,
    pub six_star: u32,
    pub in_person_bonus: u32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct MaxMovesXP {
    pub level_1: u32,
    pub level_2: u32,
    pub level_max: u32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FriendshipXP {
    pub good_friends: u32,
    pub great_friends: u32,
    pub ultra_friends: u32,
    pub best_friends: u32,
    pub gift_sent: u32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct OtherXP {
    pub research_breakthrough: u32,
    pub field_research: u32,
    pub special_research: u32,
    pub gym_battles: u32,
    pub pvp_battles: u32,
    pub trading: u32,
    pub photobomb: u32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct XPInputs {
    pub catching: CatchingInputs,
    pub evolution: EvolutionInputs,
    pub hatching: HatchingInputs,
    pub raids: RaidsInputs,
    pub max_battle: MaxBattleInputs,
    pub max_moves: MaxMovesInputs,
    pub friendship: FriendshipInputs,
    pub other: OtherInputs,
    pub lucky_egg: bool,
    pub current_level: u32,
    pub target_level: u32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CatchingInputs {
    pub normal_catches: u32,
    pub new_pokemon_catches: u32,
    pub excellent_throws: u32,
    pub curve_balls: u32,
    pub first_throws: u32,
    pub great_throws: u32,
    pub nice_throws: u32,
    pub xp_celebration: u32,
    pub event_bonus: u32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct EvolutionInputs {
    pub normal_evolutions: u32,
    pub new_pokemon_evolutions: u32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct HatchingInputs {
    pub two_km_eggs: u32,
    pub five_km_eggs: u32,
    pub seven_km_eggs: u32,
    pub ten_km_eggs: u32,
    pub twelve_km_eggs: u32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RaidsInputs {
    pub one_star_raids: u32,
    pub three_star_raids: u32,
    pub five_star_raids: u32,
    pub mega_raids: u32,
    pub shadow_raids: u32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct MaxBattleInputs {
    pub one_star_battles: u32,
    pub two_star_battles: u32,
    pub three_star_battles: u32,
    pub four_star_battles: u32,
    pub five_star_battles: u32,
    pub six_star_battles: u32,
    pub in_person_bonus_battles: u32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct MaxMovesInputs {
    pub level_1_moves: u32,
    pub level_2_moves: u32,
    pub level_max_moves: u32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FriendshipInputs {
    pub good_friends: u32,
    pub great_friends: u32,
    pub ultra_friends: u32,
    pub best_friends: u32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct OtherInputs {
    pub research_breakthroughs: u32,
    pub field_research: u32,
    pub special_research: u32,
    pub gym_battles: u32,
    pub pvp_battles: u32,
    pub trades: u32,
    pub photobombs: u32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CalculationResult {
    pub total_xp: u64,
    pub xp_breakdown: HashMap<String, u64>,
    pub xp_needed: u64,
    pub xp_remaining: i64,
    pub days_needed: u64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct XpToLevel50Response {
    pub xp_per_day: u64,
    pub days_remaining: i64,
    pub xp_needed: u64,
}
