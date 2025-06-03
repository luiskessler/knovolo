import { Dot } from "lucide-react";
import React from "react";

type StepDisplayProps = {
  currentStep: string;
  planType: "free" | "paid";
};

type StepItemProps = {
  step: string;
  status: "current" | "upcoming" | "completed";
};

const stepTitles: Record<string, string> = {
  choosePlan: "Choose Plan",
  paidPlan: "Paid Plan",
  freeTrial: "Start Free Trial",
  additionalUpgrades: "Additional Upgrades",
  contactInformation: "Contact Information",
  billingInformation: "Billing Information",
  paymentMethod: "Payment Method",
  complete: "Complete",
};

const freeTrialSteps = [
  "choosePlan",
  "freeTrial",
  "contactInformation",
  "complete",
];

const paidPlanSteps = [
  "choosePlan",
  "paidPlan",
  "additionalUpgrades",
  "contactInformation",
  "billingInformation",
  "paymentMethod",
  "complete",
];

function StepItem({ step, status }: StepItemProps) {
  const baseClass = "text-sm font-medium";
  const statusClass =
    status === "current"
      ? "text-white font-bold"
      : status === "completed"
        ? "text-[#acacac]/60"
        : "text-[#acacac]/30";

  // Dot color based on status
  const dotClass =
    status === "current"
      ? "bg-white"
      : status === "completed"
        ? "bg-[#acacac]/60"
        : "bg-[#acacac]/30";

  return (
    <div className={`flex w-fit flex-col gap-1 ${statusClass}`}>
      <div className="flex items-center gap-2">
        <div className={`size-3 rounded-full ${dotClass}`}></div>
        <span className={baseClass}>{step}</span>
      </div>
    </div>
  );
}

function StepSeparator({ status }: { status: "completed" | "upcoming" }) {
  const separatorClass =
    status === "completed" ? "bg-[#acacac]/60" : "bg-[#acacac]/30";

  return <div className={`my-1 ml-[5px] h-8 w-px ${separatorClass}`}></div>;
}

export default function StepDisplay({
  currentStep,
  planType,
}: StepDisplayProps) {
  const steps = planType === "free" ? freeTrialSteps : paidPlanSteps;
  const currentIndex = steps.indexOf(currentStep);

  if (currentStep === "choosePlan") {
    return (
      <div className="flex flex-col gap-4 p-4">
        <p className="text-lg text-white">
          Let&apos;s get you started with Knovolo.
        </p>
        <div className="flex items-center gap-2 text-[#acacac]">
          First go ahead and select your plan.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4">
      {steps.map((step, index) => {
        let status: StepItemProps["status"] = "upcoming";

        if (index < currentIndex) {
          status = "completed";
        } else if (index === currentIndex) {
          status = "current";
        }

        const isLastStep = index === steps.length - 1;
        const separatorStatus = index < currentIndex ? "completed" : "upcoming";

        return (
          <div key={step}>
            <StepItem step={stepTitles[step] || step} status={status} />
            {!isLastStep && <StepSeparator status={separatorStatus} />}
          </div>
        );
      })}
    </div>
  );
}
