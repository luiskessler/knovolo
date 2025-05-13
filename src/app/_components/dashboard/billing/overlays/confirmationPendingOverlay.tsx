import { X } from "lucide-react";
import { useState } from "react";

export const ConfirmationPendingOverlay = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="absolute top-0 left-0 z-[999999999] flex h-screen w-screen items-center justify-center p-[10vh] backdrop-blur-lg">
      <div
        className="hide-scrollbar relative flex h-full w-full flex-col justify-between gap-4 overflow-y-scroll rounded-lg bg-white p-6 shadow-2xl"
        style={{ boxShadow: "0 0 30px 5px rgba(0,0,0,0.2)" }}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2"
        >
          <X size={20} />
        </button>
        <div className="mb-6 flex flex-col gap-2">
          <p className="text-lg font-medium">
            Please Confirm your E-Mail Address
          </p>
          <p className="text-gray-600">
            Check your inbox and confirm your E-Mail address to continue.
          </p>
        </div>
      </div>
    </div>
  );
};
