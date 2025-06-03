"use client";

import Link from "next/link";
import React, { useState } from "react";
import { api } from "~/trpc/react";

export default function EarlyAdoptersNewsletterSectionComponent() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "default" | "loading" | "success" | "error"
  >("default");

  const newsletterMutation = api.marketing.handleNewsletterSignup.useMutation();

  const handleNewsletterSignup = async ({
    e,
  }: {
    e: React.FormEvent<HTMLFormElement>;
  }) => {
    if (!email) {
      return;
    }

    const res = await newsletterMutation.mutateAsync({
      email: email,
    });

    if (res.status === "success") {
      setStatus("success");
    } else if (res.status === "error") {
      setStatus("error");
    } else {
      setStatus("loading");
    }
  };

  return (
    <div className="relative h-full w-screen bg-black">
      <div className="absolute bottom-0 z-[9999] h-[25vh] bg-gradient-to-b from-transparent to-[#000] to-[60%]"></div>
      <div className="mx-auto grid h-full w-[70%] max-w-7xl grid-cols-2 py-[20vh] text-white">
        <div className="col-span-1 flex h-full flex-col items-center gap-4">
          <h3 className="text-4xl font-medium">
            Early Access. Exclusive Updates.
          </h3>
          <p className="text-balance text-[#acacac]">
            Sign up to receive the latest product news and invitations to
            upcoming launch events.
          </p>
        </div>
        <div className="h-ful col-span-1 flex w-full flex-col items-center justify-end gap-2 text-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNewsletterSignup({ e });
            }}
            className="flex w-full flex-row-reverse rounded-xl"
            style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
          >
            <button
              type="submit"
              className="relative flex cursor-pointer items-center rounded-r-xl border-y border-r border-[#acacac]/20 bg-gradient-to-tr from-[#acacac]/10 to-[#acacac]/20 px-3"
            >
              <div className="absolute top-0 left-0 h-full w-[1px] bg-[#acacac]/10"></div>
              <span className="text-[#acacac]">Subscribe</span>
            </button>
            <div className="flex-1 overflow-hidden rounded-l-xl border-y border-l border-[#acacac]/20 bg-gradient-to-tr from-[#acacac]/5 to-[#acacac]/10">
              <input
                type="text"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full bg-transparent px-4 outline-none"
                required
              />
            </div>
          </form>
          <p className="text-start text-sm text-[#acacac]/50">
            *We promise to send max 1-2 emails per month. If you want you can
            always{" "}
            <Link
              href={"/earlyadopters/newsletter/unsubscribe"}
              className="underline decoration-[#acacac]/50 underline-offset-2"
            >
              unsubscribe
            </Link>{" "}
            - your Data will be deleted.
          </p>
        </div>
      </div>
    </div>
  );
}
