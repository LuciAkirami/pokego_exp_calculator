import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface SimpleLevelCalculatorCardProps {
  currentLevel: number;
  targetLevel: number;
  onLevelChange: (field: string, value: number) => void;
}

const SimpleLevelCalculatorCard: React.FC<SimpleLevelCalculatorCardProps> = ({
  currentLevel,
  targetLevel,
  onLevelChange,
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Simple Level Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="current-level">Current Level</Label>
            <Input
              id="current-level"
              type="number"
              min="1"
              max="50"
              value={currentLevel}
              onChange={(e) => onLevelChange('current_level', parseInt(e.target.value) || 1)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="target-level">Target Level</Label>
            <Input
              id="target-level"
              type="number"
              min="1"
              max="50"
              value={targetLevel}
              onChange={(e) => onLevelChange('target_level', parseInt(e.target.value) || 1)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleLevelCalculatorCard;
