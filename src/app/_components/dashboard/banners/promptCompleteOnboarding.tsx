"use client";

import React, { useState } from "react";
import { OnboardingOverlay } from "../billing/overlays/onboardingOverlay";

export default function PromptCompleteOnboardingBanner() {
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);

  return (
    <>
      {isOnboardingModalOpen && (
        <OnboardingOverlay externalClose={setIsOnboardingModalOpen} />
      )}
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <p>
          Please complete the onboarding process access the billing settings.
        </p>
        <button
          onClick={() => setIsOnboardingModalOpen(!isOnboardingModalOpen)}
          className="rounded-md bg-black px-4 py-1.5 text-sm text-white transition-colors hover:bg-gray-800"
        >
          Complete Onboarding
        </button>
      </div>
    </>
  );
}
