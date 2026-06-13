import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { CookingChecklist } from "@/components/features/cooking/CookingChecklist";
import { mockCookingTasks } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Cooking Tasks",
  description: "Manage your cooking prep tasks and track progress",
};

export default function CookingPage() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title="Cooking Tasks"
        description="Manage your cooking prep tasks, track progress, and stay on schedule."
        breadcrumbs={[{ href: "/", label: "Overview" }, { label: "Cooking Tasks" }]}
        badge={`${mockCookingTasks.filter((t) => t.status !== "done").length} pending`}
      />
      <SectionCard
        title="This Week's Tasks"
        description="Click a task to expand its steps. Click the status icon to progress it."
      >
        <CookingChecklist tasks={mockCookingTasks} />
      </SectionCard>
    </div>
  );
}
