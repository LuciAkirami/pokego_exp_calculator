use crate::types::*;
use std::collections::HashMap;

pub fn get_xp_values() -> XPValues {
    XPValues {
        catching: CatchingXP {
            normal: 100,
            new_pokemon: 1000,
            excellent_throw: 1000,
            curve_ball: 20,
            first_throw: 50,
            great_throw: 100,
            nice_throw: 20,
            event_bonus: 1,
        },
        evolution: EvolutionXP {
            normal: 1000,
            new_pokemon: 1000,
            event_bonus: 1,
        },
        hatching: HatchingXP {
            two_km: 500,
            five_km: 1000,
            seven_km: 1000,
            ten_km: 2000,
            twelve_km: 4000,
            event_bonus: 1,
        },
        raids: RaidsXP {
            one_star: 3500,
            three_star: 5000,
            five_star: 10000,
            mega: 10000,
            legendary_or_mega: 10000,
            legendary_and_mega: 12000,
            shadow: 10000,
        },
        max_battle: MaxBattleXP {
            one_star: 5000,
            two_star: 6000,
            three_star: 7500,
            four_star: 10000,
            five_star: 15000,
            six_star: 25000,
            in_person_bonus: 10000,
        },
        max_moves: MaxMovesXP {
            level_1: 4000,
            level_2: 6000,
            level_max: 8000,
        },
        friendship: FriendshipXP {
            good_friends: 3000,
            great_friends: 10000,
            ultra_friends: 50000,
            best_friends: 100000,
            gift_sent: 200,
        },
        other: OtherXP {
            research_breakthrough: 2000,
            field_research: 100,
            special_research: 1000,
            gym_battles: 50,
            pvp_battles: 100,
            trading: 100,
            photobomb: 100,
        },
    }
}

pub fn get_level_xp_requirements() -> HashMap<u32, u64> {
    let mut requirements = HashMap::new();
    requirements.insert(1, 0);
    requirements.insert(2, 1000);
    requirements.insert(3, 3000);
    requirements.insert(4, 6000);
    requirements.insert(5, 10000);
    requirements.insert(6, 15000);
    requirements.insert(7, 21000);
    requirements.insert(8, 28000);
    requirements.insert(9, 36000);
    requirements.insert(10, 45000);
    requirements.insert(11, 55000);
    requirements.insert(12, 65000);
    requirements.insert(13, 75000);
    requirements.insert(14, 85000);
    requirements.insert(15, 100000);
    requirements.insert(16, 120000);
    requirements.insert(17, 140000);
    requirements.insert(18, 160000);
    requirements.insert(19, 185000);
    requirements.insert(20, 210000);
    requirements.insert(21, 260000);
    requirements.insert(22, 335000);
    requirements.insert(23, 435000);
    requirements.insert(24, 560000);
    requirements.insert(25, 710000);
    requirements.insert(26, 900000);
    requirements.insert(27, 1100000);
    requirements.insert(28, 1350000);
    requirements.insert(29, 1650000);
    requirements.insert(30, 2000000);
    requirements.insert(31, 2500000);
    requirements.insert(32, 3000000);
    requirements.insert(33, 3750000);
    requirements.insert(34, 4750000);
    requirements.insert(35, 6000000);
    requirements.insert(36, 7500000);
    requirements.insert(37, 9500000);
    requirements.insert(38, 12000000);
    requirements.insert(39, 15000000);
    requirements.insert(40, 20000000);
    requirements.insert(41, 26000000);
    requirements.insert(42, 33500000);
    requirements.insert(43, 42500000);
    requirements.insert(44, 53500000);
    requirements.insert(45, 66500000);
    requirements.insert(46, 82000000);
    requirements.insert(47, 100000000);
    requirements.insert(48, 121000000);
    requirements.insert(49, 146000000);
    requirements.insert(50, 176000000);
    requirements
}

pub fn calculate_total_xp(inputs: XPInputs) -> CalculationResult {
    let xp_values = get_xp_values();
    let level_requirements = get_level_xp_requirements();
    let mut xp_breakdown = HashMap::new();
    let mut total_xp = 0u64;

    // Catching XP
    let catching_xp = (inputs.catching.normal_catches as u64 * xp_values.catching.normal as u64)
        + (inputs.catching.new_pokemon_catches as u64 * xp_values.catching.new_pokemon as u64)
        + (inputs.catching.curve_balls as u64 * xp_values.catching.curve_ball as u64)
        + (inputs.catching.first_throws as u64 * xp_values.catching.first_throw as u64)
        + ((inputs.catching.nice_throws as u64 * xp_values.catching.nice_throw as u64)
            + (inputs.catching.great_throws as u64 * xp_values.catching.great_throw as u64)
            + (inputs.catching.excellent_throws as u64
                * xp_values.catching.excellent_throw as u64)
                * inputs.catching.xp_celebration as u64); // Multiple Nice, Great & Excellent by 2

    xp_breakdown.insert("Catching".to_string(), catching_xp);
    total_xp += catching_xp;

    // Evolution XP
    let evolution_xp = (inputs.evolution.normal_evolutions as u64
        * xp_values.evolution.normal as u64)
        + (inputs.evolution.new_pokemon_evolutions as u64 * xp_values.evolution.new_pokemon as u64);

    xp_breakdown.insert("Evolution".to_string(), evolution_xp);
    total_xp += evolution_xp;

    // Hatching XP
    let hatching_xp = (inputs.hatching.two_km_eggs as u64 * xp_values.hatching.two_km as u64)
        + (inputs.hatching.five_km_eggs as u64 * xp_values.hatching.five_km as u64)
        + (inputs.hatching.seven_km_eggs as u64 * xp_values.hatching.seven_km as u64)
        + (inputs.hatching.ten_km_eggs as u64 * xp_values.hatching.ten_km as u64)
        + (inputs.hatching.twelve_km_eggs as u64 * xp_values.hatching.twelve_km as u64);

    xp_breakdown.insert("Hatching".to_string(), hatching_xp);
    total_xp += hatching_xp;

    // Raids XP
    let raids_xp = (inputs.raids.one_star_raids as u64 * xp_values.raids.one_star as u64)
        + (inputs.raids.three_star_raids as u64 * xp_values.raids.three_star as u64)
        + (inputs.raids.five_star_raids as u64 * xp_values.raids.five_star as u64)
        + (inputs.raids.mega_raids as u64 * xp_values.raids.mega as u64)
        + (inputs.raids.shadow_raids as u64 * xp_values.raids.shadow as u64);

    xp_breakdown.insert("Raids".to_string(), raids_xp);
    total_xp += raids_xp;

    // Friendship XP
    let friendship_xp = (inputs.friendship.good_friends as u64
        * xp_values.friendship.good_friends as u64)
        + (inputs.friendship.great_friends as u64 * xp_values.friendship.great_friends as u64)
        + (inputs.friendship.ultra_friends as u64 * xp_values.friendship.ultra_friends as u64)
        + (inputs.friendship.best_friends as u64 * xp_values.friendship.best_friends as u64);

    xp_breakdown.insert("Friendship".to_string(), friendship_xp);
    total_xp += friendship_xp;

    // Other XP
    let other_xp = (inputs.other.research_breakthroughs as u64
        * xp_values.other.research_breakthrough as u64)
        + (inputs.other.field_research as u64 * xp_values.other.field_research as u64)
        + (inputs.other.special_research as u64 * xp_values.other.special_research as u64)
        + (inputs.other.gym_battles as u64 * xp_values.other.gym_battles as u64)
        + (inputs.other.pvp_battles as u64 * xp_values.other.pvp_battles as u64)
        + (inputs.other.trades as u64 * xp_values.other.trading as u64)
        + (inputs.other.photobombs as u64 * xp_values.other.photobomb as u64);

    xp_breakdown.insert("Other Activities".to_string(), other_xp);
    total_xp += other_xp;

    // Apply Lucky Egg bonus
    if inputs.lucky_egg {
        total_xp *= 2;
        for (_, value) in xp_breakdown.iter_mut() {
            *value *= 2;
        }
    }

    // Calculate XP needed for target level
    let current_xp = level_requirements.get(&inputs.current_level).unwrap_or(&0);
    let target_xp = level_requirements.get(&inputs.target_level).unwrap_or(&0);
    let xp_needed;
    // If Current Level less than Target Level
    if current_xp < target_xp {
        xp_needed = target_xp - current_xp;
    } else {
        // If Current Level > Target Level, then target already reached, so xp_needed=0
        xp_needed = 0 as u64;
    }
    // let xp_needed = *target_xp;
    let xp_remaining = xp_needed as i64 - total_xp as i64;

    CalculationResult {
        total_xp,
        xp_breakdown,
        xp_needed,
        xp_remaining,
    }
}
