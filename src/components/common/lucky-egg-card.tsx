import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

interface LuckyEggCardProps {
  isActive: boolean
  onToggle: (checked: boolean) => void
  className?: string
}

export function LuckyEggCard({ isActive, onToggle, className = "" }: LuckyEggCardProps) {
  return (
    <Card className={`glass-card glass-card-hover ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="text-base font-semibold">Lucky Egg Active</Label>
            <p className="text-sm text-muted-foreground">Double all XP gains</p>
          </div>
          <Switch
            checked={isActive}
            onCheckedChange={onToggle}
            className="data-[state=checked]:bg-primary"
          />
        </div>
      </CardContent>
    </Card>
  )
}
