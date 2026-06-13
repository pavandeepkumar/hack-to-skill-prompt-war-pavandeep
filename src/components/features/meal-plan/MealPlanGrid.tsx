"use client";

import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MealCard } from "@/components/shared/MealCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { cn } from "@/lib/utils";
import type { MealPlan, MealType } from "@/types";

const mealTypes: { type: MealType; label: string; emoji: string }[] = [
  { type: "breakfast", label: "Breakfast", emoji: "🌅" },
  { type: "lunch", label: "Lunch", emoji: "☀️" },
  { type: "dinner", label: "Dinner", emoji: "🌙" },
];

interface MealPlanGridProps {
  mealPlan: MealPlan;
  onAddMeal?: (day: string, type: MealType) => void;
}

export function MealPlanGrid({ mealPlan, onAddMeal }: MealPlanGridProps) {
  const [visibleDayIndex, setVisibleDayIndex] = useState(0);
  const daysPerView = 3;
  const totalDays = mealPlan.days.length;

  const visibleDays = mealPlan.days.slice(
    visibleDayIndex,
    visibleDayIndex + daysPerView
  );

  const canGoPrev = visibleDayIndex > 0;
  const canGoNext = visibleDayIndex + daysPerView < totalDays;

  return (
    <div className="space-y-4">
      {/* Header controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {totalDays} days
          </Badge>
          <Badge variant="outline" className="text-xs">
            ${mealPlan.totalCost} / week
          </Badge>
          <Badge variant="outline" className="text-xs">
            {mealPlan.totalCalories.toLocaleString()} cal / week
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => setVisibleDayIndex(Math.max(0, visibleDayIndex - 1))}
            disabled={!canGoPrev}
            aria-label="Previous day"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-xs text-muted-foreground px-2">
            {visibleDayIndex + 1}–{Math.min(visibleDayIndex + daysPerView, totalDays)} of {totalDays}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() =>
              setVisibleDayIndex(
                Math.min(totalDays - daysPerView, visibleDayIndex + 1)
              )
            }
            disabled={!canGoNext}
            aria-label="Next day"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={visibleDayIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {visibleDays.map((day) => (
            <div key={day.date} className="space-y-3">
              {/* Day header */}
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <h3 className="text-sm font-semibold">{day.dayName}</h3>
                <Separator className="flex-1" />
              </div>

              {/* Meal slots */}
              {mealTypes.map(({ type, label, emoji }) => {
                const meal = day[type];
                return (
                  <div key={type}>
                    {meal ? (
                      <MealCard meal={meal} />
                    ) : (
                      <button
                        onClick={() => onAddMeal?.(day.date, type)}
                        className={cn(
                          "w-full rounded-xl border-2 border-dashed border-muted-foreground/20",
                          "py-4 px-3 flex flex-col items-center gap-1 text-muted-foreground",
                          "hover:border-primary/40 hover:bg-primary/5 transition-colors group"
                        )}
                        aria-label={`Add ${label} for ${day.dayName}`}
                      >
                        <span className="text-lg">{emoji}</span>
                        <span className="text-xs font-medium">{label}</span>
                        <Plus className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
