"use client";

import { ShoppingCart, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, formatCurrency } from "@/lib/utils";
import type { GroceryItem, GroceryCategory } from "@/types";

const categoryConfig: Record<GroceryCategory, { label: string; emoji: string; color: string }> = {
  produce: { label: "Produce", emoji: "🥦", color: "text-emerald-600" },
  proteins: { label: "Proteins", emoji: "🥩", color: "text-red-600" },
  dairy: { label: "Dairy", emoji: "🥛", color: "text-blue-600" },
  grains: { label: "Grains", emoji: "🌾", color: "text-amber-600" },
  pantry: { label: "Pantry", emoji: "🫙", color: "text-orange-600" },
  frozen: { label: "Frozen", emoji: "🧊", color: "text-cyan-600" },
  beverages: { label: "Beverages", emoji: "🧃", color: "text-purple-600" },
  snacks: { label: "Snacks", emoji: "🍿", color: "text-pink-600" },
  condiments: { label: "Condiments", emoji: "🫙", color: "text-yellow-600" },
  other: { label: "Other", emoji: "📦", color: "text-gray-600" },
};

interface GroceryCategoryCardProps {
  category: GroceryCategory;
  items: GroceryItem[];
  onToggleItem: (id: string, checked: boolean) => void;
  className?: string;
}

export function GroceryCategoryCard({
  category,
  items,
  onToggleItem,
  className,
}: GroceryCategoryCardProps) {
  const config = categoryConfig[category];
  const checkedCount = items.filter((i) => i.checked).length;
  const totalCost = items.reduce((sum, i) => sum + i.estimatedPrice, 0);
  const progress = items.length > 0 ? (checkedCount / items.length) * 100 : 0;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{config.emoji}</span>
            <div>
              <p className="text-sm font-semibold">{config.label}</p>
              <p className="text-xs text-muted-foreground">
                {checkedCount}/{items.length} items
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {checkedCount === items.length && items.length > 0 && (
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            )}
            <Badge variant="outline" className="text-xs">
              {formatCurrency(totalCost)}
            </Badge>
          </div>
        </div>
        <Progress value={progress} className="h-1.5 mt-2" />
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex items-center justify-between gap-2 py-1.5 rounded-lg transition-opacity",
              item.checked && "opacity-50"
            )}
          >
            <div className="flex items-center gap-2 min-w-0">
              <Checkbox
                id={`grocery-${item.id}`}
                checked={item.checked}
                onCheckedChange={(v) => onToggleItem(item.id, Boolean(v))}
                aria-label={`Mark ${item.name} as ${item.checked ? "unchecked" : "checked"}`}
              />
              <label
                htmlFor={`grocery-${item.id}`}
                className={cn(
                  "text-sm cursor-pointer truncate",
                  item.checked && "line-through text-muted-foreground"
                )}
              >
                {item.name}
              </label>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-muted-foreground">
                {item.quantity} {item.unit}
              </span>
              <span className="text-xs font-medium">
                {formatCurrency(item.estimatedPrice)}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
