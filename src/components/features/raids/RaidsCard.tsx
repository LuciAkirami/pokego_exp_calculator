import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import type { RaidsCardProps } from '../../../types/component-props';

const RaidsCard: React.FC<RaidsCardProps> = ({
  inputs,
  onInputChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-800 flex items-center">
          <span className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
            ⚔️
          </span>
          Raids
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="one-star-raids">1-Star Raids</Label>
            <Input
              id="one-star-raids"
              type="number"
              min="0"
              value={inputs.one_star_raids}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('one_star_raids', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
            <p className="text-xs text-gray-500">3,000 XP each</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="three-star-raids">3-Star Raids</Label>
            <Input
              id="three-star-raids"
              type="number"
              min="0"
              value={inputs.three_star_raids}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('three_star_raids', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
            <p className="text-xs text-gray-500">3,200 XP each</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="five-star-raids">5-Star Raids</Label>
            <Input
              id="five-star-raids"
              type="number"
              min="0"
              value={inputs.five_star_raids}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('five_star_raids', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
            <p className="text-xs text-gray-500">10,000 XP each</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mega-raids">Mega Raids</Label>
            <Input
              id="mega-raids"
              type="number"
              min="0"
              value={inputs.mega_raids}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('mega_raids', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
            <p className="text-xs text-gray-500">10,000 XP each</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shadow-raids">Shadow Raids</Label>
            <Input
              id="shadow-raids"
              type="number"
              min="0"
              value={inputs.shadow_raids}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('shadow_raids', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
            <p className="text-xs text-gray-500">10,000 XP each</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RaidsCard;
