import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';

interface MaxMovesCardProps {
  inputs: {
    level_1_moves: number;
    level_2_moves: number;
    level_max_moves: number;
  };
  onInputChange: (field: string, value: number) => void;
}

const MaxMovesCard: React.FC<MaxMovesCardProps> = ({ inputs, onInputChange }) => {
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    onInputChange(field, value);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Max Moves
        </CardTitle>
        <CardDescription className="text-center">
          Calculate XP from Max Moves
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="level-1-moves">Level 1 Moves</Label>
            <Input
              id="level-1-moves"
              type="number"
              min="0"
              value={inputs.level_1_moves}
              onChange={handleInputChange('level_1_moves')}
              className="text-center"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Number of Level 1 moves used
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="level-2-moves">Level 2 Moves</Label>
            <Input
              id="level-2-moves"
              type="number"
              min="0"
              value={inputs.level_2_moves}
              onChange={handleInputChange('level_2_moves')}
              className="text-center"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Number of Level 2 moves used
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="level-max-moves">Max Level Moves</Label>
            <Input
              id="level-max-moves"
              type="number"
              min="0"
              value={inputs.level_max_moves}
              onChange={handleInputChange('level_max_moves')}
              className="text-center"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Number of Max Level moves used
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaxMovesCard;
