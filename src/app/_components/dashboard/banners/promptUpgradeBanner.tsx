import { useState, type Dispatch, type SetStateAction } from "react";

export default function PromptUpgradeBanner() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return null;
  }

  const onClick = () => {
    setIsOpen(false);
  };
  return (
    <div className="mb-4 rounded border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="font-medium">
            Upgrade to a Premium Plan to unlock all features.
          </p>
          <p className="text-sm text-gray-500">
            Your trial period is ending soon. Upgrade now to continue using all
            features.
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100"
          >
            Dismiss
          </button>
          <button
            onClick={onClick}
            className="rounded-md bg-black px-4 py-1.5 text-sm text-white transition-colors hover:bg-gray-800"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}
