import React from 'react';
import { CalculationResult } from '../App';

interface TotalExperienceCardProps {
  result: CalculationResult | null;
  isCalculating: boolean;
  onRecalculate: () => void;
  onReset: () => void;
  // onSave: () => void;
  // onLoad: () => void;
}

const TotalExperienceCard: React.FC<TotalExperienceCardProps> = ({
  result,
  isCalculating,
  onRecalculate,
  onReset,
  // onSave,
  // onLoad,
}) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Total Experience
      </h3>
      
      {isCalculating ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Calculating...</p>
        </div>
      ) : result ? (
        <div className="space-y-6">
          {/* Total XP Display */}
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {formatNumber(result.total_xp)} XP
            </div>
            <p className="text-gray-600">Total Experience Gained</p>
          </div>

          {/* XP Breakdown */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">XP Breakdown</h4>
            <div className="space-y-2">
              {Object.entries(result.xp_breakdown).map(([category, xp]) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="text-gray-700">{category}</span>
                  <span className="font-semibold text-gray-800">
                    {formatNumber(xp)} XP
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Level Progress */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Level Progress</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">XP Needed for Target Level</span>
                <span className="font-semibold text-gray-800">
                  {formatNumber(result.xp_needed)} XP
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">XP Remaining</span>
                <span className={`font-semibold ${result.xp_remaining <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {result.xp_remaining <= 0 
                    ? `+${formatNumber(Math.abs(result.xp_remaining))} XP` 
                    : `${formatNumber(result.xp_remaining)} XP`
                  }
                </span>
              </div>
              {result.xp_remaining <= 0 && (
                <div className="text-center mt-3">
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    🎉 Target Level Reached!
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onRecalculate}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Recalculate
              </button>
              <button
                onClick={onReset}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Reset All
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                // onClick={onSave}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Save Progress
              </button>
              <button
                // onClick={onLoad}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Load Progress
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">Enter your activities above to see your XP calculation</p>
        </div>
      )}
    </div>
  );
};

export default TotalExperienceCard;