import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, type Dispatch, type SetStateAction } from "react";
import { ChevronLeft, X } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "~/trpc/react";
import { loadStripe, type SetupIntent } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export const billingSchema = z.object({
  billingName: z.string().min(1, { message: "Billing name is required" }),
  invoiceEmail: z.string().email({ message: "Invalid email address" }),
  billingAddress: z.string().min(1, { message: "Address is required" }),
  billingPostalCode: z.string().min(1, { message: "Postal code required" }),
  billingCity: z.string().min(1, { message: "City is required" }),
  billingCountry: z.string().min(1, { message: "Country is required" }),
  taxID: z.string().optional(),
});

type BillingInformation = z.infer<typeof billingSchema>;

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const StripeBillingComponent = ({
  setStep,
  setError,
  setupIntent,
}: {
  setStep: Dispatch<SetStateAction<"payment" | "success" | "plan" | "general">>;
  setError: Dispatch<SetStateAction<string>>;
  setupIntent?: SetupIntent;
}) => {
  const [cardError, setCardError] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const confirmSetupIntent = api.billing.confirmSetupIntent.useMutation({
    onSuccess: () => {
      setStep("success");
    },
    onError: (error: any) => {
      setError(error.message);
    },
  });

  const onPaymentInformationSubmit = async (setupIntent: SetupIntent) => {
    const cardElement = elements!.getElement(CardElement);

    if (!cardElement) {
      setCardError("Card element not found");
      setIsProcessing(false);
      return;
    }

    try {
      const { error, setupIntent: confirmedSetupIntent } =
        await stripe!.confirmCardSetup(setupIntent!.client_secret!, {
          payment_method: {
            card: cardElement,
          },
        });

      if (error) {
        setCardError(error.message || "Something went wrong");
        setIsProcessing(false);
        return;
      }

      if (confirmedSetupIntent?.status === "succeeded") {
        const result = await confirmSetupIntent.mutateAsync({
          setupIntentId: confirmedSetupIntent.id,
          paymentMethodId: confirmedSetupIntent.payment_method as string,
        });
      }
    } catch (err) {
      setCardError("An unexpected error occurred");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <CardElement
          className="flex h-12 w-full flex-col justify-center rounded-md border border-gray-400 px-4 text-center"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",

                fontFamily:
                  '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                "::placeholder": { color: "#aab7c4" },
              },
            },
            hidePostalCode: true,
          }}
        />
        <button
          className="mt-2 h-12 w-full rounded-xl bg-black text-white transition hover:opacity-90 disabled:bg-gray-400"
          onClick={() => onPaymentInformationSubmit(setupIntent!)}
        >
          Confirm
        </button>
      </div>
    </>
  );
};

export default function NewPaymentMethodModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const session = useSession();
  const [step, setStep] = useState<"plan" | "general" | "payment" | "success">(
    "general",
  );
  const [error, setError] = useState("");
  const [setupIntent, setSetupIntent] = useState<SetupIntent>();
  const [isProcessing, setIsProcessing] = useState(false);

  const createOrUpdateStripeCustomer =
    api.billing.createOrUpdateStripeCustomer.useMutation({
      onSuccess: (data) => {
        setSetupIntent(data.clientSecret as SetupIntent);
        setStep("payment");
      },
      onError: (error) => {
        setError(error.message);
      },
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BillingInformation>({
    resolver: zodResolver(billingSchema),
    mode: "onSubmit",
  });

  const onSubmit = (data: BillingInformation) => {
    createOrUpdateStripeCustomer.mutate(data);
  };

  if (!isOpen) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        viewport={{ once: true }}
        className="absolute top-0 left-0 h-screen w-screen bg-black/30"
      ></motion.div>
      <motion.div className="absolute top-0 right-0 bottom-0 left-0 my-auto ml-auto h-full w-[35%] max-w-[35%]">
        {step === "general" && (
          <div
            className="hide-scrollbar relative flex h-full w-full flex-col overflow-y-scroll rounded-l-md border-l border-gray-100 bg-white p-4"
            style={{ boxShadow: "0 0 30px 5px rgba(0,0,0,0.2)" }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col justify-between gap-8"
            >
              <div className="flex w-full items-center justify-end">
                <button type="button" onClick={() => setIsOpen(false)}>
                  <X />
                </button>
              </div>{" "}
              <div className="flex flex-col gap-2">
                <p className="text-lg font-medium">
                  Add general Billing Information
                </p>
                <p className="text-gray-500">
                  First we need some general information to get you started.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="billingName" className="text-sm text-gray-500">
                  Billing Name*
                </label>
                <input
                  type="text"
                  placeholder="Acme Inc. - John Doe"
                  {...register("billingName")}
                  className={`h-12 w-full rounded-xl border px-4 outline-none ${
                    errors.billingName ? "border-red-500" : "border-gray-200"
                  }`}
                  style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
                />
                {errors.billingName && (
                  <p className="text-xs text-red-500">
                    {errors.billingName.message}
                  </p>
                )}

                <label htmlFor="invoiceEmail" className="text-sm text-gray-500">
                  Invoice Email*
                </label>
                <input
                  type="text"
                  placeholder={`accounting@${session.data?.user.organization?.name.toLowerCase() || "company"}.com`}
                  {...register("invoiceEmail")}
                  className={`h-12 w-full rounded-xl border px-4 outline-none ${
                    errors.invoiceEmail ? "border-red-500" : "border-gray-200"
                  }`}
                  style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
                />
                {errors.invoiceEmail && (
                  <p className="text-xs text-red-500">
                    {errors.invoiceEmail.message}
                  </p>
                )}

                <Separator />

                <label
                  htmlFor="billingAddress"
                  className="text-sm text-gray-500"
                >
                  Billing Address*
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  {...register("billingAddress")}
                  className={`h-12 w-full rounded-xl border px-4 outline-none ${
                    errors.billingAddress ? "border-red-500" : "border-gray-200"
                  }`}
                  style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
                />
                {errors.billingAddress && (
                  <p className="text-xs text-red-500">
                    {errors.billingAddress.message}
                  </p>
                )}

                <input
                  type="text"
                  placeholder="City"
                  {...register("billingCity")}
                  className={`h-12 w-full rounded-xl border px-4 outline-none ${
                    errors.billingCity ? "border-red-500" : "border-gray-200"
                  }`}
                  style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
                />
                {errors.billingCity && (
                  <p className="text-xs text-red-500">
                    {errors.billingCity.message}
                  </p>
                )}

                <input
                  type="text"
                  placeholder="Postal Code"
                  {...register("billingPostalCode")}
                  className={`h-12 w-full rounded-xl border px-4 outline-none ${
                    errors.billingPostalCode
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                  style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
                />
                {errors.billingPostalCode && (
                  <p className="text-xs text-red-500">
                    {errors.billingPostalCode.message}
                  </p>
                )}

                <input
                  type="text"
                  placeholder="Country"
                  {...register("billingCountry")}
                  className={`h-12 w-full rounded-xl border px-4 outline-none ${
                    errors.billingCountry ? "border-red-500" : "border-gray-200"
                  }`}
                  style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
                />
                {errors.billingCountry && (
                  <p className="text-xs text-red-500">
                    {errors.billingCountry.message}
                  </p>
                )}

                <Separator />
                <label htmlFor="taxID" className="text-sm text-gray-500">
                  Tax ID
                </label>
                <input
                  type="text"
                  placeholder="Tax ID"
                  {...register("taxID")}
                  className={`h-12 w-full rounded-xl border px-4 outline-none ${
                    errors.taxID ? "border-red-500" : "border-gray-200"
                  }`}
                  style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    createOrUpdateStripeCustomer.status === "pending"
                  }
                  className="mt-2 h-12 w-full rounded-xl bg-black font-medium text-white transition hover:opacity-90 disabled:bg-gray-400"
                >
                  {isSubmitting ||
                  createOrUpdateStripeCustomer.status === "pending"
                    ? "Loading..."
                    : "Next"}
                </button>
                <button
                  type="button"
                  onClick={() => setStep("payment")}
                  className="text-gray-500"
                >
                  Skip
                </button>

                {error && (
                  <div className="rounded-md bg-red-100 p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}
              </div>
            </form>
          </div>
        )}

        {step === "payment" && (
          <div
            className="hide-scrollbar relative flex h-full w-full flex-col overflow-y-scroll rounded-l-md border-l border-gray-100 bg-white p-4"
            style={{ boxShadow: "0 0 30px 5px rgba(0,0,0,0.2)" }}
          >
            <div className="flex w-full items-center justify-between">
              <button type="button" onClick={() => setStep("general")}>
                <ChevronLeft />
              </button>
              <button type="button" onClick={() => setIsOpen(false)}>
                <X />
              </button>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <p className="text-lg font-medium">Add Payment Information</p>
              <p className="text-gray-500">
                Please add your company payment method.
              </p>
            </div>

            <div className="mt-8">
              <Elements stripe={stripePromise}>
                {setupIntent && (
                  <StripeBillingComponent
                    setStep={setStep}
                    setError={setError}
                    setupIntent={setupIntent}
                  />
                )}
              </Elements>
            </div>

            <div className="mt-8 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setStep("success")}
                className="text-gray-500"
              >
                Skip
              </button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div
            className="hide-scrollbar relative flex h-full w-full flex-col overflow-y-scroll rounded-l-md border-l border-gray-100 bg-white p-4"
            style={{ boxShadow: "0 0 30px 5px rgba(0,0,0,0.2)" }}
          >
            <div className="flex w-full items-center justify-end">
              <button type="button" onClick={() => setIsOpen(false)}>
                <X />
              </button>
            </div>
            <div className="flex h-full flex-col items-center justify-center">
              <div className="flex max-w-md flex-col items-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-medium">
                  Billing information saved
                </h2>
                <p className="text-gray-500">
                  Your billing information has been saved successfully. You can
                  now use the full features of the platform.
                </p>
                <button
                  type="button"
                  className="mt-8 h-12 w-full rounded-xl bg-black font-medium text-white transition hover:opacity-90"
                  onClick={() => setIsOpen(false)}
                >
                  Continue to Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}

const Separator = () => (
  <div className="my-1 flex w-full items-center justify-center">
    <div className="h-px w-full bg-gray-200" />
  </div>
);
