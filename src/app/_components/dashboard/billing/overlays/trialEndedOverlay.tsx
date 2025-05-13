
import { Check } from "lucide-react";
import { useState } from "react";
import { api } from "~/trpc/react";

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

export default function TrialEndedOverlayModal() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  const numberOfSeats = 236;

  const selectedPlan = plans.find(
    (plan) => plan.seatsMin <= numberOfSeats && plan.seatsMax >= numberOfSeats,
  );

  if (!selectedPlan) return null;

  const billingPlanMutation =
    api.billing.handleBillingPlanConfirm.useMutation();

  const handleBillingPlanConfirm = async ({
    e,
  }: {
    e: React.MouseEvent<HTMLButtonElement>;
  }) => {
    const res = await billingPlanMutation.mutateAsync();
    console.log(res);
  };

  return (
    <div className="absolute top-0 left-0 z-[999999999] flex h-screen w-screen items-center justify-center p-[10vh] backdrop-blur-lg">
      <div
        className="flex h-full w-full flex-col justify-between gap-4 overflow-y-scroll rounded-lg bg-white p-6 shadow-2xl"
        style={{ boxShadow: "0 0 30px 5px rgba(0,0,0,0.2)" }}
      >
        <div className="mb-6 flex flex-col gap-2">
          <p className="text-lg font-medium">
            Your trial has expired - Let's keep the momentum going!
          </p>
          <p className="text-gray-600">
            To continue using Knovolo at its full capacity and allow your
            employees access, please consider upgrading.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-6 gap-y-12 md:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan) => (
              <PlanComponent
                numberOfSeats={numberOfSeats}
                key={plan.id}
                plan={plan}
                isSelectedPlan={plan.id === selectedPlan.id}
              />
            ))}
          </div>

          <p className="text-sm text-gray-500">
            *Billed amount is calculated based on the peak number of seats
            during a given period.
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 underline hover:text-gray-800"
          >
            Stop using Knovolo
          </button>
          <button
            onClick={(e) => handleBillingPlanConfirm({ e })}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Continue with {selectedPlan.name}
          </button>
        </div>
      </div>
    </div>
  );
}
