import React from 'react';
import { CalculationResult } from '../App';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

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
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-800 text-center">
          Total Experience
        </CardTitle>
      </CardHeader>
      <CardContent>
      
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
            <Card className="bg-gray-50">
              <CardContent className="p-4">
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
              </CardContent>
            </Card>

            {/* Level Progress */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardContent className="p-4">
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
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        🎉 Target Level Reached!
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={onRecalculate}
                  className="flex-1"
                >
                  Recalculate
                </Button>
                <Button
                  onClick={onReset}
                  variant="secondary"
                  className="flex-1"
                >
                  Reset All
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  // onClick={onSave}
                  variant="outline"
                  className="flex-1"
                >
                  Save Progress
                </Button>
                <Button
                  // onClick={onLoad}
                  variant="outline"
                  className="flex-1"
                >
                  Load Progress
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">Enter your activities above to see your XP calculation</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TotalExperienceCard;