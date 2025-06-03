"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import SOPComponent from "./features/sop";
import { motion } from "framer-motion";
import ForumComponent from "./features/forum";

export default function FeaturesSectionComponent() {
  return (
    <div
      className="relative h-fit w-screen border-b border-[#1c1c1c]"
      style={{
        background:
          "linear-gradient(50deg,rgba(12, 12, 12, 0.3) 10%, rgba(44, 44, 44, 0.3) 50%, rgba(0, 0, 0, 0.1) 90%)",
      }}
    >
      <div className="absolute bottom-0 z-[9999] h-[25vh] bg-gradient-to-b from-transparent to-[#000] to-[60%]"></div>
      <div className="mx-auto grid h-fit w-[70%] max-w-7xl grid-cols-2 gap-y-10 py-[10vh] text-white">
        <motion.div
          initial={{ opacity: 0, y: -20, x: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="col-span-1 flex flex-col justify-end py-4"
        >
          <h2 className="text-5xl font-medium text-balance">
            Made for Teams with{" "}
            <span className="underline decoration-[#acacac]/50 underline-offset-2">
              peak <br /> efficiency needs
            </span>
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20, x: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="col-span-1 flex flex-col justify-end p-4"
        >
          <p className="text-[#acacac]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo unde,
            quos, ducimus rerum cum totam voluptatum aspernatur temporibus eos
            nisi quia reprehenderit.{" "}
            <Link
              href={"/"}
              className="inline-flex items-center gap-2 text-white underline underline-offset-2"
            >
              Call to Action <ChevronRight size={18} />
            </Link>
          </p>
        </motion.div>
        <div className="col-span-2 grid grid-cols-2">
          <div className="col-span-2 aspect-[2/1] border-t border-[#acacac]/20 py-2">
            <SOPComponent />
          </div>
          <div className="col-span-1 aspect-square border-y border-r border-[#acacac]/20 border-t-[#acacac]/10"></div>
          <div className="col-span-1 aspect-square border-t border-b border-[#acacac]/10"></div>{" "}
          <div className="col-span-2 border-b border-[#acacac]/20">
            <ForumComponent />
          </div>
          <div className="col-span-2 h-[20vh]"></div>
        </div>
      </div>
    </div>
  );
}
