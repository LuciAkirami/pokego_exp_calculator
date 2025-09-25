import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';

interface MaxBattlesCardProps {
  inputs: {
    one_star_battles: number;
    two_star_battles: number;
    three_star_battles: number;
    four_star_battles: number;
    five_star_battles: number;
    six_star_battles: number;
    in_person_bonus_battles: number;
  };
  onInputChange: (field: string, value: number) => void;
}

const MaxBattlesCard: React.FC<MaxBattlesCardProps> = ({ inputs, onInputChange }) => {
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    onInputChange(field, value);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Max Raid Battles
        </CardTitle>
        <CardDescription className="text-center">
          Calculate XP from Max Raid Battles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="one-star-battles">1★ Raid Battles</Label>
            <Input
              id="one-star-battles"
              type="number"
              min="0"
              value={inputs.one_star_battles}
              onChange={handleInputChange('one_star_battles')}
              className="text-center"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="two-star-battles">2★ Raid Battles</Label>
            <Input
              id="two-star-battles"
              type="number"
              min="0"
              value={inputs.two_star_battles}
              onChange={handleInputChange('two_star_battles')}
              className="text-center"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="three-star-battles">3★ Raid Battles</Label>
            <Input
              id="three-star-battles"
              type="number"
              min="0"
              value={inputs.three_star_battles}
              onChange={handleInputChange('three_star_battles')}
              className="text-center"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="four-star-battles">4★ Raid Battles</Label>
            <Input
              id="four-star-battles"
              type="number"
              min="0"
              value={inputs.four_star_battles}
              onChange={handleInputChange('four_star_battles')}
              className="text-center"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="five-star-battles">5★ Raid Battles</Label>
            <Input
              id="five-star-battles"
              type="number"
              min="0"
              value={inputs.five_star_battles}
              onChange={handleInputChange('five_star_battles')}
              className="text-center"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="six-star-battles">6★ Raid Battles</Label>
            <Input
              id="six-star-battles"
              type="number"
              min="0"
              value={inputs.six_star_battles}
              onChange={handleInputChange('six_star_battles')}
              className="text-center"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="in-person-bonus-battles">In-Person Bonus Battles</Label>
            <Input
              id="in-person-bonus-battles"
              type="number"
              min="0"
              value={inputs.in_person_bonus_battles}
              onChange={handleInputChange('in_person_bonus_battles')}
              className="text-center"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Number of battles completed in-person for bonus XP
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaxBattlesCard;
