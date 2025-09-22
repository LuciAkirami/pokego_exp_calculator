import { useState, useEffect, useCallback } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

// Components
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import SimpleLevelCalculatorCard from "./components/SimpleLevelCalculatorCard";
import Level50CalculatorCard from "./components/Level50CalculatorCard";
import CatchingPokemonCard from "./components/CatchingPokemonCard";
import EvolutionCard from "./components/EvolutionCard";
import HatchingEggsCard from "./components/HatchingEggsCard";
import RaidsCard from "./components/RaidsCard";
import FriendshipCard from "./components/FriendshipCard";
import OtherActivitiesCard from "./components/OtherActivitiesCard";
import TotalExperienceCard from "./components/TotalExperienceCard";
import { Button } from "./components/ui/button";
import LuckyEggToggle from "./components/LuckyEggToggle";

// Types
import type {
  XPInputs,
  CalculationResult
} from "./types";

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [inputs, setInputs] = useState<XPInputs>({
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
  // const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page);
  }, []);

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

  const updateInputs = useCallback((section: keyof Omit<XPInputs, 'current_level' | 'target_level' | 'lucky_egg'>, field: string, value: number | boolean) => {
    setInputs((prev: XPInputs) => ({
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

  // Show home page
  if (currentPage === 'home') {
    return <HomePage onNavigate={handleNavigate} />;
  }

  // Show calculator page based on currentPage
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <div className="container mx-auto px-4 py-6 max-w-4xl bg-black">
        {/* Back to Home Button */}
        <div className="mb-6">
          <Button
            onClick={() => {
              setCurrentPage('home')
              resetInputs()
            }
            }
            variant="ghost"
            className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
          </Button>
        </div>

        {/* Save/Load Message */}
        {/* {saveMessage && (
          <div className={`mb-4 p-3 rounded-lg text-center ${
            saveMessage.includes('success') || saveMessage.includes('loaded')
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {saveMessage}
          </div>
        )} */}

        {/* Render the appropriate component based on currentPage */}
        {currentPage === 'level-50' && (
          <Level50CalculatorCard
            currentLevel={inputs.current_level}
            onLevelChange={(field: string, value: number) => {
              setInputs((prev: XPInputs) => ({
                ...prev,
                ...(field === 'current_level' && { current_level: value }),
                ...(field === 'target_level' && { target_level: value })
              }));
            }}
          />
        )}

        {currentPage === 'catching' && (
          <CatchingPokemonCard
            inputs={inputs.catching}
            onInputChange={(field: keyof XPInputs['catching'], value: number) => updateInputs('catching', field, value)}
          />
        )}

        {currentPage === 'evolution' && (
          <EvolutionCard
            inputs={inputs.evolution}
            onInputChange={(field: string, value: number) => updateInputs('evolution', field, value)}
          />
        )}

        {currentPage === 'raids' && (
          <RaidsCard
            inputs={inputs.raids}
            onInputChange={(field: string, value: number) => updateInputs('raids', field, value)}
          />
        )}

        {currentPage === 'friendship' && (
          <FriendshipCard
            inputs={inputs.friendship}
            onInputChange={(field: string, value: number) => updateInputs('friendship', field, value)}
          />
        )}

        {currentPage === 'detailed' && (
          <div className="grid gap-6">
            <SimpleLevelCalculatorCard
              currentLevel={inputs.current_level}
              targetLevel={inputs.target_level}
              onLevelChange={(field: string, value: number) => {
                setInputs((prev: XPInputs) => ({
                  ...prev,
                  ...(field === 'current_level' && { current_level: value }),
                  ...(field === 'target_level' && { target_level: value })
                }));
              }}
            />
            <div className="grid gap-6 md:grid-cols-2">
              <CatchingPokemonCard
                inputs={inputs.catching}
                onInputChange={(field: keyof XPInputs['catching'], value: XPInputs['catching'][keyof XPInputs['catching']]) => updateInputs('catching', field, value)}
              />
              <EvolutionCard
                inputs={inputs.evolution}
                onInputChange={(field: keyof XPInputs['evolution'], value: XPInputs['evolution'][keyof XPInputs['evolution']]) => updateInputs('evolution', field, value)}
              />
              <HatchingEggsCard
                inputs={inputs.hatching}
                onInputChange={(field: keyof XPInputs['hatching'], value: XPInputs['hatching'][keyof XPInputs['hatching']]) => updateInputs('hatching', field, value)}
              />
              <RaidsCard
                inputs={inputs.raids}
                onInputChange={(field: keyof XPInputs['raids'], value: XPInputs['raids'][keyof XPInputs['raids']]) => updateInputs('raids', field, value)}
              />
              <FriendshipCard
                inputs={inputs.friendship}
                onInputChange={(field: keyof XPInputs['friendship'], value: XPInputs['friendship'][keyof XPInputs['friendship']]) => updateInputs('friendship', field, value)}
              />
              <OtherActivitiesCard
                inputs={inputs.other}
                onInputChange={(field: keyof XPInputs['other'], value: XPInputs['other'][keyof XPInputs['other']]) => updateInputs('other', field, value)}
              />
            </div>
          </div>
        )}

        {/* Common components that appear on all calculator pages except home and level-50*/}
        {currentPage !== 'home' && currentPage !== 'level-50' && (
          <>
            <LuckyEggToggle
              isActive={inputs.lucky_egg}
              onToggle={(checked: boolean) => setInputs((prev: XPInputs) => ({ ...prev, lucky_egg: checked }))}
            />

            {/* Total Experience Card - Only show if not on the detailed view */}
            <TotalExperienceCard
              result={result}
              isCalculating={isCalculating}
              onRecalculate={calculateXP}
              onReset={resetInputs}
              isDetailedView={currentPage === 'detailed'}
            // onSave={saveProgress}
            // onLoad={loadProgress}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
