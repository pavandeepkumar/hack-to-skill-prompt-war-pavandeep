"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { AddGroceryItemSheet } from "@/components/features/grocery/AddGroceryItemSheet";
import { GroceryTable } from "@/components/features/grocery/GroceryTable";
import { GroceryCategoryCard } from "@/components/shared/GroceryCategoryCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockGroceryList } from "@/lib/mock-data";
import type { GroceryItem, GroceryCategory } from "@/types";

export default function GroceryPage() {
  const [items, setItems] = useState<GroceryItem[]>(mockGroceryList.items);

  function toggleItem(id: string, checked: boolean) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked } : item))
    );
  }

  // Group items by category
  const categories = [
    ...new Set(items.map((i) => i.category)),
  ] as GroceryCategory[];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title="Grocery List"
        description="Track your weekly groceries, mark items as purchased, and stay on budget."
        breadcrumbs={[{ href: "/", label: "Overview" }, { label: "Grocery List" }]}
        actions={<AddGroceryItemSheet />}
      />

      <Tabs defaultValue="table">
        <TabsList className="mb-4">
          <TabsTrigger value="table" id="grocery-tab-table">
            Table View
          </TabsTrigger>
          <TabsTrigger value="category" id="grocery-tab-category">
            By Category
          </TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <SectionCard
            title="All Items"
            description={`${items.length} items · Est. $${mockGroceryList.totalEstimated}`}
            noPadding={false}
          >
            <GroceryTable items={items} onToggle={toggleItem} />
          </SectionCard>
        </TabsContent>

        <TabsContent value="category">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <GroceryCategoryCard
                key={cat}
                category={cat}
                items={items.filter((i) => i.category === cat)}
                onToggleItem={toggleItem}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
