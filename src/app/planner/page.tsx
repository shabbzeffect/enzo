import type { Metadata } from "next";
import { PLANNER_ROOMS } from "@/lib/data/demo";
import { PlannerClient } from "./_planner-client";

export const metadata: Metadata = {
  title: "Budget planner",
  description:
    "Estimate what it costs to furnish a room in Kenya — studio, one-bedroom, two-bedroom or home office. Budgets in KSh, demo estimates.",
};

export default function PlannerPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">Budget planner</h1>
        <p className="mt-2 text-muted text-sm max-w-2xl">
          A rough guide to furnishing a room in Kenya. Pick a room type to see
          essential items, minimum budgets and tips. All figures in KSh — demo
          estimates, not quotes.
        </p>
      </div>
      <PlannerClient rooms={PLANNER_ROOMS} />
    </div>
  );
}
