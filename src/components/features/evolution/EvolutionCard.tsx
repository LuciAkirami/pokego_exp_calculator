import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import type { EvolutionCardProps } from '../../../types/component-props';

const EvolutionCard: React.FC<EvolutionCardProps> = ({
  inputs,
  onInputChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-800 flex items-center">
          <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
            ⚡
          </span>
          Evolution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="normal-evolutions">Normal Evolutions</Label>
            <Input
              id="normal-evolutions"
              type="number"
              min="0"
              value={inputs.normal_evolutions}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('normal_evolutions', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
            <p className="text-xs text-gray-500">500 XP each</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-pokemon-evolutions">New Pokémon Evolutions</Label>
            <Input
              id="new-pokemon-evolutions"
              type="number"
              min="0"
              value={inputs.new_pokemon_evolutions}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('new_pokemon_evolutions', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
            <p className="text-xs text-gray-500">1000 XP each</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EvolutionCard;
