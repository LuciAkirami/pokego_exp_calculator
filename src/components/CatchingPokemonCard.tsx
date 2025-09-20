import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

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
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-800 flex items-center">
          <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
            🎯
          </span>
          Catching Pokémon
        </CardTitle>
      </CardHeader>
      <CardContent>
      
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="normal-catches">Normal Catches</Label>
            <Input
              id="normal-catches"
              type="number"
              min="0"
              value={inputs.normal_catches}
              onChange={(e) => onInputChange('normal_catches', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
            <p className="text-xs text-gray-500">100 XP each</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-pokemon-catches">New Pokémon Catches</Label>
            <Input
              id="new-pokemon-catches"
              type="number"
              min="0"
              value={inputs.new_pokemon_catches}
              onChange={(e) => onInputChange('new_pokemon_catches', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
            <p className="text-xs text-gray-500">500 XP each</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="excellent-throws">Excellent Throws</Label>
              <Input
                id="excellent-throws"
                type="number"
                min="0"
                value={inputs.excellent_throws}
                onChange={(e) => onInputChange('excellent_throws', parseInt(e.target.value) || 0)}
                placeholder="0"
              />
              <p className="text-xs text-gray-500">100 XP each</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="great-throws">Great Throws</Label>
              <Input
                id="great-throws"
                type="number"
                min="0"
                value={inputs.great_throws}
                onChange={(e) => onInputChange('great_throws', parseInt(e.target.value) || 0)}
                placeholder="0"
              />
              <p className="text-xs text-gray-500">50 XP each</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="nice-throws">Nice Throws</Label>
              <Input
                id="nice-throws"
                type="number"
                min="0"
                value={inputs.nice_throws}
                onChange={(e) => onInputChange('nice_throws', parseInt(e.target.value) || 0)}
                placeholder="0"
              />
              <p className="text-xs text-gray-500">10 XP each</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="curve-balls">Curve Balls</Label>
              <Input
                id="curve-balls"
                type="number"
                min="0"
                value={inputs.curve_balls}
                onChange={(e) => onInputChange('curve_balls', parseInt(e.target.value) || 0)}
                placeholder="0"
              />
              <p className="text-xs text-gray-500">20 XP each</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="first-throws">First Throws</Label>
            <Input
              id="first-throws"
              type="number"
              min="0"
              value={inputs.first_throws}
              onChange={(e) => onInputChange('first_throws', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
            <p className="text-xs text-gray-500">50 XP each</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CatchingPokemonCard;
