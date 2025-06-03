"use client";

import { ChevronRight } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

export default function HeroSectionComponent() {
  return (
    <div className="h-fit w-screen">
      <div className="mx-auto flex h-[60vh] w-[70%] max-w-7xl flex-col justify-center pt-[8vh] dark:text-white">
        <motion.div
          initial={{ opacity: 0, y: -20, x: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col gap-10"
        >
          <div className="flex flex-col gap-6">
            <h1 className="bg-gradient-to-b from-[#e1e1e1] to-white bg-clip-text text-5xl font-medium text-balance text-transparent">
              Centralized knowledge-management and onboarding for enterprises
            </h1>
            <p className="w-[60%] text-lg text-balance text-[#acacac]">
              Meet the multi-interactive knowledge-base with SOP-Tracking, built
              in AI-Agents and forum capabilities
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="h-10 rounded-md border border-gray-300 bg-white/90 px-2 text-black transition-all duration-300 hover:bg-white"
              style={{ boxShadow: "0px 0px 20px 3px rgba(225,225,225,0.3)" }}
            >
              Centralize Knowledge
            </button>
            <button className="relative flex items-center gap-2 bg-gradient-to-l from-[#a9a9a9] to-white bg-clip-text text-transparent transition-all duration-300 hover:underline hover:decoration-white hover:decoration-[0.5px] hover:underline-offset-2">
              Schedule Demo Call{" "}
              <ChevronRight className="text-[#a9a9a9]" size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
