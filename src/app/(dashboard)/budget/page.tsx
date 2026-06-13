import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { BudgetDashboard } from "@/components/features/budget/BudgetDashboard";
import { mockBudgetData } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Budget",
  description: "Track your food budget and spending by category",
};

export default function BudgetPage() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title="Budget Analysis"
        description="Track your monthly food spending by category and week."
        breadcrumbs={[{ href: "/", label: "Overview" }, { label: "Budget" }]}
      />
      <BudgetDashboard budget={mockBudgetData} />
    </div>
  );
}
