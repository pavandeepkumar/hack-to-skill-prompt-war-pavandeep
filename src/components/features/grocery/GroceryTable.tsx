"use client";

import { useState } from "react";
import { Search, Filter, MoreHorizontal, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { cn, formatCurrency } from "@/lib/utils";
import type { GroceryItem, GroceryCategory } from "@/types";

const categoryLabels: Record<GroceryCategory, string> = {
  produce: "🥦 Produce",
  proteins: "🥩 Proteins",
  dairy: "🥛 Dairy",
  grains: "🌾 Grains",
  pantry: "🫙 Pantry",
  frozen: "🧊 Frozen",
  beverages: "🧃 Beverages",
  snacks: "🍿 Snacks",
  condiments: "🫙 Condiments",
  other: "📦 Other",
};

interface GroceryTableProps {
  items: GroceryItem[];
  onToggle: (id: string, checked: boolean) => void;
}

export function GroceryTable({ items, onToggle }: GroceryTableProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filtered = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const checkedCount = items.filter((i) => i.checked).length;
  const progress = items.length > 0 ? (checkedCount / items.length) * 100 : 0;
  const totalCost = items.reduce((sum, i) => sum + i.estimatedPrice, 0);
  const checkedCost = items
    .filter((i) => i.checked)
    .reduce((sum, i) => sum + i.estimatedPrice, 0);

  const categories = [
    ...new Set(items.map((i) => i.category)),
  ] as GroceryCategory[];

  return (
    <div className="space-y-4">
      {/* Summary bar */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-muted/50 border">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">
              {checkedCount}/{items.length}
            </p>
            <p className="text-xs text-muted-foreground">Items got</p>
          </div>
          <div className="w-32">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round(progress)}% complete
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold">
            {formatCurrency(checkedCost)} / {formatCurrency(totalCost)}
          </p>
          <p className="text-xs text-muted-foreground">Est. spent / total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search grocery items"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-40" aria-label="Filter by category">
            <Filter className="h-4 w-4 mr-1" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {categoryLabels[cat]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <ScrollArea className="h-[400px] rounded-xl border">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead className="w-12">
                <span className="sr-only">Check</span>
              </TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-center">Qty</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="w-12">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  No items found
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((item) => (
                <TableRow
                  key={item.id}
                  className={cn(
                    "transition-opacity",
                    item.checked && "opacity-50 bg-muted/30"
                  )}
                >
                  <TableCell>
                    <Checkbox
                      id={`table-${item.id}`}
                      checked={item.checked}
                      onCheckedChange={(v) => {
                        onToggle(item.id, Boolean(v));
                        if (v) {
                          toast.success(`${item.name} checked off!`);
                        }
                      }}
                      aria-label={`Mark ${item.name} as ${item.checked ? "unchecked" : "purchased"}`}
                    />
                  </TableCell>
                  <TableCell>
                    <label
                      htmlFor={`table-${item.id}`}
                      className={cn(
                        "text-sm font-medium cursor-pointer",
                        item.checked && "line-through text-muted-foreground"
                      )}
                    >
                      {item.name}
                    </label>
                    {item.notes && (
                      <p className="text-xs text-muted-foreground">{item.notes}</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {categoryLabels[item.category]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center text-sm">
                    {item.quantity} {item.unit}
                  </TableCell>
                  <TableCell className="text-right text-sm font-medium">
                    {formatCurrency(item.estimatedPrice)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => toast.info(`${item.name} removed`)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
