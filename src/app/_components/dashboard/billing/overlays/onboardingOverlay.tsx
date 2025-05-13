import { X } from "lucide-react";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

export const OnboardingOverlay = ({
  externalClose,
}: {
  externalClose?: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen && !externalClose) return null;

  return (
    <div className="absolute top-0 left-0 z-[999999999] flex h-screen w-screen items-center justify-center p-[10vh] backdrop-blur-lg">
      <div
        className="hide-scrollbar relative flex h-full w-full flex-col justify-between gap-4 overflow-y-scroll rounded-lg bg-white p-6 shadow-2xl"
        style={{ boxShadow: "0 0 30px 5px rgba(0,0,0,0.2)" }}
      >
        <button
          onClick={
            !externalClose ? () => setIsOpen(false) : () => externalClose(false)
          }
          className="absolute top-2 right-2"
        >
          <X size={20} />
        </button>
        <div className="mb-6 flex flex-col gap-2">
          <p className="text-lg font-medium">You are currently Onboarding</p>
          <p className="text-gray-600">
            Complete your onboarding process to receive your 30 day free trial.
          </p>
          <ul>
            <li>Todo</li>
            <p>complete onboarding flow</p>
            <p></p>
          </ul>
        </div>
      </div>
    </div>
  );
};
