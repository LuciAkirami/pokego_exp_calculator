import { useCallback, useReducer } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { xpCalculatorReducer } from './reducer';
import { initialInputs } from './constants';
import { XPInputs } from '../../types/xp-inputs';
import { CalculationResult } from '../../types/calculation-result';

export function useXPCalculator() {
  const [state, dispatch] = useReducer(xpCalculatorReducer, {
    inputs: initialInputs,
    result: null,
    isLoading: false,
  });

  const updateInputs = useCallback((
    section: keyof Omit<XPInputs, 'current_level' | 'target_level' | 'lucky_egg'>,
    field: string,
    value: number | boolean
  ) => {
    dispatch({ 
      type: 'UPDATE_INPUTS', 
      payload: { section, field, value } 
    });
  }, []);

  const updateLevels = useCallback((
    field: 'current_level' | 'target_level', 
    value: number
  ) => {
    dispatch({ 
      type: 'UPDATE_LEVELS', 
      payload: { field, value } 
    });
  }, []);

  const toggleLuckyEgg = useCallback((checked: boolean) => {
    dispatch({ 
      type: 'TOGGLE_LUCKY_EGG', 
      payload: checked 
    });
  }, []);

  const resetInputs = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const calculateXP = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const result = await invoke<CalculationResult>("calculate_total_xp", { 
        inputs: state.inputs 
      });
      dispatch({ 
        type: 'SET_RESULT', 
        payload: result 
      });
      return result;
    } catch (error) {
      console.error("Error calculating XP:", error);
      dispatch({ 
        type: 'SET_RESULT', 
        payload: null 
      });
      throw error;
    } finally {
      dispatch({ 
        type: 'SET_LOADING', 
        payload: false 
      });
    }
  }, [state.inputs]);

  return {
    inputs: state.inputs,
    result: state.result,
    isCalculating: state.isLoading,
    updateInputs,
    updateLevels,
    toggleLuckyEgg,
    resetInputs,
    calculateXP,
  };
}

export default useXPCalculator;
