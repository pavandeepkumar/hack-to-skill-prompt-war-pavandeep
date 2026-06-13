import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency, getBudgetStatus } from "@/lib/utils";

interface BudgetIndicatorProps {
  label: string;
  spent: number;
  total: number;
  showValues?: boolean;
  className?: string;
}

export function BudgetIndicator({
  label,
  spent,
  total,
  showValues = true,
  className,
}: BudgetIndicatorProps) {
  const percentage = Math.min(Math.round((spent / total) * 100), 100);
  const status = getBudgetStatus(spent, total);
  const remaining = total - spent;

  const statusConfig = {
    safe: {
      badge: "default" as const,
      label: "On Track",
      progressClass: "[&>div]:bg-emerald-500",
    },
    warning: {
      badge: "secondary" as const,
      label: "Near Limit",
      progressClass: "[&>div]:bg-amber-500",
    },
    danger: {
      badge: "destructive" as const,
      label: "Over Budget",
      progressClass: "[&>div]:bg-red-500",
    },
  }[status];

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <div className="flex items-center gap-2">
          <Badge variant={statusConfig.badge} className="text-xs px-1.5 py-0">
            {statusConfig.label}
          </Badge>
          {showValues && (
            <span className="text-xs text-muted-foreground">
              {formatCurrency(spent)} / {formatCurrency(total)}
            </span>
          )}
        </div>
      </div>
      <Progress
        value={percentage}
        className={cn("h-2", statusConfig.progressClass)}
        aria-label={`${label}: ${percentage}% of budget used`}
      />
      {showValues && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{percentage}% used</span>
          <span>
            {remaining >= 0 ? `${formatCurrency(remaining)} left` : `${formatCurrency(-remaining)} over`}
          </span>
        </div>
      )}
    </div>
  );
}
