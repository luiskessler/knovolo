import { useState } from "react";
import { useSession } from "next-auth/react";
import BillingInformationModal from "../billing/billingInformationForm";
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
    <>
      {organizationStatus === "onboarding" && (
        <PromptCompleteOnboardingBanner />
      )}
      {organizationStatus === "pending" && <></>}
      {organizationStatus === "trial" && (
        <div className="flex flex-col gap-4">
          <PromptUpgradeBanner />

          <BillingPlanSection
            currentPlan={organizationStatus}
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
            />
          )}
        </div>
      )}
      {organizationStatus === "active" && (
        <div className="flex flex-col gap-4">
          <PromptUpgradeBanner />

          {/*<BillingPlanSection
            currentPlan={organizationStatus}
            onUpgrade={() => setIsUpgradeModalOpen(true)}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
          />*/}
          <PaymentMethodSection />
          <InvoicingSection />
          <ReceiveEmailNotifications />
          <BillingAddress />
          {isUpgradeModalOpen && (
            <BillingInformationModal
              isOpen={isUpgradeModalOpen}
              setIsOpen={setIsUpgradeModalOpen}
            />
          )}
        </div>
      )}
    </>
  );
}
