"use client";
import React, {
  useState,
  createContext,
  useContext,
  type ReactNode,
  useEffect,
} from "react";
import { toast } from "sonner";
import { CreditCard, AlertTriangle, X } from "lucide-react";
import { OrganizationStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import TrialEndedOverlayModal from "./billing/overlays/trialEndedOverlay";
import { ConfirmationPendingOverlay } from "./billing/overlays/confirmationPendingOverlay";
import { OnboardingOverlay } from "./billing/overlays/onboardingOverlay";

type OrganizationStatusContextType = {
  status: OrganizationStatus;
  isActive: boolean;
  showUpgradeModal: () => void;
};

const OrganizationStatusContext = createContext<OrganizationStatusContextType>({
  status: "inactive",
  isActive: false,
  showUpgradeModal: () => {},
});

interface StatusAwareWrapperProps {
  children: ReactNode;
  organizationStatus: OrganizationStatus;
}

export const StatusAwareWrapper = ({
  children,
  organizationStatus,
}: StatusAwareWrapperProps) => {
  const [showUpgradeModalState, setShowUpgradeModal] = useState(false);
  const session = useSession();

  const isActive = organizationStatus === "active";

  const currentStatus = organizationStatus;

  useEffect(() => {
    if (currentStatus && session.status === "authenticated") {
      if (organizationStatus === "active") {
        return;
      } else if (
        organizationStatus === "pending" &&
        session.data.user.role === "admin"
      ) {
        toast.warning("Your organization is pending activation!", {
          duration: 30000,
          description:
            "Please make sure to check your email for activation instructions.",
        });
      } else if (
        organizationStatus === "trial" &&
        session.data.user.role === "admin"
      ) {
        toast.info("Your trial period is active!", {
          duration: 30000,
          description: "Upgrade to continue access after trial ends.",
          action: {
            label: "Upgrade",
            onClick: () => setShowUpgradeModal(true),
          },
        });
      } else if (organizationStatus === "trial_ended") {
        toast.info("Your trial period has ended!", {
          duration: 30000,
          description: "Please subscribe to regain full access.",
          action: {
            label: "Subscribe",
            onClick: () => setShowUpgradeModal(true),
          },
        });
      } else if (organizationStatus === "inactive") {
        toast.error("Your Organization is inactive!", {
          duration: 30000,
          description: "Please renew to restore access.",
        });
      }
    }
  }, []);

  const showUpgradeModal = () => setShowUpgradeModal(true);

  return (
    <OrganizationStatusContext.Provider
      value={{
        status: organizationStatus,
        isActive,
        showUpgradeModal,
      }}
    >
      {organizationStatus === "inactive" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-6">
              <h2 className="texret-xl font-semibold text-gray-900">
                Your Organization is inactive!
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Please renew to restore access.
              </p>
            </div>
          </div>
        </div>
      )}
      {organizationStatus === "pending" && (
        <>
          <ConfirmationPendingOverlay />
          {children}
        </>
      )}
      {organizationStatus === "trial" && children}
      {organizationStatus === "onboarding" && (
        <>
          <OnboardingOverlay />
          {children}
        </>
      )}{" "}
      {/* Implement Onboarding Overlay */}
      {organizationStatus === "trial" && children}
      {organizationStatus === "trial_ended" &&
        session.data!.user.role === "admin" && (
          <>
            {/*<TrialEndedOverlayModal />*/}

            <div>{children}</div>
          </>
        )}
      {organizationStatus === "active" && children}
      {showUpgradeModalState && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-6">
              <h2 className="texret-xl font-semibold text-gray-900">
                Upgrade Your Subscription
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Unlock all features by upgrading to our premium plan. Enjoy
                unlimited access to all tools and resources.
              </p>
            </div>

            <div className="mt-2 rounded-md bg-gray-50 p-4">
              <h4 className="mb-2 font-medium">Premium Plan Benefits:</h4>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                <li>Full access to all dashboard features</li>
                <li>Advanced analytics and reporting</li>
                <li>Team collaboration tools</li>
                <li>Priority support</li>
              </ul>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                onClick={() => setShowUpgradeModal(false)}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Subscribe Now
              </button>
            </div>

            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
              onClick={() => setShowUpgradeModal(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </OrganizationStatusContext.Provider>
  );
};

export const useOrganizationStatus = () =>
  useContext(OrganizationStatusContext);

export function withStatusCheck<P extends object>(
  Component: React.ComponentType<P>,
): React.FC<P> {
  return (props: P) => {
    const { isActive, showUpgradeModal } = useOrganizationStatus();

    if (isActive) {
      return (
        <div className="relative">
          <div className="pointer-events-none opacity-50">
            <Component {...props} />
          </div>
          <div
            className="absolute inset-0 flex cursor-pointer items-center justify-center bg-gray-50/80"
            onClick={showUpgradeModal}
          >
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              /{" "}
              <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                Feature Unavailable
              </h3>
              <p className="mb-4 text-gray-600">
                Please upgrade your subscription to access this feature.
              </p>
              <button
                onClick={showUpgradeModal}
                className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
