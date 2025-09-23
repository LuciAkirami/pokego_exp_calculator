import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import type { FriendshipCardProps } from '../../../types/component-props';

const FriendshipCard: React.FC<FriendshipCardProps> = ({
  inputs,
  onInputChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-800 flex items-center">
          <span className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
            👥
          </span>
          Friendship
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="good-friends">Good Friends</Label>
            <Input
              id="good-friends"
              type="number"
              min="0"
              value={inputs.good_friends}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('good_friends', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
            <p className="text-xs text-gray-500">3,000 XP each</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="great-friends">Great Friends</Label>
            <Input
              id="great-friends"
              type="number"
              min="0"
              value={inputs.great_friends}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('great_friends', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
            <p className="text-xs text-gray-500">10,000 XP each</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ultra-friends">Ultra Friends</Label>
            <Input
              id="ultra-friends"
              type="number"
              min="0"
              value={inputs.ultra_friends}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('ultra_friends', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
            <p className="text-xs text-gray-500">50,000 XP each</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="best-friends">Best Friends</Label>
            <Input
              id="best-friends"
              type="number"
              min="0"
              value={inputs.best_friends}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('best_friends', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
            <p className="text-xs text-gray-500">100,000 XP each</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FriendshipCard;
