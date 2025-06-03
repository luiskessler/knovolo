import { Check, CheckCircle, ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Carousel, Card } from "~/app/_components/common/ui/horizontalCarousel";

const freePlan = {
  id: "free",
  name: "Free",
  price: "Free",
  features: [
    "Unlimited seats",
    "250 MB / seat",
    "3 SOP-paths / seats",
    "Pooled Document and SOP Storage",
  ],
  seatsMin: 1,
  seatsMax: 49,
};

const plans = [
  {
    id: "team",
    name: "Team",
    price: "$15",
    features: [
      "Maximum 49 team members",
      "Access to all features",
      "E-Mail support",
    ],
    recommended: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: "$13",
    features: [
      "Maximum 199 team members",
      "Access to all features",
      "Phone and E-Mail support",
    ],
    recommended: true,
  },
  {
    id: "accelerate",
    name: "Accelerate",
    price: "$11",
    features: [
      "Maximum 499 team members",
      "Access to all features",
      "Priority 24/7 support",
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

export default function ChoosePlanOnboardingOverlay() {
  const [selectedPlan, setSelectedPlan] = useState<string>();
  const session = useSession();

  const carouselItems = plans.map((plan, index) => (
    <Card
      key={plan.id}
      layout
      card={{
        title: plan.name,
        category: plan.price,
        content: (
          <div className="space-y-2">
            {plan.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-neutral-700 dark:text-white"
              >
                <Check className="h-4 w-4 text-green-500" />
                <span>{feature}</span>
              </div>
            ))}
            <button
              onClick={() => setSelectedPlan(plan.id)}
              className={`mt-6 w-full rounded-lg px-4 py-2 text-white ${
                selectedPlan === plan.id
                  ? "bg-green-600"
                  : "bg-neutral-800 hover:bg-neutral-700"
              }`}
            >
              {selectedPlan === plan.id ? "Selected" : "Choose Plan"}
            </button>
          </div>
        ),
      }}
    />
  ));

  return (
    <div className="flex h-full flex-col gap-[10vh] rounded-lg border border-[#acacac]/10 bg-[#acacac]/5 p-4">
      <div className="flex flex-col gap-4">
        <p className="text-lg font-medium text-white">
          First things first, what kind of plan do you need?
        </p>
      </div>
      <div className="flex h-full flex-col gap-4">
        <p className="text-[#acacac]">Here&apos;s what you can go with:</p>

        <div className="flex h-full w-full gap-4 rounded-lg text-white">
          <div className="flex h-full w-56 min-w-56 flex-col items-center gap-4 md:w-112 md:min-w-112">
            <div
              className={`flex h-full w-full flex-col gap-4 rounded-md border border-[#acacac]/5 bg-[#acacac]/3 p-4 py-4 text-white transition-all duration-300`}
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-medium text-white">
                  Free 30 Day Trial
                </h2>
                <div className="flex flex-col">
                  <span className="text-3xl font-medium">$0*</span>
                  <p className="text-sm text-[#acacac]">per seat / month</p>
                </div>
              </div>
              <div className="flex flex-col">
                <div>
                  <p className="text-[#acacac]">Infinite Seats</p>
                </div>
                <ul className="mt-2 space-y-1">
                  {freePlan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-[#acacac]/50"
                    >
                      <CheckCircle className="mt-1 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              className="inline-flex h-12 w-fit items-center gap-2 rounded-md border border-[#acacac]/10 bg-[#acacac]/3 px-4 py-2 text-sm text-white shadow-lg transition-all duration-300"
              style={{ boxShadow: "0 0 10px rgba(255,255,255,0.3)" }}
            >
              Start Free Trial <ChevronRight />
            </button>
          </div>
          <div className="flex h-full w-full flex-col items-center gap-4 overflow-hidden rounded-md">
            <Carousel items={carouselItems} />
            <button className="inline-flex h-12 w-fit items-center gap-2 rounded-md border border-[#acacac]/10 bg-[#acacac]/3 px-4 py-2 text-sm text-white shadow-lg transition-all duration-300">
              Continue with a paid Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
