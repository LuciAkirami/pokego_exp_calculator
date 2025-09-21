mod functions;
mod types;

use std::collections::HashMap;
use types::*;

#[tauri::command]
fn get_xp_values() -> XPValues {
    functions::get_xp_values()
}

#[tauri::command]
fn calculate_total_xp(inputs: XPInputs) -> CalculationResult {
    functions::calculate_total_xp(inputs)
}

#[tauri::command]
fn get_level_requirements() -> HashMap<u32, u64> {
    functions::get_level_xp_requirements()
}

#[tauri::command]
fn calculate_xp_to_level_50(current_level: u32, current_xp: u32, days_remaining: i64) -> XpToLevel50Response {
    functions::calculate_xp_to_level_50(current_level, current_xp, days_remaining)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            calculate_total_xp,
            get_xp_values,
            get_level_requirements,
            calculate_xp_to_level_50,
            // save_progress,
            // load_progress
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
