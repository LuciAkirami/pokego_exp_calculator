import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import type { OtherActivitiesCardProps } from '../../../types/component-props';

const OtherActivitiesCard: React.FC<OtherActivitiesCardProps> = ({
  inputs,
  onInputChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-800 flex items-center">
          <span className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
            🎯
          </span>
          Other Activities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="research-breakthroughs">Research Breakthroughs</Label>
            <Input
              id="research-breakthroughs"
              type="number"
              min="0"
              value={inputs.research_breakthroughs}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('research_breakthroughs', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
            <p className="text-xs text-gray-500">2,000 XP each</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="field-research">Field Research</Label>
              <Input
                id="field-research"
                type="number"
                min="0"
                value={inputs.field_research}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('field_research', parseInt(e.target.value) || 0)}
                placeholder="0"
              />
              <p className="text-xs text-gray-500">100 XP each</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="special-research">Special Research</Label>
              <Input
                id="special-research"
                type="number"
                min="0"
                value={inputs.special_research}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('special_research', parseInt(e.target.value) || 0)}
                placeholder="0"
              />
              <p className="text-xs text-gray-500">Varies</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="gym-battles">Gym Battles</Label>
              <Input
                id="gym-battles"
                type="number"
                min="0"
                value={inputs.gym_battles}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('gym_battles', parseInt(e.target.value) || 0)}
                placeholder="0"
              />
              <p className="text-xs text-gray-500">100 XP each</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pvp-battles">PvP Battles</Label>
              <Input
                id="pvp-battles"
                type="number"
                min="0"
                value={inputs.pvp_battles}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('pvp_battles', parseInt(e.target.value) || 0)}
                placeholder="0"
              />
              <p className="text-xs text-gray-500">500 XP each</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="trades">Trades</Label>
              <Input
                id="trades"
                type="number"
                min="0"
                value={inputs.trades}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('trades', parseInt(e.target.value) || 0)}
                placeholder="0"
              />
              <p className="text-xs text-gray-500">100 XP each</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="photobombs">Photobombs</Label>
              <Input
                id="photobombs"
                type="number"
                min="0"
                value={inputs.photobombs}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('photobombs', parseInt(e.target.value) || 0)}
                placeholder="0"
              />
              <p className="text-xs text-gray-500">500 XP each</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OtherActivitiesCard;
