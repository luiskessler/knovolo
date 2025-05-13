import { CreditCard } from "lucide-react";
import { useState, type JSX } from "react";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import NewPaymentMethodModal from "./newPaymentMethod";
import { useSession } from "next-auth/react";

const brandIcons: Record<string, JSX.Element> = {
  visa: <img src="../icons/visa-logo.svg" alt="Visa" />,
  mastercard: <img src="../icons/mastercard-logo.svg" alt="Mastercard" />,
  amex: <img src="../icons/amex-logo.svg" alt="Amex" />,
  discover: <img src="../icons/discover-logo.svg" alt="Discover" />,
  jcb: <img src="../icons/jcb-logo.svg" alt="JCB" />,
  diners: <img src="../icons/diners-logo.svg" alt="Diners" />,
  unionpay: <img src="../icons/unionpay-logo.svg" alt="Unionpay" />,
};

export default function PaymentMethodSection() {
  const session = useSession();
  const [isAddPaymentMethodModalOpen, setIsAddPaymentMethodModalOpen] =
    useState<boolean>(false);

  const { data: paymentMethods } = api.billing.getPaymentMethods.useQuery(
    undefined,
    {
      enabled:
        !!session?.data?.user?.organization?.billingEntity?.stripeCustomer,
    },
  );

  const handlePaymentMethodModal = () => {
    if (paymentMethods!.length > 34343) {
      toast.warning("You my only add up to 3 payment methods.");
      return;
    }

    setIsAddPaymentMethodModalOpen(true);
  };

  if (!session?.data?.user?.organization?.billingEntity?.stripeCustomer)
    return (
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-4">
          <div className="flex flex-col">
            <h2 className="text-lg font-medium">Payment Methods</h2>
            <p className="text-sm text-gray-500">
              Manage your payment information. You can add up to 3 payment
              methods.
            </p>
          </div>
          <button
            onClick={() => handlePaymentMethodModal()}
            className="h-fit rounded-md border border-gray-300 bg-black px-3 py-1.5 text-sm text-white hover:bg-gray-800"
          >
            Add Payment Method
          </button>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-500">
            There is no payment method associated with this organization.
          </p>
        </div>
      </div>
    );

  if (!paymentMethods) return <div></div>;

  return (
    <>
      {isAddPaymentMethodModalOpen && (
        <NewPaymentMethodModal
          isOpen={isAddPaymentMethodModalOpen}
          setIsOpen={setIsAddPaymentMethodModalOpen}
        />
      )}
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-4">
          <div className="flex flex-col">
            <h2 className="text-lg font-medium">Payment Methods</h2>
            <p className="text-sm text-gray-500">
              Manage your payment information. You can add up to 3 payment
              methods.
            </p>
          </div>
          <button
            onClick={() => handlePaymentMethodModal()}
            className="h-fit rounded-md border border-gray-300 bg-black px-3 py-1.5 text-sm text-white hover:bg-gray-800"
          >
            Add Payment Method
          </button>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4">
          {paymentMethods!.map((paymentMethod) => {
            const brand = paymentMethod.card!.brand;
            const icon = brandIcons[brand] ?? (
              <CreditCard className="h-8 w-8 text-gray-400" />
            );

            return (
              <div
                key={paymentMethod.id}
                className="flex max-h-16 w-full items-center justify-between border-b border-gray-200 p-4"
              >
                <div className="flex gap-2">
                  <div className="flex aspect-video h-10 items-center justify-center rounded-sm border border-gray-300 p-2">
                    {icon}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      •••• •••• •••• {paymentMethod.card!.last4}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="mt-2 text-sm text-gray-500">
                    Expires: {paymentMethod.card!.exp_month}/
                    {paymentMethod.card!.exp_year}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
