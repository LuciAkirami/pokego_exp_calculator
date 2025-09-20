import React from 'react';

interface SimpleLevelCalculatorCardProps {
  currentLevel: number;
  targetLevel: number;
  onLevelChange: (field: string, value: number) => void;
}

const SimpleLevelCalculatorCard: React.FC<SimpleLevelCalculatorCardProps> = ({
  currentLevel,
  targetLevel,
  onLevelChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Simple Level Calculator
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Level
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={currentLevel}
            onChange={(e) => onLevelChange('current_level', parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Level
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={targetLevel}
            onChange={(e) => onLevelChange('target_level', parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default SimpleLevelCalculatorCard;
