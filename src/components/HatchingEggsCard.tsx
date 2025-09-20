import React from 'react';

interface HatchingInputs {
  two_km_eggs: number;
  five_km_eggs: number;
  seven_km_eggs: number;
  ten_km_eggs: number;
  twelve_km_eggs: number;
}

interface HatchingEggsCardProps {
  inputs: HatchingInputs;
  onInputChange: (field: keyof HatchingInputs, value: number) => void;
}

const HatchingEggsCard: React.FC<HatchingEggsCardProps> = ({
  inputs,
  onInputChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <span className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
          🥚
        </span>
        Hatching Eggs
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            2km Eggs
          </label>
          <input
            type="number"
            min="0"
            value={inputs.two_km_eggs}
            onChange={(e) => onInputChange('two_km_eggs', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="0"
          />
          <p className="text-xs text-gray-500 mt-1">200 XP each</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            5km Eggs
          </label>
          <input
            type="number"
            min="0"
            value={inputs.five_km_eggs}
            onChange={(e) => onInputChange('five_km_eggs', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="0"
          />
          <p className="text-xs text-gray-500 mt-1">500 XP each</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            7km Eggs
          </label>
          <input
            type="number"
            min="0"
            value={inputs.seven_km_eggs}
            onChange={(e) => onInputChange('seven_km_eggs', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="0"
          />
          <p className="text-xs text-gray-500 mt-1">700 XP each</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            10km Eggs
          </label>
          <input
            type="number"
            min="0"
            value={inputs.ten_km_eggs}
            onChange={(e) => onInputChange('ten_km_eggs', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="0"
          />
          <p className="text-xs text-gray-500 mt-1">1000 XP each</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            12km Eggs
          </label>
          <input
            type="number"
            min="0"
            value={inputs.twelve_km_eggs}
            onChange={(e) => onInputChange('twelve_km_eggs', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="0"
          />
          <p className="text-xs text-gray-500 mt-1">1200 XP each</p>
        </div>
      </div>
    </div>
  );
};

export default HatchingEggsCard;
