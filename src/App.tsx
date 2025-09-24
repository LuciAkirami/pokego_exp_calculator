import { useState, useEffect, useCallback } from "react";
import "./App.css";

// Components
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import SimpleLevelCalculatorCard from "./components/SimpleLevelCalculatorCard";
import Level50CalculatorCard from "./components/Level50CalculatorCard";
import CatchingCard from "./components/features/catching/CatchingCard";
import EvolutionCard from "./components/features/evolution/EvolutionCard";
import HatchingEggsCard from "./components/features/hatching/HatchingEggsCard";
import RaidsCard from "./components/features/raids/RaidsCard";
import FriendshipCard from "./components/features/friendship/FriendshipCard";
import OtherActivitiesCard from "./components/features/activities/OtherActivitiesCard";
import TotalExperienceCard from "./components/common/TotalExperienceCard";
import { Button } from "./components/ui/button";
import LuckyEggToggle from "./components/common/LuckyEggToggle";

// Custom Hook
import { useXPCalculator } from "./features/xp-calculator";

// Types
import { XPInputs } from "./types/xp-inputs";

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  
  // Use the custom hook for state management
  const {
    inputs,
    result,
    isCalculating,
    updateInputs,
    updateLevels,
    toggleLuckyEgg,
    resetInputs,
    calculateXP,
  } = useXPCalculator();

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page);
  }, []);

  // Save/load progress functionality can be implemented here later

  // Auto-calculate when inputs change, but only if not on home page
  useEffect(() => {
    if (currentPage !== 'home') {
      const timeoutId = setTimeout(() => {
        calculateXP();
      }, 300); // Debounce calculation

      return () => clearTimeout(timeoutId);
    }
  }, [inputs, calculateXP, currentPage]);

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
              if (field === 'current_level' || field === 'target_level') {
                updateLevels(field as 'current_level' | 'target_level', value);
              }
            }}
          />
        )}

        {currentPage === 'catching' && (
          <CatchingCard
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
                if (field === 'current_level' || field === 'target_level') {
                  updateLevels(field, value);
                }
              }}
            />
            <div className="grid gap-6 md:grid-cols-2">
              <CatchingCard
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
              onToggle={toggleLuckyEgg}
            />

            {/* Total Experience Card - Only show if not on the detailed view */}
            <TotalExperienceCard
              result={result}
              isCalculating={isCalculating}
              onRecalculate={calculateXP}
              onReset={resetInputs}
              isDetailedView={currentPage === 'detailed'}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
