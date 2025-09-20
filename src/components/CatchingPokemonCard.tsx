import React from 'react';

interface CatchingInputs {
  normal_catches: number;
  new_pokemon_catches: number;
  excellent_throws: number;
  curve_balls: number;
  first_throws: number;
  great_throws: number;
  nice_throws: number;
}

interface CatchingPokemonCardProps {
  inputs: CatchingInputs;
  onInputChange: (field: keyof CatchingInputs, value: number) => void;
}

const CatchingPokemonCard: React.FC<CatchingPokemonCardProps> = ({
  inputs,
  onInputChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
          🎯
        </span>
        Catching Pokémon
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Normal Catches
          </label>
          <input
            type="number"
            min="0"
            value={inputs.normal_catches}
            onChange={(e) => onInputChange('normal_catches', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="0"
          />
          <p className="text-xs text-gray-500 mt-1">100 XP each</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Pokémon Catches
          </label>
          <input
            type="number"
            min="0"
            value={inputs.new_pokemon_catches}
            onChange={(e) => onInputChange('new_pokemon_catches', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="0"
          />
          <p className="text-xs text-gray-500 mt-1">500 XP each</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Excellent Throws
            </label>
            <input
              type="number"
              min="0"
              value={inputs.excellent_throws}
              onChange={(e) => onInputChange('excellent_throws', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">100 XP each</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Great Throws
            </label>
            <input
              type="number"
              min="0"
              value={inputs.great_throws}
              onChange={(e) => onInputChange('great_throws', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">50 XP each</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nice Throws
            </label>
            <input
              type="number"
              min="0"
              value={inputs.nice_throws}
              onChange={(e) => onInputChange('nice_throws', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">10 XP each</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Curve Balls
            </label>
            <input
              type="number"
              min="0"
              value={inputs.curve_balls}
              onChange={(e) => onInputChange('curve_balls', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">20 XP each</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Throws
          </label>
          <input
            type="number"
            min="0"
            value={inputs.first_throws}
            onChange={(e) => onInputChange('first_throws', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="0"
          />
          <p className="text-xs text-gray-500 mt-1">50 XP each</p>
        </div>
      </div>
    </div>
  );
};

export default CatchingPokemonCard;
