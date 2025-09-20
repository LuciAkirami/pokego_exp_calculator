import React from 'react';

interface RaidsInputs {
  one_star_raids: number;
  three_star_raids: number;
  five_star_raids: number;
  mega_raids: number;
  shadow_raids: number;
}

interface RaidsCardProps {
  inputs: RaidsInputs;
  onInputChange: (field: keyof RaidsInputs, value: number) => void;
}

const RaidsCard: React.FC<RaidsCardProps> = ({
  inputs,
  onInputChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <span className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
          ⚔️
        </span>
        Raids
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            1-Star Raids
          </label>
          <input
            type="number"
            min="0"
            value={inputs.one_star_raids}
            onChange={(e) => onInputChange('one_star_raids', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="0"
          />
          <p className="text-xs text-gray-500 mt-1">3,000 XP each</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            3-Star Raids
          </label>
          <input
            type="number"
            min="0"
            value={inputs.three_star_raids}
            onChange={(e) => onInputChange('three_star_raids', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="0"
          />
          <p className="text-xs text-gray-500 mt-1">5,000 XP each</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            5-Star Raids
          </label>
          <input
            type="number"
            min="0"
            value={inputs.five_star_raids}
            onChange={(e) => onInputChange('five_star_raids', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="0"
          />
          <p className="text-xs text-gray-500 mt-1">10,000 XP each</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mega Raids
          </label>
          <input
            type="number"
            min="0"
            value={inputs.mega_raids}
            onChange={(e) => onInputChange('mega_raids', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="0"
          />
          <p className="text-xs text-gray-500 mt-1">10,000 XP each</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Shadow Raids
          </label>
          <input
            type="number"
            min="0"
            value={inputs.shadow_raids}
            onChange={(e) => onInputChange('shadow_raids', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="0"
          />
          <p className="text-xs text-gray-500 mt-1">10,000 XP each</p>
        </div>
      </div>
    </div>
  );
};

export default RaidsCard;
