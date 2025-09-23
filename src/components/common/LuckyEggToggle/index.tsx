import { Card, CardContent, CardTitle, CardDescription } from "../../ui/card";
import { Switch } from "../../ui/switch";
import { Label } from "../../ui/label";

interface LuckyEggToggleProps {
  isActive: boolean;
  onToggle: (checked: boolean) => void;
}

export default function LuckyEggToggle({ isActive, onToggle }: LuckyEggToggleProps) {
  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg text-gray-800">Lucky Egg Bonus</CardTitle>
            <CardDescription className="text-sm text-gray-600">Double XP for all activities</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="lucky-egg" className="text-sm font-medium">
              {isActive ? 'Enabled' : 'Disabled'}
            </Label>
            <Switch
              id="lucky-egg"
              checked={isActive}
              onCheckedChange={onToggle}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
