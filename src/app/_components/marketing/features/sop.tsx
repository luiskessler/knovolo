"use client";

import { Check, CheckCircle } from "lucide-react";
import React from "react";

import { motion } from "framer-motion";

type SOP = {
  id: number;
  name: string;
  soptitle: string;
  text: string;
  date: string;
};

const SOPS: SOP[] = [
  {
    id: 0,
    name: "Julia",
    soptitle: "Step-by-Step: Creating a New Product",
    text: "Julia recorded this SOP outlining all steps needed to create a new product in the system, which Marc followed 34 times during onboarding.",
    date: "2024-01-15T09:02:00",
  },
  {
    id: 1,
    name: "Sophie",
    soptitle: "Launching a Project in Notion",
    text: "Sophie saved this stepwise SOP for launching new projects in Notion, followed by over 25 users.",
    date: "2024-01-15T09:12:00",
  },
  {
    id: 2,
    name: "Felix",
    soptitle: "Filling Out Customer Complaint Forms",
    text: "Felix captured the exact process for filling customer complaint forms, which Lea used frequently when handling tickets.",
    date: "2024-01-15T09:07:00",
  },
  {
    id: 3,
    name: "Marcus",
    soptitle: "Submitting Weekly Reports via CRM",
    text: "Marcus recorded the process for submitting weekly reports through the CRM, which Julia adapted for her team's routine.",
    date: "2024-01-15T09:14:00",
  },
  {
    id: 4,
    name: "Tariq",
    soptitle: "Completing New Hire Onboarding Checklist",
    text: "Tariq logged detailed instructions for completing the new hire onboarding checklist, used by more than 50 employees.",
    date: "2024-01-15T09:21:00",
  },
  {
    id: 5,
    name: "Elena",
    soptitle: "Ensuring GDPR Compliance During Outreach",
    text: "Elena documented steps to ensure GDPR compliance during outreach campaigns, recently revised by Legal.",
    date: "2024-01-15T09:23:00",
  },
  {
    id: 6,
    name: "Lena",
    soptitle: "Submitting Creative Brief Forms",
    text: "Lena's SOP covers submitting creative brief forms properly, helping new designers complete this task efficiently.",
    date: "2024-01-15T09:30:00",
  },
  {
    id: 7,
    name: "Kai",
    soptitle: "Integrating Client Feedback Into CRM",
    text: "Kai documented the workflow for integrating client feedback into the CRM, a daily task for the operations team.",
    date: "2024-01-15T09:34:00",
  },
  {
    id: 8,
    name: "Samira",
    soptitle: "Setting Up Weekly Team Sync Meetings",
    text: "Samira created a step-by-step guide for setting up weekly team sync meetings, adopted by 15 teams for consistency.",
    date: "2024-01-15T09:37:00",
  },
];

function formatTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const SOPBenefits = [
  "Workflows are tracked in reusable, overlayable SOPs",
  "Relevant workflow are suggested based on used tools",
  "All processes are directly stored in the central knowledge base",
  "SOPs can be recorded and used from any application",
  "Automatic workflow recommendation when detecting roadblocks",
];

export default function SOPComponent() {
  const [hovered, setHovered] = React.useState<number>(2);
  const [formattedTimes, setFormattedTimes] = React.useState<string[]>([]);

  React.useEffect(() => {
    const times = SOPS.map((sop) => formatTime(sop.date));
    setFormattedTimes(times);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: 20, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
      className="flex h-full w-full gap-2"
    >
      <div className="relative flex w-[60%] max-w-[60%] min-w-[60%] flex-col gap-2 overflow-hidden rounded-r-xl border-y border-r border-[#acacac]/10 py-2 pr-2">
        <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-[#0C0C0C] to-transparent"></div>
        {SOPS.map((_, idx) => (
          <div
            key={idx}
            onMouseEnter={() => setHovered(idx)}
            onClick={() => setHovered(idx)}
            className={`line-clamp-1 flex h-full min-h-10 w-full items-center justify-between gap-4 rounded-r-xl border-y border-r border-[#acacac]/10 pr-3 pl-10 text-sm text-[#acacac]/30 ${
              hovered === idx ? "bg-[#acacac]/10 text-white" : ""
            }`}
          >
            <p className="truncate">
              {_.name} created the Path "{_.soptitle}"
            </p>
            <p className="text-right">{formattedTimes[idx] || "Loading..."}</p>
          </div>
        ))}
        <div className="absolute bottom-0 left-0 h-2/5 w-full bg-gradient-to-t from-[#0C0C0C] from-[70%] via-[rgba(12,12,12)]/30 via-[95%] to-transparent p-2 pt-12">
          <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-[#0C0C0C] to-transparent to-[45%]"></div>
          <div className="flex h-full items-center justify-center rounded-xl border border-[#acacac]/5 bg-[#acacac]/5 p-2 text-center text-white/60">
            <p>{SOPS.find((sop) => sop.id === hovered)?.text}</p>
          </div>
        </div>
      </div>
      <div className="hide-scrollbar flex w-full flex-col gap-8 overflow-y-scroll rounded-l-xl border-y border-l border-[#acacac]/10 p-8">
        <h3 className="text-xl">SOP's which are actually reusable</h3>

        <ul className="flex flex-col gap-2">
          {SOPBenefits.map((benefit, idx) => (
            <li key={idx} className="inline-flex gap-4 text-[#acacac]/50">
              <CheckCircle className="mt-2 h-4 text-green-500" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
