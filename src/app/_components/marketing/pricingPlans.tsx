"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Plus, Minus, ArrowUpRight } from "lucide-react";

const trialPlan = {
  id: "trial",
  name: "Trial Plan (30 Days)",
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

const pricingPlans = [
  {
    id: "team",
    name: "Team",
    price: 15,
    features: [
      "10 base SOP-paths",
      "25GB base company-storage",
      "5 GB additional storage / seat",
      "3 additional SOP-Paths / seat",
      "E-Mail Support",
    ],
    seatsMin: 1,
    seatsMax: 49,
    baseStorage: 25,
    storagePerSeat: 5,
    baseSopPaths: 10,
    sopPathsPerSeat: 1,
  },
  {
    id: "growth",
    name: "Growth",
    price: 14,
    features: [
      "20 base SOP-paths",
      "50GB base company-storage",
      "10 GB additional storage / seat",
      "4 additional SOP-Paths / seat",
      "Phone and E-Mail Support",
    ],
    seatsMin: 50,
    seatsMax: 199,
    baseStorage: 50,
    storagePerSeat: 10,
    baseSopPaths: 20,
    sopPathsPerSeat: 2,
  },
  {
    id: "accelerate",
    name: "Accelerate",
    price: 13,
    features: [
      "50 base SOP-paths",
      "100GB base company-storage",
      "15 GB additional storage / seat",
      "5 additional SOP-Paths / seat",
      "Priority Support",
    ],
    seatsMin: 200,
    seatsMax: 1000,
    baseStorage: 100,
    storagePerSeat: 15,
    baseSopPaths: 50,
    sopPathsPerSeat: 3,
  },
];

const storageTiers = [
  { size: 200, price: 28, pricePerGB: 0.14 },
  { size: 100, price: 16, pricePerGB: 0.16 },
  { size: 50, price: 9, pricePerGB: 0.18 },
];

const calculateOptimalStorage = (neededGB: number) => {
  if (neededGB <= 0) return { breakdown: [], totalCost: 0 };

  let remaining = neededGB;
  const breakdown = [];

  for (const tier of storageTiers) {
    if (remaining <= 0) break;

    const count = Math.floor(remaining / tier.size);
    if (count > 0) {
      breakdown.push({
        count,
        size: tier.size,
        price: tier.price,
        totalPrice: count * tier.price,
      });
      remaining -= count * tier.size;
    }
  }

  if (remaining > 0) {
    const smallestTier = storageTiers[storageTiers.length - 1];
    const existingSmallest = breakdown.find(
      (b) => b.size === smallestTier!.size,
    );

    if (existingSmallest) {
      existingSmallest.count += 1;
      existingSmallest.totalPrice += smallestTier!.price;
    } else {
      breakdown.push({
        count: 1,
        size: smallestTier!.size,
        price: smallestTier!.price,
        totalPrice: smallestTier!.price,
      });
    }
  }

  const totalCost = breakdown.reduce((sum, item) => sum + item.totalPrice, 0);

  return { breakdown, totalCost };
};

export default function PricingCalculator() {
  const [seats, setSeats] = useState(50);
  const [requiredStorage, setRequiredStorage] = useState(100);
  const [additionalSopPaths, setAdditionalSopPaths] = useState(0);

  const getCurrentPlan = () => {
    return (
      pricingPlans.find(
        (plan) => seats >= plan.seatsMin && seats <= plan.seatsMax,
      ) || pricingPlans[pricingPlans.length - 1]
    );
  };

  const currentPlan = getCurrentPlan();

  const seatStorage = seats * currentPlan!.storagePerSeat;
  const includedStorage = currentPlan!.baseStorage + seatStorage;
  const includedSopPaths =
    currentPlan!.baseSopPaths + seats * currentPlan!.sopPathsPerSeat;

  const storageNeeded = Math.max(0, requiredStorage - includedStorage);
  const storageCalculation = calculateOptimalStorage(storageNeeded);

  const baseCost = seats * currentPlan!.price;
  const additionalStorageCost = storageCalculation.totalCost;
  const additionalSopPathsCost = additionalSopPaths * 5;
  const totalMonthlyCost =
    baseCost + additionalStorageCost + additionalSopPathsCost;

  const handleSeatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeats(parseInt(e.target.value));
  };

  const handleStorageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? 0 : parseInt(e.target.value);
    setRequiredStorage(value);
  };

  return (
    <div
      className="relative h-fit w-screen border-t border-[#1c1c1c]"
      style={{
        background:
          "linear-gradient(3deg,rgba(0, 0, 0, 0.3) 0%, rgba(44, 44, 44, 0.4) 60%, rgba(12, 12, 12, 1) 100%)",
      }}
    >
      <div className="mx-auto flex w-[70%] max-w-7xl flex-col gap-[10vh] py-[10vh]">
        <h3 className="w-4/6 text-4xl font-medium text-balance text-white">
          Pay as you go - No hidden fees. <br /> Just one plan, auto upgrades
          and optional add-ons.
        </h3>
        <div className="pointer-events-none absolute top-0 left-0 h-full w-full bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
        <div className="flex flex-col items-start gap-10">
          <h3 className="text-start text-2xl text-white">Pricing Tiers</h3>

          <div className="flex w-full flex-col gap-4">
            <div className="grid grid-cols-3 gap-4">
              {pricingPlans.map((plan, idx) => (
                <div
                  key={plan.id}
                  className={`col-span-1 flex flex-col justify-end gap-4 rounded-md border border-[#acacac]/5 bg-[#acacac]/3 p-4 py-4 text-white transition-all duration-300`}
                >
                  <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-medium text-white">
                      {plan.name}
                    </h2>
                    <div className="flex flex-col">
                      <span className="text-3xl font-medium">
                        ${plan.price}*
                      </span>
                      <p className="text-sm text-[#acacac]">per seat / month</p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div>
                      <p className="text-[#acacac]">
                        {plan.seatsMin === plan.seatsMax
                          ? `${plan.seatsMin}+ seats`
                          : `${plan.seatsMin}-${plan.seatsMax} seats`}
                      </p>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {plan.features.map((feature, idx) => (
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
              ))}
            </div>
            <div className="relative flex aspect-[3/1] h-full w-full flex-col items-center justify-center overflow-hidden rounded-md border border-[#444]/50 bg-[#2a2a2a]/30 p-4">
              <h3 className="text-3xl font-medium text-white">
                Start for free
              </h3>
              {trialPlan.features.map((feature, idx) => (
                <p
                  key={idx}
                  className="text-sm text-[#acacac]/50"
                  style={{ marginBottom: "0.5rem" }}
                >
                  {feature}
                </p>
              ))}
              <button className="w-full transform rounded-lg px-6 py-4 text-lg font-medium text-white transition-all duration-300">
                Start Your Trial
              </button>
            </div>
            <p className="text-sm text-[#acacac]/60">
              *Each seat is billed according to its tier - not all at a flat
              rate. Your invoice will reflect a mix of per-seat prices.
            </p>
          </div>
          <div className="flex w-full items-center justify-center">
            <button className="inline-flex h-12 w-fit items-center gap-2 rounded-md border border-[#acacac]/10 bg-[#acacac]/3 px-4 py-2 text-sm text-white shadow-lg transition-all duration-300">
              Learn how billing works <ArrowUpRight />
            </button>
          </div>
        </div>
        <div className="flex w-full flex-col gap-10">
          <h3 className="text-2xl text-white">Additional Add-Ons</h3>
          <div className="flex flex-col gap-4">
            <div className="rounded-md border border-[#acacac]/5 bg-[#acacac]/3 p-4">
              <table className="w-full table-auto border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="border-b border-[#acacac]/10">
                    <th></th>
                    <th className="w-1/4 border-x border-[#acacac]/10 px-4 py-2 font-normal">
                      Base
                    </th>
                    <th className="w-1/4 border-r border-[#acacac]/10 px-4 py-2 font-normal">
                      11% off
                    </th>
                    <th className="w-1/4 px-4 py-2 font-normal">22% off</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#acacac]/10">
                    <td className="border-r border-[#acacac]/10 px-4 py-2">
                      Storage Quota
                    </td>
                    <td className="border-r border-[#acacac]/10 px-4 py-2 text-[#acacac]/60">
                      $9 / 50GB / month
                    </td>
                    <td className="border-r border-[#acacac]/10 px-4 py-2 text-[#acacac]/60">
                      $16 / 100GB / month
                    </td>
                    <td className="px-4 py-2 text-[#acacac]/60">
                      $28 / 200GB / month
                    </td>
                  </tr>
                  <tr>
                    <td className="border-r border-[#acacac]/10 px-4 py-2">
                      Extra SOP-Paths
                    </td>
                    <td className="border-r border-[#acacac]/10 px-4 py-2 text-[#acacac]/60">
                      $10 / 20 SOP-paths / month
                    </td>
                    <td className="border-r border-[#acacac]/10 px-4 py-2 text-[#acacac]/60">
                      $18 / 40 SOP-paths / month
                    </td>
                    <td className="px-4 py-2 text-[#acacac]/60">
                      $32 / 80 SOP-paths / month
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-[#acacac]/60">
              *Extra storage is billed by combining preset tiers to give you the
              best price for your needed capacity.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <h3 className="text-2xl text-white">Get a Quote</h3>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 space-y-8 rounded-md border border-[#444]/50 bg-[#2a2a2a]/30 p-4">
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-white">
                    How many Employees do you have?
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="1"
                      max="500"
                      value={seats}
                      onChange={handleSeatsChange}
                      className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#333]"
                      style={{
                        background: `linear-gradient(to right, #acacacad 0%, #acacacad ${(seats / 500) * 100}%, #333 ${(seats / 500) * 100}%, #333 100%)`,
                      }}
                    />
                    <div className="text-center font-medium text-white">
                      {seats}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-[#acacac]">
                  <span>1</span>
                  <span>500+</span>
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-white">
                    How much Storage do you need?
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={requiredStorage}
                    onChange={handleStorageChange}
                    className="w-full rounded-lg border border-[#acacac]/10 bg-[#acacac]/3 p-3 text-white placeholder-[#acacac]"
                    placeholder="Enter storage needed in GB"
                  />
                </div>
                <p className="text-sm text-[#acacac]">
                  Your plan includes {includedStorage} GB.
                  {storageNeeded > 0 && (
                    <span className="text-[#acacac]/70">
                      {" "}
                      You need {storageNeeded} GB more.
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="col-span-2 flex flex-col gap-4">
              <div className="flex flex-col gap-4 rounded-md border border-[#444]/50 bg-[#2a2a2a]/30 p-4">
                <h4 className="text-white">Quota Breakdown</h4>
                <table className="w-full table-auto border-collapse text-left text-sm text-white">
                  <thead>
                    <tr className="border-b border-[#acacac]/10">
                      <th className="w-1/3"></th>
                      <th className="w-1/3 border-x border-[#acacac]/10 px-4 py-2 font-normal">
                        Storage
                      </th>
                      <th className="w-1/3 border-[#acacac]/10 px-4 py-2 font-normal">
                        SOP-Paths
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#acacac]/10">
                      <td className="border-r border-[#acacac]/10 px-4 py-2">
                        Your base Quota
                      </td>
                      <td className="border-r border-[#acacac]/10 px-4 py-2 text-[#acacac]/60">
                        {includedStorage} GB
                      </td>
                      <td className="px-4 py-2 text-[#acacac]/60">
                        {includedSopPaths} SOP-paths
                      </td>
                    </tr>
                    <tr className="border-[#acacac]/10">
                      <td className="border-r border-[#acacac]/10 px-4 py-2">
                        Additional Quota
                      </td>
                      <td className="border-r border-[#acacac]/10 px-4 py-2 text-[#acacac]/60">
                        {storageNeeded > 0 ? storageNeeded : 0} GB
                      </td>
                      <td className="px-4 py-2 text-[#acacac]/60">
                        {additionalSopPaths * 20} SOP-paths
                      </td>
                    </tr>
                  </tbody>
                </table>

                {storageCalculation.breakdown.length > 0 && (
                  <div className="mt-4 h-30">
                    <h5 className="mb-2 text-white">
                      Storage Breakdown (Optimized Pricing):
                    </h5>
                    <div className="space-y-1">
                      {storageCalculation.breakdown.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-[#acacac]/60">
                            {item.count} × {item.size}GB at ${item.price}/month
                          </span>
                          <span className="text-[#acacac]/70">
                            ${item.totalPrice}/month
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-md border border-[#acacac]/5 bg-[#acacac]/3 p-4">
                <h4 className="mb-6 text-white">Pricing Summary</h4>

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#444] pb-2">
                    <span className="text-[#acacac]">Current Plan:</span>
                    <span className="font-medium text-white">
                      {currentPlan!.name}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#acacac]">
                      Base Cost ({seats} seats × ${currentPlan!.price}):
                    </span>
                    <span className="text-white">${baseCost}/month</span>
                  </div>

                  {additionalStorageCost > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-[#acacac]">
                        Additional Storage:
                      </span>
                      <span className="text-[#acacac]/70">
                        ${additionalStorageCost}/month
                      </span>
                    </div>
                  )}

                  {additionalSopPathsCost > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-[#acacac]">
                        Additional SOP-Paths:
                      </span>
                      <span className="text-[#acacac]/70">
                        ${additionalSopPathsCost}/month
                      </span>
                    </div>
                  )}

                  <div className="pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Total Monthly Cost:</span>
                      <span className="text-xl text-white">
                        ${totalMonthlyCost} / month
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button className="rouneded-md to-[#acacac](20) inline-flex h-12 w-fit items-center gap-2 overflow-hidden rounded-md border border-[#acacac]/10 bg-gradient-to-tr from-[#acacac]/10 px-4 py-2 text-sm text-white shadow-lg transition-all duration-300">
            Find out what your subscription goes toward <ArrowUpRight />
          </button>
          <button className="rouneded-md to-[#acacac](20) inline-flex h-12 w-fit items-center gap-2 overflow-hidden rounded-md border border-[#acacac]/10 bg-white px-4 py-2 text-sm text-black shadow-lg transition-all duration-300">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
}
