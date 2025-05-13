import { useState, type Dispatch, type SetStateAction } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Check,
  CreditCard,
  X,
  Shield,
  SquareArrowOutUpRight,
} from "lucide-react";
import BillingInformationModal from "../billing/billingInformationForm";
import Link from "next/link";
import Stripe from "stripe";
import { useStripe } from "@stripe/react-stripe-js";
import { api } from "~/trpc/react";
import PaymentMethodSection from "../billing/paymentMethodSection";
import InvoicingSection from "../billing/invoicingSections";
import ReceiveEmailNotifications from "../billing/emailNotifications";
import BillingAddress from "../billing/billingAddress";
import BillingPlanSection from "../billing/billingPlan";
import PromptUpgradeBanner from "../banners/promptUpgradeBanner";
import PromptCompleteOnboardingBanner from "../banners/promptCompleteOnboarding";

export default function DashboardSettingsBilling() {
  const { data: session } = useSession();
  const organizationStatus =
    session?.user?.organization?.status || "onboarding";

  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("team");

  return (
    <div className="flex h-[92vh] w-full flex-col space-y-8 bg-white p-4 text-gray-800">
      {organizationStatus === "onboarding" && (
        <PromptCompleteOnboardingBanner />
      )}
      {organizationStatus === "pending" && <></>}
      {organizationStatus === "active" ||
        (organizationStatus === "trial" && (
          <>
            <PromptUpgradeBanner />

            <BillingPlanSection
              currentPlan={"onboarding"}
              onUpgrade={() => setIsUpgradeModalOpen(true)}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
            />
            <PaymentMethodSection />
            <InvoicingSection />
            <ReceiveEmailNotifications />
            <BillingAddress />
            {isUpgradeModalOpen && (
              <BillingInformationModal
                isOpen={isUpgradeModalOpen}
                setIsOpen={setIsUpgradeModalOpen}
                //selectedPlan={selectedPlan}
              />
            )}
          </>
        ))}
    </div>
  );
}
