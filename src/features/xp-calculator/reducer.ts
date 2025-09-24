import { CalculationResult } from '../../types/calculation-result';
import { XPCalculatorAction } from './types/actions';
import { initialInputs } from './constants';

export interface XPCalculatorState {
  inputs: typeof initialInputs;
  result: CalculationResult | null;
  isLoading: boolean;
}

const initialState: XPCalculatorState = {
  inputs: initialInputs,
  result: null,
  isLoading: false,
};

export function xpCalculatorReducer(
  state: XPCalculatorState = initialState,
  action: XPCalculatorAction
): XPCalculatorState {
  switch (action.type) {
    case 'UPDATE_INPUTS': {
      const { section, field, value } = action.payload;
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [section]: {
            ...(state.inputs[section] as object),
            [field]: value,
          },
        },
      };
    }

    case 'UPDATE_LEVELS': {
      const { field, value } = action.payload;
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [field]: value,
        },
      };
    }

    case 'TOGGLE_LUCKY_EGG':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          lucky_egg: action.payload,
        },
      };

    case 'SET_RESULT':
      return {
        ...state,
        result: action.payload,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'RESET':
      return {
        ...initialState,
        inputs: { ...initialInputs },
      };

    default:
      return state;
  }
}
