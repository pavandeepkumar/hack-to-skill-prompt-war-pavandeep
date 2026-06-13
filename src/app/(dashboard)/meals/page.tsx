import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { AddMealDialog } from "@/components/features/meal-plan/AddMealDialog";
import { MealPlanGrid } from "@/components/features/meal-plan/MealPlanGrid";
import { mockMealPlan } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Meal Plan",
  description: "View and manage your weekly meal plan",
};

export default function MealsPage() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title="Meal Plan"
        description="Plan and manage your meals for the week of Jun 13–19, 2026."
        badge="Week 24"
        breadcrumbs={[{ href: "/", label: "Overview" }, { label: "Meal Plan" }]}
        actions={<AddMealDialog />}
      />

      <SectionCard
        title="This Week's Meals"
        description={`${mockMealPlan.days.length} days planned · $${mockMealPlan.totalCost} total est.`}
      >
        <MealPlanGrid mealPlan={mockMealPlan} />
      </SectionCard>
    </div>
  );
}
