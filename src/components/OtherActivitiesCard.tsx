import React from 'react';

interface OtherInputs {
  research_breakthroughs: number;
  field_research: number;
  special_research: number;
  gym_battles: number;
  pvp_battles: number;
  trades: number;
  photobombs: number;
}

interface OtherActivitiesCardProps {
  inputs: OtherInputs;
  onInputChange: (field: keyof OtherInputs, value: number) => void;
}

const OtherActivitiesCard: React.FC<OtherActivitiesCardProps> = ({
  inputs,
  onInputChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <span className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
          🎯
        </span>
        Other Activities
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Research Breakthroughs
          </label>
          <input
            type="number"
            min="0"
            value={inputs.research_breakthroughs}
            onChange={(e) => onInputChange('research_breakthroughs', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="0"
          />
          <p className="text-xs text-gray-500 mt-1">2,000 XP each</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Field Research
            </label>
            <input
              type="number"
              min="0"
              value={inputs.field_research}
              onChange={(e) => onInputChange('field_research', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">100 XP each</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Special Research
            </label>
            <input
              type="number"
              min="0"
              value={inputs.special_research}
              onChange={(e) => onInputChange('special_research', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">1,000 XP each</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gym Battles
            </label>
            <input
              type="number"
              min="0"
              value={inputs.gym_battles}
              onChange={(e) => onInputChange('gym_battles', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">50 XP each</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PvP Battles
            </label>
            <input
              type="number"
              min="0"
              value={inputs.pvp_battles}
              onChange={(e) => onInputChange('pvp_battles', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">100 XP each</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trades
            </label>
            <input
              type="number"
              min="0"
              value={inputs.trades}
              onChange={(e) => onInputChange('trades', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">100 XP each</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photobombs
            </label>
            <input
              type="number"
              min="0"
              value={inputs.photobombs}
              onChange={(e) => onInputChange('photobombs', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">100 XP each</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherActivitiesCard;
