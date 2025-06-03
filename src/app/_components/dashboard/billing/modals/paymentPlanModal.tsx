const plans = [
  {
    id: "team",
    name: "Team",
    description: "For small teams",
    price: "$15",
    features: [
      "Maximum 49 team members",
      "Access to all features",
      "E-Mail support",
    ],
    seatsMin: 1,
    seatsMax: 49,
  },
  {
    id: "growth",
    name: "Growth",
    description: "For medium scale companies.",
    price: "$13",
    features: [
      "Maximum 199 team members",
      "Access to all features",
      "Phone and E-Mail support",
    ],
    seatsMin: 50,
    seatsMax: 199,
  },
  {
    id: "accelerate",
    name: "Accelerate",
    description: "For large scale companies.",
    price: "$11",
    features: [
      "Maximum 499 team members",
      "Access to all features",
      "Priority 24/7 support",
    ],
    seatsMin: 200,
    seatsMax: 499,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For enterprises.",
    price: "Custom",

    seatsMin: 500,
    seatsMax: 0,
  },
];

type PlanType = {
  id: string;
  name: string;
  price: string;
  features?: string[];
  seatsMin: number;
  seatsMax: number;
  description: string;
};

const PlanComponent = ({
  plan,
  numberOfSeats,
  isSelectedPlan,
}: {
  plan: PlanType;
  numberOfSeats: number;
  isSelectedPlan: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      key={plan.id}
      className={`relative cursor-pointer rounded-lg p-4 transition-all ${isHovered ? "shadow-lg" : "shadow-md"} ${isSelectedPlan || plan.id === "enterprise" ? "border border-gray-300" : "border border-gray-200 opacity-50"}`}
      style={
        isSelectedPlan ? { boxShadow: "0 0 30px 5px rgba(55,55,55,.1)" } : {}
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isSelectedPlan && (
        <span className="absolute -top-[32px] right-0 left-0 mx-auto h-fit w-fit rounded bg-blue-100 px-2 py-1 text-xs font-medium text-nowrap text-blue-700">
          Your Plan based on seats
        </span>
      )}
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="font-medium">{plan.name}</h3>
          <p className="text-sm text-gray-600">{plan.description}</p>
          <div className="mt-2 flex flex-col">
            <span className="text-3xl font-medium">
              {plan.price}
              {isSelectedPlan && <span>*</span>}
            </span>
            <p className="text-sm text-gray-500">per seat / month</p>
          </div>
        </div>
      </div>

      <ul className="space-y-2 text-sm">
        {plan.id !== "enterprise" ? (
          <>
            {plan.features &&
              plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <Check
                    size={16}
                    className="mr-2 flex-shrink-0 text-green-500"
                  />
                  <span>{feature}</span>
                </li>
              ))}
          </>
        ) : (
          <>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
              cupiditate ipsa quisquam exercitationem dolor distinctio
              laboriosam ex eum accusamus voluptatum!
            </p>
          </>
        )}
      </ul>
    </div>
  );
};

import { Check } from "lucide-react";
import React, { useState } from "react";

export default function PaymentPlanModal() {
  return <div></div>;
}
