import { useState, useEffect, useCallback } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import Header from "./components/Header";
import SimpleLevelCalculatorCard from "./components/SimpleLevelCalculatorCard";
import CatchingPokemonCard from "./components/CatchingPokemonCard";
import EvolutionCard from "./components/EvolutionCard";
import HatchingEggsCard from "./components/HatchingEggsCard";
import RaidsCard from "./components/RaidsCard";
import FriendshipCard from "./components/FriendshipCard";
import OtherActivitiesCard from "./components/OtherActivitiesCard";
import TotalExperienceCard from "./components/TotalExperienceCard";

export interface XPInputs {
  catching: {
    normal_catches: number;
    new_pokemon_catches: number;
    excellent_throws: number;
    curve_balls: number;
    first_throws: number;
    great_throws: number;
    nice_throws: number;
  };
  evolution: {
    normal_evolutions: number;
    new_pokemon_evolutions: number;
  };
  hatching: {
    two_km_eggs: number;
    five_km_eggs: number;
    seven_km_eggs: number;
    ten_km_eggs: number;
    twelve_km_eggs: number;
  };
  raids: {
    one_star_raids: number;
    three_star_raids: number;
    five_star_raids: number;
    mega_raids: number;
    shadow_raids: number;
  };
  friendship: {
    good_friends: number;
    great_friends: number;
    ultra_friends: number;
    best_friends: number;
  };
  other: {
    research_breakthroughs: number;
    field_research: number;
    special_research: number;
    gym_battles: number;
    pvp_battles: number;
    trades: number;
    photobombs: number;
  };
  lucky_egg: boolean;
  current_level: number;
  target_level: number;
}

export interface CalculationResult {
  total_xp: number;
  xp_breakdown: Record<string, number>;
  xp_needed: number;
  xp_remaining: number;
}

function App() {
  const [inputs, setInputs] = useState<XPInputs>({
    catching: {
      normal_catches: 0,
      new_pokemon_catches: 0,
      excellent_throws: 0,
      curve_balls: 0,
      first_throws: 0,
      great_throws: 0,
      nice_throws: 0,
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
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const calculateXP = useCallback(async () => {
    setIsCalculating(true);
    try {
      const calculationResult = await invoke<CalculationResult>("calculate_total_xp", { inputs });
      setResult(calculationResult);
    } catch (error) {
      console.error("Error calculating XP:", error);
    } finally {
      setIsCalculating(false);
    }
  }, [inputs]);

  const updateInputs = useCallback((section: keyof XPInputs, field: string, value: number | boolean) => {
    setInputs(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value,
      },
    }));
  }, []);

  const resetInputs = useCallback(() => {
    setInputs({
      catching: {
        normal_catches: 0,
        new_pokemon_catches: 0,
        excellent_throws: 0,
        curve_balls: 0,
        first_throws: 0,
        great_throws: 0,
        nice_throws: 0,
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
    });
    setResult(null);
  }, []);

  // const saveProgress = useCallback(async () => {
  //   try {
  //     const message = await invoke<string>("save_progress", { inputs });
  //     setSaveMessage(message);
  //     setTimeout(() => setSaveMessage(null), 3000);
  //   } catch (error) {
  //     console.error("Error saving progress:", error);
  //     setSaveMessage("Failed to save progress");
  //     setTimeout(() => setSaveMessage(null), 3000);
  //   }
  // }, [inputs]);

  // const loadProgress = useCallback(async () => {
  //   try {
  //     const loadedInputs = await invoke<XPInputs>("load_progress");
  //     setInputs(loadedInputs);
  //     setSaveMessage("Progress loaded successfully");
  //     setTimeout(() => setSaveMessage(null), 3000);
  //   } catch (error) {
  //     console.error("Error loading progress:", error);
  //     setSaveMessage("No saved progress found");
  //     setTimeout(() => setSaveMessage(null), 3000);
  //   }
  // }, []);

  // Auto-calculate when inputs change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      calculateXP();
    }, 300); // Debounce calculation

    return () => clearTimeout(timeoutId);
  }, [inputs, calculateXP]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Save/Load Message */}
        {saveMessage && (
          <div className={`mb-4 p-3 rounded-lg text-center ${
            saveMessage.includes('success') || saveMessage.includes('loaded')
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {saveMessage}
          </div>
        )}

        {/* Simple Level Calculator */}
        <SimpleLevelCalculatorCard
          currentLevel={inputs.current_level}
          targetLevel={inputs.target_level}
          onLevelChange={(field: string, value: number) => {
            if (field === 'current_level') {
              setInputs(prev => ({ ...prev, current_level: value }));
            } else if (field === 'target_level') {
              setInputs(prev => ({ ...prev, target_level: value }));
            }
          }}
        />

        {/* XP Source Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <CatchingPokemonCard
            inputs={inputs.catching}
            onInputChange={(field: string, value: number) => updateInputs('catching', field, value)}
          />
          
          <EvolutionCard
            inputs={inputs.evolution}
            onInputChange={(field: string, value: number) => updateInputs('evolution', field, value)}
          />
          
          <HatchingEggsCard
            inputs={inputs.hatching}
            onInputChange={(field: string, value: number) => updateInputs('hatching', field, value)}
          />
          
          <RaidsCard
            inputs={inputs.raids}
            onInputChange={(field: string, value: number) => updateInputs('raids', field, value)}
          />
          
          <FriendshipCard
            inputs={inputs.friendship}
            onInputChange={(field: string, value: number) => updateInputs('friendship', field, value)}
          />
          
          <OtherActivitiesCard
            inputs={inputs.other}
            onInputChange={(field: string, value: number) => updateInputs('other', field, value)}
          />
        </div>

        {/* Lucky Egg Toggle */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Lucky Egg Bonus</h3>
              <p className="text-sm text-gray-600">Double XP for all activities</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={inputs.lucky_egg}
                onChange={(e) => setInputs(prev => ({ ...prev, lucky_egg: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Total Experience Card */}
        <TotalExperienceCard
          result={result}
          isCalculating={isCalculating}
          onRecalculate={calculateXP}
          onReset={resetInputs}
          // onSave={saveProgress}
          // onLoad={loadProgress}
        />
      </div>
    </div>
  );
}

export default App;
