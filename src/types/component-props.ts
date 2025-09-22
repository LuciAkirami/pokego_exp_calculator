import type { CalculationResult } from './calculation-result.js';
import type { CatchingInputs, EvolutionInputs, HatchingInputs, RaidInputs, FriendshipInputs, OtherActivitiesInputs } from './xp-inputs.js';

// Base input change handler type
export type InputChangeHandler<T> = (field: keyof T, value: T[keyof T]) => void;

// Level calculator card props
export interface LevelCalculatorCardProps {
  currentLevel: number;
  targetLevel: number;
  onLevelChange: (field: 'current_level' | 'target_level', value: number) => void;
}

// Level 50 calculator card props
export interface Level50CalculatorCardProps {
  currentLevel: number;
  onLevelChange: (field: 'current_level' | 'target_level', value: number) => void;
}

// Activity card props
export interface ActivityCardProps<T> {
  inputs: T;
  onInputChange: (field: keyof T, value: T[keyof T]) => void;
}

// Specific activity card props
export type CatchingPokemonCardProps = ActivityCardProps<CatchingInputs>;
export type EvolutionCardProps = ActivityCardProps<EvolutionInputs>;
export type HatchingEggsCardProps = ActivityCardProps<HatchingInputs>;
export type RaidsCardProps = ActivityCardProps<RaidInputs>;
export type FriendshipCardProps = ActivityCardProps<FriendshipInputs>;
export type OtherActivitiesCardProps = ActivityCardProps<OtherActivitiesInputs>;

// Total experience card props
export interface TotalExperienceCardProps {
  result: CalculationResult | null;
  isCalculating: boolean;
  onRecalculate: () => void;
  onReset: () => void;
  isDetailedView: boolean;
  onSave?: () => void;
  onLoad?: () => void;
}

// Lucky egg toggle props
export interface LuckyEggToggleProps {
  isActive: boolean;
  onToggle: (checked: boolean) => void;
}

// Navigation props
export interface NavigationProps {
  onNavigate: (page: string) => void;
  currentPage?: string;
}

// Home page props
export interface HomePageProps extends Pick<NavigationProps, 'onNavigate'> {}

// Header props
export interface HeaderProps {
  title?: string;
  description?: string;
}
