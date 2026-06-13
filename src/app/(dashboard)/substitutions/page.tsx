import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { SubstitutionCard } from "@/components/features/substitutions/SubstitutionCard";
import { mockSubstitutions } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Substitutions",
  description: "Find ingredient substitutes for dietary needs and budget",
};

export default function SubstitutionsPage() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title="Ingredient Substitutions"
        description="Find the best substitutes for ingredients based on dietary needs, budget, or availability."
        breadcrumbs={[
          { href: "/", label: "Overview" },
          { label: "Substitutions" },
        ]}
        badge={`${mockSubstitutions.length} guides`}
      />
      <SectionCard
        title="Substitution Guide"
        description="Search by ingredient to find alternatives. Click each alternative to see usage notes."
      >
        <SubstitutionCard substitutions={mockSubstitutions} />
      </SectionCard>
    </div>
  );
}
