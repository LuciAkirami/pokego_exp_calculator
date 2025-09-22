import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import type { HatchingEggsCardProps } from '../types/component-props';

const HatchingEggsCard: React.FC<HatchingEggsCardProps> = ({
  inputs,
  onInputChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-800 flex items-center">
          <span className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
            🥚
          </span>
          Hatching Eggs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="two-km-eggs">2km Eggs</Label>
            <Input
              id="two-km-eggs"
              type="number"
              min="0"
              value={inputs.two_km_eggs}
              onChange={(e) => onInputChange('two_km_eggs', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
            <p className="text-xs text-gray-500">200 XP each</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="five-km-eggs">5km Eggs</Label>
            <Input
              id="five-km-eggs"
              type="number"
              min="0"
              value={inputs.five_km_eggs}
              onChange={(e) => onInputChange('five_km_eggs', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
            <p className="text-xs text-gray-500">500 XP each</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seven-km-eggs">7km Eggs</Label>
            <Input
              id="seven-km-eggs"
              type="number"
              min="0"
              value={inputs.seven_km_eggs}
              onChange={(e) => onInputChange('seven_km_eggs', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
            <p className="text-xs text-gray-500">750 XP each</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ten-km-eggs">10km Eggs</Label>
            <Input
              id="ten-km-eggs"
              type="number"
              min="0"
              value={inputs.ten_km_eggs}
              onChange={(e) => onInputChange('ten_km_eggs', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
            <p className="text-xs text-gray-500">1,000 XP each</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="twelve-km-eggs">12km Eggs</Label>
            <Input
              id="twelve-km-eggs"
              type="number"
              min="0"
              value={inputs.twelve_km_eggs}
              onChange={(e) => onInputChange('twelve_km_eggs', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
            <p className="text-xs text-gray-500">1,200 XP each</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HatchingEggsCard;
