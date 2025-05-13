import { useState } from "react";
import { motion } from "framer-motion";
import { ExpandIcon, X } from "lucide-react";

type ResizeableModalProps = {
  isOpen: boolean;
  handleModalOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
};

const ResizeableModal: React.FC<ResizeableModalProps> = ({
  isOpen,
  handleModalOpen,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 z-[9999999999999] flex h-screen w-screen flex-col items-center justify-center text-neutral-100 backdrop-blur-3xl"
    >
      <div className="relative h-[83.3%] w-[83.3%] rounded-lg bg-white p-8">
        <motion.div
          className={`absolute top-2 right-2 flex flex-col items-center gap-2 transition-all duration-200`}
        >
          <button
            onClick={() => handleModalOpen(!isOpen)}
            className="flex aspect-square w-7 items-center justify-center rounded-full bg-[#151515] p-1"
          >
            <X color="white" size={20} />
          </button>
        </motion.div>
        {children}
      </div>
    </motion.div>
  );
};

export default ResizeableModal;
