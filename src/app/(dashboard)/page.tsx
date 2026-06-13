"use client";

import { motion, type Variants } from "framer-motion";
import {
  UtensilsCrossed,
  ShoppingCart,
  Wallet,
  ChefHat,
  TrendingUp,
  Calendar,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/shared/PageHeader";
import { BudgetIndicator } from "@/components/shared/BudgetIndicator";
import { MealCard } from "@/components/shared/MealCard";
import { mockMealPlan, mockGroceryList, mockBudgetData, mockCookingTasks } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

const quickStats = [
  {
    label: "Meals This Week",
    value: "14",
    icon: UtensilsCrossed,
    badge: "7 days",
    href: "/meals",
    color: "from-violet-500 to-purple-600",
  },
  {
    label: "Grocery Items",
    value: "15",
    icon: ShoppingCart,
    badge: "5 remaining",
    href: "/grocery",
    color: "from-blue-500 to-cyan-600",
  },
  {
    label: "Budget Used",
    value: "69%",
    icon: Wallet,
    badge: "$137.60 left",
    href: "/budget",
    color: "from-emerald-500 to-teal-600",
  },
  {
    label: "Cooking Tasks",
    value: "5",
    icon: ChefHat,
    badge: "2 pending",
    href: "/cooking",
    color: "from-amber-500 to-orange-600",
  },
];

export default function DashboardPage() {
  const todayMeals = mockMealPlan.days[0];
  const pendingTasks = mockCookingTasks.filter((t) => t.status !== "done");
  const uncheckedItems = mockGroceryList.items.filter((i) => !i.checked);

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <PageHeader
        title="Good morning, Pavandeep! 👋"
        description="Here's your meal planning overview for the week of Jun 13–19, 2026."
        badge="Week 24"
        actions={
          <Button asChild size="sm" className="gap-2">
            <Link href="/meals">
              <Calendar className="h-4 w-4" />
              Plan Week
            </Link>
          </Button>
        }
      />

      {/* Quick stat cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {quickStats.map((stat) => (
          <motion.div key={stat.label} variants={item}>
            <Link href={stat.href}>
              <Card className="cursor-pointer hover:shadow-md transition-shadow group overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color} shadow-sm`}
                    >
                      <stat.icon className="h-4 w-4 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-[10px]">
                      {stat.badge}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 group-hover:text-foreground transition-colors">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's meals */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base">Today's Meals</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {todayMeals.dayName}, {todayMeals.date}
                </p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/meals">View plan</Link>
              </Button>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {todayMeals.breakfast && (
                <MealCard meal={todayMeals.breakfast} compact={false} />
              )}
              {todayMeals.lunch && (
                <MealCard meal={todayMeals.lunch} compact={false} />
              )}
              {todayMeals.dinner && (
                <MealCard meal={todayMeals.dinner} compact={false} />
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Right sidebar */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Budget snapshot */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">
                  Budget Snapshot
                </CardTitle>
                <Button variant="ghost" size="sm" asChild className="h-7 text-xs">
                  <Link href="/budget">Details</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <BudgetIndicator
                label="June Budget"
                spent={mockBudgetData.totalSpent}
                total={mockBudgetData.totalBudget}
              />
              <div className="text-xs text-muted-foreground text-center">
                {formatCurrency(mockBudgetData.totalBudget - mockBudgetData.totalSpent)} remaining this month
              </div>
            </CardContent>
          </Card>

          {/* Pending tasks */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">
                  Upcoming Tasks
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {pendingTasks.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {pendingTasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                      task.priority === "high"
                        ? "bg-red-500"
                        : task.priority === "medium"
                        ? "bg-amber-500"
                        : "bg-blue-500"
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate">{task.title}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {task.estimatedMinutes}m · {task.mealName}
                    </p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full h-8 text-xs mt-2" asChild>
                <Link href="/cooking">View all tasks</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Grocery progress */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">
                  Grocery Progress
                </CardTitle>
                <Button variant="ghost" size="sm" asChild className="h-7 text-xs">
                  <Link href="/grocery">View</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">
                    {mockGroceryList.items.filter((i) => i.checked).length} of{" "}
                    {mockGroceryList.items.length} items
                  </span>
                  <span className="font-medium">
                    {Math.round(
                      (mockGroceryList.items.filter((i) => i.checked).length /
                        mockGroceryList.items.length) *
                        100
                    )}
                    %
                  </span>
                </div>
                <Progress
                  value={
                    (mockGroceryList.items.filter((i) => i.checked).length /
                      mockGroceryList.items.length) *
                    100
                  }
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground">
                  {uncheckedItems.length} items left to purchase
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Insight banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-purple-500/5">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold mb-0.5">
                  💡 Smart Tip for This Week
                </p>
                <p className="text-xs text-muted-foreground">
                  You're spending 28% on proteins this month. Consider substituting{" "}
                  <span className="font-medium text-foreground">chicken thighs</span> for
                  chicken breasts — they cost 40% less and are just as nutritious.
                  Check the <Link href="/substitutions" className="text-primary underline underline-offset-2">substitutions guide</Link>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
