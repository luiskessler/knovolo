import { Check, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import React, { type Dispatch, type SetStateAction } from "react";

type BillingPlanSectionProps = {
  currentPlan: string;
  onUpgrade: () => void;
  selectedPlan: string;
  setSelectedPlan: Dispatch<SetStateAction<string>>;
};

export default function BillingPlanSection({
  currentPlan,
  onUpgrade,
  selectedPlan,
  setSelectedPlan,
}: BillingPlanSectionProps) {
  const plans = [
    {
      id: "onboarding",
      name: "Starter",
      price: "Free",
      features: [
        "1 team member",
        "3 projects",
        "Basic analytics",
        "Community support",
      ],
      recommended: false,
    },
    {
      id: "team",
      name: "Team",
      price: "$20",
      period: "per month",
      features: [
        "10 team members",
        "Unlimited projects",
        "Advanced analytics",
        "Priority support",
      ],
      recommended: true,
    },
    {
      id: "growth",
      name: "Growth",
      price: "$50",
      period: "per month",
      features: [
        "25 team members",
        "Unlimited projects",
        "Advanced analytics",
        "24/7 support",
        "Custom integrations",
      ],
      recommended: false,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      features: [
        "Unlimited team members",
        "Unlimited projects",
        "Advanced analytics",
        "Dedicated support",
        "Custom integrations",
        "SLA guarantees",
      ],
      recommended: false,
    },
  ];

  if (currentPlan === "onboarding") {
    return (
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <div className="flex w-full items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-4">
          <div className="flex flex-col">
            <h2 className="text-lg font-medium">Billing Plan</h2>
            <p className="text-sm text-gray-500">
              Select a plan that fits your needs
            </p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-md border border-gray-300 bg-black px-3 py-1.5 text-sm text-white hover:bg-gray-800">
              View Usage
            </button>
            <button className="rounded-md border border-gray-300 bg-black px-3 py-1.5 text-sm text-white hover:bg-gray-800">
              View Invoices
            </button>
          </div>
        </div>

        <div className="m-4 flex h-[20vh] flex-col items-center justify-center p-4 text-center">
          <p>Your Trial Period will remain active for 30 days.</p>
          <p className="flex flex-wrap justify-around gap-x-2">
            After the trial period ends you will lose access to your account
            until you upgrade to a paid Plan.{" "}
            <span className="whitespace-nowrap">
              <Link
                href="/settings/billing"
                className="inline-flex items-center gap-2 text-blue-500 underline"
              >
                Pricing and Plans <SquareArrowOutUpRight size={18} />
              </Link>
            </span>
          </p>
        </div>
      </div>
    );
  }

  if (currentPlan !== "onboarding") {
    return (
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <div className="w-full border-b border-gray-200 bg-gray-50 px-4 py-4">
          <h2 className="text-lg font-medium">Billing Plan</h2>
          <p className="text-sm text-gray-500">
            Select a plan that fits your needs
          </p>
        </div>

        <div className="p-4">
          <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`cursor-pointer rounded-lg border p-4 transition-all ${
                  selectedPlan === plan.id
                    ? "border-gray-500 ring-1 ring-gray-500"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{plan.name}</h3>
                    <div className="flex items-end">
                      <span className="text-xl font-bold">{plan.price}</span>
                      {plan.period && (
                        <span className="ml-1 text-sm text-gray-500">
                          {plan.period}
                        </span>
                      )}
                    </div>
                  </div>
                  {plan.recommended && (
                    <span className="rounded bg-gray-100 px-2 py-1 text-xs text-black">
                      Recommended
                    </span>
                  )}
                </div>

                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check
                        size={16}
                        className="mr-2 flex-shrink-0 text-green-500"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {currentPlan === plan.id ? (
                  <button className="mt-4 w-full rounded bg-gray-100 px-4 py-2 font-medium text-gray-800">
                    Current Plan
                  </button>
                ) : (
                  <button
                    className="mt-4 w-full rounded bg-black px-4 py-2 font-medium text-white transition-colors hover:bg-gray-800"
                    onClick={onUpgrade}
                  >
                    {plan.id === "enterprise" ? "Contact Sales" : "Upgrade"}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="rounded border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm">
              Your current plan is{" "}
              <span className="font-medium">
                {plans.find((p) => p.id === currentPlan)?.name || "Starter"}
              </span>
              .
              {currentPlan !== "enterprise" &&
                " To upgrade or change your plan, select an option above."}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
