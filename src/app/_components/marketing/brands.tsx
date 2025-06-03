"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { InfiniteScroller } from "../common/ui/infiniteScroller";
import { TextGenerateEffect } from "../common/ui/textGenerate";
import { motion } from "framer-motion";

type Brand = {
  name: string;
  imageURL: string;
};

const brands: Brand[] = [
  { name: "cohere", imageURL: "/customers/cohere.svg" },
  { name: "perplexity", imageURL: "/customers/perplexity.png" },
  { name: "raycast", imageURL: "/customers/raycast.svg" },
  { name: "slack", imageURL: "/customers/slack.svg" },
  { name: "vercel", imageURL: "/customers/vercel.svg" },
  { name: "webflow", imageURL: "/customers/webflow.svg" },
];

export default function BrandsSectionComponent() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 bg-[#acacac]/5 py-[10vh] text-white">
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,

          ease: "easeOut",
        }}
        className="flex flex-col items-center gap-4"
      >
        <h3 className="text-5xl font-medium">
          Powering growth all over the world
        </h3>
        <p className="text-[#acacac]">
          Top companies use Knovolo to onboard new hires with shared knowledge.
        </p>
      </motion.div>
      <div className="group relative mx-auto w-[70%] max-w-7xl">
        <div className="absolute top-0 left-0 z-[9999] flex h-full w-full flex-col items-center justify-center opacity-0 backdrop-blur-sm transition-all duration-600 group-hover:opacity-100">
          <Link
            href={"/"}
            className="flex h-9 items-center justify-center rounded-full border border-[#acacac]/30 bg-[#303030] px-4 text-sm text-white"
            style={{ boxShadow: "0 0 30px 3px rgba(172, 172, 172, 0.3)" }}
          >
            Meet our customers
          </Link>
        </div>

        <InfiniteScroller
          direction="right"
          speed="normal"
          pauseOnHover={false}
          className="grid grid-cols-6 gap-4"
        >
          {brands.map((brand, idx) => (
            <div
              key={brand.name + idx}
              className="col-span-1 flex aspect-[2/1] h-full flex-col items-center justify-center rounded-xl"
            >
              <Image
                src={brand.imageURL}
                alt={brand.name}
                width={200}
                height={200}
                className="h-8 w-fit border"
              />
            </div>
          ))}
        </InfiniteScroller>
      </div>
      <div className="mx-auto flex h-[50vh] w-[70%] max-w-7xl flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: "easeOut",
          }}
          className="flex flex-col gap-4"
        >
          <q className="text-3xl">
            Knovolo is my vision of a smarter way to manage and share company
            knowledge - combining AI, automation, and seamless onboarding to
            help teams get unstuck and move faster.
          </q>
          <p className="text-[#acacac]">Luis, CTO and Founder</p>
        </motion.div>
      </div>
    </div>
  );
}
