import React from 'react';

interface EvolutionInputs {
  normal_evolutions: number;
  new_pokemon_evolutions: number;
}

interface EvolutionCardProps {
  inputs: EvolutionInputs;
  onInputChange: (field: keyof EvolutionInputs, value: number) => void;
}

const EvolutionCard: React.FC<EvolutionCardProps> = ({
  inputs,
  onInputChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
          ⚡
        </span>
        Evolution
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Normal Evolutions
          </label>
          <input
            type="number"
            min="0"
            value={inputs.normal_evolutions}
            onChange={(e) => onInputChange('normal_evolutions', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="0"
          />
          <p className="text-xs text-gray-500 mt-1">500 XP each</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Pokémon Evolutions
          </label>
          <input
            type="number"
            min="0"
            value={inputs.new_pokemon_evolutions}
            onChange={(e) => onInputChange('new_pokemon_evolutions', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="0"
          />
          <p className="text-xs text-gray-500 mt-1">1000 XP each</p>
        </div>
      </div>
    </div>
  );
};

export default EvolutionCard;
