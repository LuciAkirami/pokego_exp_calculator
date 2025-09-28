import { type LucideIcon, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface XPCalculatorCardProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

export function XPCalculatorCard({
  title,
  subtitle,
  description,
  icon: Icon,
  color,
  isSelected,
  onClick,
}: XPCalculatorCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "cursor-pointer relative overflow-hidden group",
        "glass-card glass-card-hover",
        isSelected
          ? "border-primary/60 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent"
          : "hover:border-primary/40",
        "border-primary/40"
      )}
    >
      <CardContent className="p-6 relative z-10">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center relative overflow-hidden",
              "glass-card",
              `bg-gradient-to-br ${color}`
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Icon className="w-6 h-6 text-foreground relative z-10" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground mb-1 text-balance">
              {title}
            </h3>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {subtitle}
            </p>
            <p className="text-xs text-muted-foreground/80 text-pretty">
              {description}
            </p>
          </div>

          <div className="flex-shrink-0">
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
          </div>
        </div>
      </CardContent>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 right-4 w-1 h-1 bg-white/30 rounded-full animate-pulse" />
        <div className="absolute bottom-6 left-6 w-0.5 h-0.5 bg-white/20 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-8 w-0.5 h-0.5 bg-white/25 rounded-full animate-pulse delay-500" />
      </div>
    </Card>
  );
}
