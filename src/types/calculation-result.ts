// Types for calculation results

export interface CalculationResult {
  total_xp: number;
  xp_breakdown: Record<string, number>;
  xp_needed: number;
  xp_remaining: number;
  days_needed: number;
}

// Type for the XP calculation response from the Rust backend
export interface XPCalculationResponse {
  xp_per_day: number;
  days_remaining: number;
  xp_needed: number;
}
