"use client";

import Link from "next/link";
import React, { useState } from "react";

export type PricingTier = "trial" | "basic" | "professional" | "enterprise";

export interface PricingFeature {
  name: string;
  description: string;
  included: boolean;
}

export interface PricingRestriction {
  type: "paths" | "storage" | "users" | "integrations" | "support";
  limit: number | string | null;
  unit?: string;
}

export interface PricingPlan {
  id: string;
  tier: PricingTier;
  name: string;
  price: number | null;
  billingCycle: "monthly" | "annual" | "free";
  description: string;
  recommendedCompanySize: {
    min: number;
    max: number | null;
  };
  features: PricingFeature[];
  restrictions: PricingRestriction[];
  trialDays?: number;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "plan_trial",
    tier: "trial",
    name: "Free Trial",
    price: null,
    billingCycle: "free",
    description: "Experience the full platform capabilities for 30 days.",
    recommendedCompanySize: {
      min: 1,
      max: 100,
    },
    trialDays: 30,
    features: [
      {
        name: "Workflow Path Recording",
        description: "Record step-by-step guides for any web-based software",
        included: true,
      },
      {
        name: "SOP Documentation",
        description: "Create and store standard operating procedures",
        included: true,
      },
      {
        name: "Guided Walkthroughs",
        description: "Interactive overlay guidance for new employees",
        included: true,
      },
      {
        name: "Basic Analytics",
        description: "Track completion rates and time spent",
        included: true,
      },
      {
        name: "Email Support",
        description: "Get help when you need it",
        included: true,
      },
    ],
    restrictions: [
      {
        type: "paths",
        limit: 10,
        unit: "paths",
      },
      {
        type: "storage",
        limit: 2,
        unit: "GB",
      },
      {
        type: "users",
        limit: 10,
        unit: "users",
      },
      {
        type: "integrations",
        limit: 2,
        unit: "integrations",
      },
      {
        type: "support",
        limit: "Email only",
      },
    ],
  },
  {
    id: "plan_basic",
    tier: "basic",
    name: "Basic",
    price: 15,
    billingCycle: "monthly",
    description: "Perfect for small teams focusing on knowledge documentation.",
    recommendedCompanySize: {
      min: 5,
      max: 50,
    },
    features: [
      {
        name: "Workflow Path Recording",
        description: "Record step-by-step guides for any web-based software",
        included: true,
      },
      {
        name: "SOP Documentation",
        description: "Create and store standard operating procedures",
        included: true,
      },
      {
        name: "Guided Walkthroughs",
        description: "Interactive overlay guidance for new employees",
        included: true,
      },
      {
        name: "Basic Analytics",
        description: "Track completion rates and time spent",
        included: true,
      },
      {
        name: "Email Support",
        description: "Get help when you need it",
        included: true,
      },
      {
        name: "Custom Branding",
        description: "Add your company logo and colors",
        included: false,
      },
      {
        name: "Advanced Analytics",
        description: "Detailed insights and custom reports",
        included: false,
      },
    ],
    restrictions: [
      {
        type: "paths",
        limit: 25,
        unit: "paths",
      },
      {
        type: "storage",
        limit: 5,
        unit: "GB",
      },
      {
        type: "users",
        limit: 50,
        unit: "users",
      },
      {
        type: "integrations",
        limit: 3,
        unit: "integrations",
      },
      {
        type: "support",
        limit: "Email only",
      },
    ],
  },
  {
    id: "plan_professional",
    tier: "professional",
    name: "Professional",
    price: 35,
    billingCycle: "monthly",
    description:
      "Designed for growing businesses with comprehensive knowledge needs.",
    recommendedCompanySize: {
      min: 25,
      max: 200,
    },
    features: [
      {
        name: "Workflow Path Recording",
        description: "Record step-by-step guides for any web-based software",
        included: true,
      },
      {
        name: "SOP Documentation",
        description: "Create and store standard operating procedures",
        included: true,
      },
      {
        name: "Guided Walkthroughs",
        description: "Interactive overlay guidance for new employees",
        included: true,
      },
      {
        name: "Custom Branding",
        description: "Add your company logo and colors",
        included: true,
      },
      {
        name: "Advanced Analytics",
        description: "Detailed insights and custom reports",
        included: true,
      },
      {
        name: "Priority Support",
        description: "Get faster responses when you need help",
        included: true,
      },
      {
        name: "API Access",
        description: "Connect with your existing systems",
        included: false,
      },
      {
        name: "Dedicated Success Manager",
        description: "Personalized guidance and strategy",
        included: false,
      },
    ],
    restrictions: [
      {
        type: "paths",
        limit: 100,
        unit: "paths",
      },
      {
        type: "storage",
        limit: 20,
        unit: "GB",
      },
      {
        type: "users",
        limit: 200,
        unit: "users",
      },
      {
        type: "integrations",
        limit: 10,
        unit: "integrations",
      },
      {
        type: "support",
        limit: "Email + Chat",
      },
    ],
  },
  {
    id: "plan_enterprise",
    tier: "enterprise",
    name: "Enterprise",
    price: 75,
    billingCycle: "monthly",
    description:
      "Complete solution for large organizations with complex knowledge transfer needs.",
    recommendedCompanySize: {
      min: 100,
      max: null,
    },
    features: [
      {
        name: "Workflow Path Recording",
        description: "Record step-by-step guides for any web-based software",
        included: true,
      },
      {
        name: "SOP Documentation",
        description: "Create and store standard operating procedures",
        included: true,
      },
      {
        name: "Guided Walkthroughs",
        description: "Interactive overlay guidance for new employees",
        included: true,
      },
      {
        name: "Custom Branding",
        description: "Add your company logo and colors",
        included: true,
      },
      {
        name: "Advanced Analytics",
        description: "Detailed insights and custom reports",
        included: true,
      },
      {
        name: "API Access",
        description: "Connect with your existing systems",
        included: true,
      },
      {
        name: "Dedicated Success Manager",
        description: "Personalized guidance and strategy",
        included: true,
      },
      {
        name: "Single Sign-On (SSO)",
        description: "Enterprise-grade security and authentication",
        included: true,
      },
      {
        name: "Custom Integrations",
        description: "Build specialized connections to your tools",
        included: true,
      },
    ],
    restrictions: [
      {
        type: "paths",
        limit: null,
        unit: "paths",
      },
      {
        type: "storage",
        limit: 100,
        unit: "GB",
      },
      {
        type: "users",
        limit: null,
        unit: "users",
      },
      {
        type: "integrations",
        limit: null,
        unit: "integrations",
      },
      {
        type: "support",
        limit: "Priority Support",
      },
    ],
  },
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly",
  );

  const getPrice = (plan: PricingPlan) => {
    if (plan.price === null) return "Free";
    const price =
      billingCycle === "annual" ? plan.price * 0.8 * 12 : plan.price;
    return `$${price}/user/${billingCycle === "annual" ? "year" : "month"}`;
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <div className="flex flex-col items-center gap-y-[10vh] py-[10vh]">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <h1 className="w-[60%] text-5xl tracking-tight sm:text-[4.25rem]">
              Pricing
            </h1>
            <p className="w-[60%]">
              Transform your employee onboarding and knowledge transfer with
              Knovolo. Choose the plan that best fits your organization's size
              and needs.
            </p>
            <div className="mb-12 flex items-center justify-center">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`rounded-l-md px-4 py-2 ${billingCycle === "monthly" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                Monthly billing
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`rounded-r-md px-4 py-2 ${billingCycle === "annual" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                Annual billing (20% off)
              </button>
            </div>

            {/* Pricing cards */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {pricingPlans
                .filter((plan) => plan.tier !== "trial")
                .map((plan) => (
                  <div
                    key={plan.id}
                    className="flex flex-col overflow-hidden rounded-lg shadow-lg"
                  >
                    <div className="border-b bg-gray-50 p-6">
                      <h2 className="text-2xl font-bold">{plan.name}</h2>
                      <div className="mt-4">
                        <span className="text-3xl font-bold">
                          {getPrice(plan)}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-600">{plan.description}</p>
                    </div>

                    <div className="flex-grow p-6">
                      <h3 className="mb-4 font-semibold">Features</h3>
                      <ul className="space-y-3">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <span
                              className={`mt-1 mr-2 ${feature.included ? "text-green-500" : "text-gray-400"}`}
                            >
                              {feature.included ? "✓" : "×"}
                            </span>
                            <div>
                              <p className="font-medium">{feature.name}</p>
                              <p className="text-sm text-gray-500">
                                {feature.description}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Card body - Restrictions */}
                    <div className="px-6 pb-6">
                      <h3 className="mb-4 font-semibold">Limits</h3>
                      <ul className="space-y-2">
                        {plan.restrictions.map((restriction, idx) => (
                          <li key={idx} className="flex justify-between">
                            <span className="text-gray-600 capitalize">
                              {restriction.type}:
                            </span>
                            <span className="font-medium">
                              {restriction.limit === null
                                ? "Unlimited"
                                : `${restriction.limit} ${restriction.unit || ""}`}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Card footer */}
                    <div className="mt-auto border-t p-6">
                      <button className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700">
                        {plan.tier === "trial"
                          ? "Start Free Trial"
                          : "Choose Plan"}
                      </button>
                      {plan.trialDays && (
                        <p className="mt-2 text-center text-sm text-gray-500">
                          Includes {plan.trialDays}-day free trial
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>

            {/* Trial banner */}
            <div className="mt-12 rounded-lg border border-blue-100 bg-blue-50 p-6">
              <h2 className="mb-2 text-xl font-bold">Not ready to commit?</h2>
              <p className="mb-4">
                Try our 30-day free trial with full access to basic features.
              </p>
              <button className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
