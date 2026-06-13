"use client";

import { Clock, Users, Flame, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, formatCurrency } from "@/lib/utils";
import type { Meal, DietaryTag } from "@/types";

const dietaryTagConfig: Record<
  DietaryTag,
  { label: string; className: string }
> = {
  vegan: { label: "Vegan", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  vegetarian: { label: "Veg", className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  "gluten-free": { label: "GF", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  "dairy-free": { label: "DF", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  keto: { label: "Keto", className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
  "high-protein": { label: "Protein", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
  "low-carb": { label: "Low-Carb", className: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" },
};

interface MealCardProps {
  meal: Meal;
  className?: string;
  compact?: boolean;
  onClick?: () => void;
}

export function MealCard({
  meal,
  className,
  compact = false,
  onClick,
}: MealCardProps) {
  const totalTime = meal.prepTime + meal.cookTime;

  return (
    <TooltipProvider>
      <motion.div
        whileHover={{ y: -2, scale: 1.01 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
      >
        <Card
          className={cn(
            "cursor-pointer overflow-hidden transition-shadow hover:shadow-md border",
            className
          )}
          onClick={onClick}
          role={onClick ? "button" : undefined}
          tabIndex={onClick ? 0 : undefined}
          onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
        >
          <CardHeader className="pb-2 pt-4 px-4">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-0.5 min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {meal.type}
                </p>
                <h3 className="text-sm font-semibold leading-tight truncate">
                  {meal.name}
                </h3>
              </div>
              <Badge
                variant="outline"
                className="text-[10px] shrink-0 font-medium"
              >
                {formatCurrency(meal.cost)}
              </Badge>
            </div>
          </CardHeader>

          {!compact && (
            <>
              <CardContent className="pb-3 px-4">
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                  {meal.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {meal.dietaryTags.slice(0, 3).map((tag) => (
                    <Tooltip key={tag}>
                      <TooltipTrigger asChild>
                        <span
                          className={cn(
                            "inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium",
                            dietaryTagConfig[tag].className
                          )}
                        >
                          {dietaryTagConfig[tag].label}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{tag}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
                <Separator className="mb-3" />
                <div className="grid grid-cols-3 gap-2 text-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="flex items-center gap-0.5 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span className="text-[10px]">{totalTime}m</span>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      Prep: {meal.prepTime}m / Cook: {meal.cookTime}m
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="flex items-center gap-0.5 text-muted-foreground">
                          <Flame className="h-3 w-3" />
                          <span className="text-[10px]">{meal.calories}</span>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>Calories per serving</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="flex items-center gap-0.5 text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span className="text-[10px]">{meal.servings}</span>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>Servings</TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </motion.div>
    </TooltipProvider>
  );
}
