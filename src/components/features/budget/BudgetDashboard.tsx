"use client";

import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BudgetIndicator } from "@/components/shared/BudgetIndicator";
import { formatCurrency } from "@/lib/utils";
import type { BudgetData } from "@/types";

interface BudgetDashboardProps {
  budget: BudgetData;
}

export function BudgetDashboard({ budget }: BudgetDashboardProps) {
  const remaining = budget.totalBudget - budget.totalSpent;
  const percentUsed = Math.round((budget.totalSpent / budget.totalBudget) * 100);
  const isOverBudget = budget.totalSpent > budget.totalBudget;

  const statCards = [
    {
      title: "Total Budget",
      value: formatCurrency(budget.totalBudget),
      icon: Target,
      trend: null,
      description: `${budget.month}`,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Amount Spent",
      value: formatCurrency(budget.totalSpent),
      icon: DollarSign,
      trend: percentUsed,
      description: `${percentUsed}% of budget`,
      color: "text-primary bg-primary/10",
    },
    {
      title: "Remaining",
      value: formatCurrency(Math.abs(remaining)),
      icon: isOverBudget ? TrendingDown : TrendingUp,
      trend: null,
      description: isOverBudget ? "Over budget!" : "Available to spend",
      color: isOverBudget
        ? "text-red-600 bg-red-50 dark:bg-red-900/20"
        : "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${card.color}`}>
                  <card.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Overall progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Overall Budget</CardTitle>
            <Badge
              variant={isOverBudget ? "destructive" : "secondary"}
            >
              {percentUsed}% used
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <BudgetIndicator
            label={budget.month}
            spent={budget.totalSpent}
            total={budget.totalBudget}
          />
        </CardContent>
      </Card>

      {/* Category breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {budget.categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <BudgetIndicator
                label={cat.name}
                spent={cat.spent}
                total={cat.budgeted}
              />
              {i < budget.categories.length - 1 && (
                <Separator className="mt-4" />
              )}
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Weekly breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Weekly Spending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {budget.weeklyBreakdown.map((week, i) => {
              const pct =
                week.spent > 0
                  ? Math.min((week.spent / week.budgeted) * 100, 100)
                  : 0;
              const isCurrent = i === 1; // current week
              return (
                <div key={week.week} className="flex items-center gap-3">
                  <div className="w-20 shrink-0">
                    <p className="text-xs font-medium">{week.week}</p>
                    {isCurrent && (
                      <Badge variant="secondary" className="text-[9px] px-1 py-0 mt-0.5">
                        Current
                      </Badge>
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="h-6 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary/70 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-28 text-right shrink-0">
                    {week.spent > 0 ? (
                      <p className="text-xs">
                        <span className="font-medium">{formatCurrency(week.spent)}</span>
                        <span className="text-muted-foreground"> / {formatCurrency(week.budgeted)}</span>
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">Not started</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
