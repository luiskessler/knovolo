import { X } from "lucide-react";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import ChoosePlanOnboardingOverlay from "./onboardingOverlay/choosePlanOnboardingOverlay";
import StepDisplay from "./onboardingOverlay/stepDisplay";
import { set } from "zod";

type StepType =
  | "choosePlan"
  | "freeTrial"
  | "paidPlan"
  | "additionalUpgrades"
  | "contactInformation"
  | "billingInformation"
  | "paymentMethod"
  | "complete";

export const OnboardingOverlay = ({
  externalClose,
}: {
  externalClose?: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [planType, setPlanType] = useState<"free" | "paid">(() => {
    return (
      (localStorage.getItem("onboardingPlanType") as "free" | "paid") || "paid"
    );
  });

  const [step, setStep] = useState<StepType>(() => {
    return (localStorage.getItem("onboardingStep") as StepType) || "choosePlan";
  });

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

  function advanceStep() {
    if (planType === "free") {
      const currentIndex = freeTrialSteps.findIndex((s) => s === step);
      const nextStep = freeTrialSteps[currentIndex + 1] || step; // stay on current if no next
      setStep(nextStep as StepType);
    } else {
      const currentIndex = paidPlanSteps.findIndex((s) => s === step);
      const nextStep = paidPlanSteps[currentIndex + 1] || step;
      setStep(nextStep as StepType);
    }
  }

  function recedeStep() {
    if (planType === "free") {
      const currentIndex = freeTrialSteps.findIndex((s) => s === step);
      const nextStep = freeTrialSteps[currentIndex - 1] || step;
      setStep(nextStep as StepType);
    } else {
      const currentIndex = paidPlanSteps.findIndex((s) => s === step);
      const nextStep = paidPlanSteps[currentIndex - 1] || step;
      setStep(nextStep as StepType);
    }
  }

  useEffect(() => {
    localStorage.setItem("onboardingPlanType", planType);
  }, [planType]);

  useEffect(() => {
    localStorage.setItem("onboardingStep", step);
  }, [step]);

  if (!isOpen && !externalClose) return null;

  return (
    <div className="fixed top-0 left-0 z-[999999999] flex h-screen w-screen items-center justify-center backdrop-blur-lg">
      <div
        className="hide-scrollbar relative flex h-screen w-screen overflow-hidden bg-gradient-to-bl from-[#0b0b0b] to-black shadow-2xl"
        style={{ boxShadow: "0 0 30px 5px rgba(0,0,0,0.2)" }}
      >
        {step !== "choosePlan" && (
          <button
            onClick={
              !externalClose
                ? () => setIsOpen(false)
                : () => externalClose(false)
            }
            className="absolute top-2 right-2 text-[#acacac]"
          >
            <X size={20} />
          </button>
        )}
        <div
          className={`flex h-full ${step !== "choosePlan" ? "relative w-3/4" : "relative w-full"} relative flex-col p-4`}
        >
          {step === "choosePlan" && (
            <>
              <ChoosePlanOnboardingOverlay />
              <button
                onClick={
                  !externalClose
                    ? () => setIsOpen(false)
                    : () => externalClose(false)
                }
                className="absolute top-6 right-6 text-[#acacac]"
              >
                <X size={20} />
              </button>
            </>
          )}
        </div>
        {step !== "choosePlan" && (
          <div className="h-full w-1/4 border-l border-[#acacac]/10 bg-[#acacac]/5">
            <StepDisplay planType={planType} currentStep={step} />
          </div>
        )}
      </div>
    </div>
  );
};

/*
<div className="flex h-10 items-center justify-center gap-2 text-white">
  <button onClick={() => recedeStep()}>back</button>
  <button
    onClick={() => {
      setPlanType("free");
      setStep("freeTrial");
    }}
  >
    freeTrial
  </button>
  <button
    onClick={() => {
      setPlanType("paid");
      setStep("paidPlan");
    }}
  >
    paidPlan
  </button>
  <button onClick={() => advanceStep()}>next</button>
</div>
*/
