import { XPInputs } from '../../../types/xp-inputs';
import { CalculationResult } from '../../../types/calculation-result';

export type XPCalculatorAction =
  | { 
      type: 'UPDATE_INPUTS'; 
      payload: {
        section: keyof Omit<XPInputs, 'current_level' | 'target_level' | 'lucky_egg'>;
        field: string;
        value: number | boolean;
      };
    }
  | { 
      type: 'UPDATE_LEVELS'; 
      payload: {
        field: 'current_level' | 'target_level';
        value: number;
      };
    }
  | { 
      type: 'TOGGLE_LUCKY_EGG'; 
      payload: boolean;
    }
  | { 
      type: 'SET_RESULT'; 
      payload: CalculationResult | null;
    }
  | { 
      type: 'SET_LOADING'; 
      payload: boolean;
    }
  | { 
      type: 'RESET';
    };
