"use client";

import { Search, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { Substitution, DietaryTag } from "@/types";

const dietaryColors: Record<DietaryTag, string> = {
  vegan: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  vegetarian: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "gluten-free": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "dairy-free": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  keto: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "high-protein": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  "low-carb": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

interface SubstitutionCardProps {
  substitutions: Substitution[];
}

export function SubstitutionCard({ substitutions }: SubstitutionCardProps) {
  const [search, setSearch] = useState("");

  const filtered = substitutions.filter(
    (s) =>
      s.original.toLowerCase().includes(search.toLowerCase()) ||
      s.alternatives.some((a) => a.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search ingredients..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search ingredient substitutions"
        />
      </div>

      {/* Substitution cards */}
      <div className="space-y-4">
        {filtered.map((sub) => (
          <Card key={sub.id} className="overflow-hidden">
            <CardHeader className="pb-3 pt-4 px-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <span className="text-sm">🚫</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{sub.original}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {sub.reason} substitute
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs capitalize">
                  {sub.category}
                </Badge>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="p-0">
              <Accordion type="single" collapsible>
                {sub.alternatives.map((alt, i) => (
                  <AccordionItem
                    key={alt.name}
                    value={alt.name}
                    className={cn(i > 0 && "border-t")}
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30">
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary" />
                        <div className="text-left min-w-0">
                          <p className="text-sm font-medium">{alt.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Ratio: {alt.ratio}
                          </p>
                        </div>
                        <div className="flex gap-1 flex-wrap ml-auto">
                          {alt.dietaryTags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className={cn(
                                "text-[10px] px-1.5 py-0.5 rounded-full font-medium",
                                dietaryColors[tag]
                              )}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {alt.notes}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-12 text-center text-muted-foreground">
            <span className="text-4xl mb-2">🔍</span>
            <p className="text-sm font-medium">No substitutions found</p>
            <p className="text-xs">Try searching for a different ingredient</p>
          </div>
        )}
      </div>
    </div>
  );
}
