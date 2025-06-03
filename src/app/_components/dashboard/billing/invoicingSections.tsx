import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/trpc/react";

export default function InvoicingSection() {
  const session = useSession();
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  const { data, isLoading } = api.billing.getInvoices.useQuery(undefined, {
    enabled:
      !hasFetched &&
      !!session?.data?.user?.organization?.billingEntity?.stripeCustomer,
    staleTime: Infinity,
  });

  if (!session?.data?.user?.organization?.billingEntity?.stripeCustomer)
    return (
      <div className="h-fit flex-1 overflow-hidden rounded-lg border border-gray-200">
        <div className="h-fit border-b border-gray-200 bg-gray-50 px-4 py-4">
          <h2 className="text-lg font-medium">Invoicing</h2>
          <p className="text-sm text-gray-500">
            Manage your billing and invoice preferences
          </p>
        </div>

        <div className="p-4">
          <p className="text-sm text-gray-500">
            There is no payment method associated with this organization. Please
            add a payment method to have invoices generated.
          </p>
        </div>
      </div>
    );

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-4">
        <h2 className="text-lg font-medium">Invoicing</h2>
        <p className="text-sm text-gray-500">
          Manage your billing and invoice preferences
        </p>
      </div>

      <div className="p-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {data?.map((invoice) => (
              <div key={invoice.id} className="flex flex-col gap-2">
                <p className="text-sm text-gray-500">
                  {invoice.number} / {invoice.status}
                </p>
                <p className="text-sm text-gray-500">
                  {invoice.amount_paid} / {invoice.amount_due}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
