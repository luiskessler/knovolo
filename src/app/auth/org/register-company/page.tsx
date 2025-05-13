"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { api } from "~/trpc/react";
import type { Organization, User } from "@prisma/client";

export default function SignUp() {
  const [step, setStep] = useState<"org" | "personal">("org");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [error, setError] = useState("");

  const handleOrgSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (org) setStep("personal");
  };

  const newOrganizationMutation =
    api.organization.handleCreateNewOrganization.useMutation();

  const handleCompleteSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await newOrganizationMutation.mutateAsync({
      email,
      name,
      surname,
      organization: org,
      password,
    });

    if (!res) {
      console.log(res);
      clearInput();
      throw new Error("Something went wrong");
    }

    if (res.status === 200) {
      signIn("credentials", {
        redirect: true,
        org: res.organization!.slug,
        password: password,
        email: email,
        redirectTo: "/dashboard/home",
      });
      clearInput();
    }
  };

  function clearInput() {
    setEmail("");
    setName("");
    setSurname("");
    setOrg("");
    setPassword("");
  }

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div
        className="relative flex w-[40vw] flex-col gap-8 rounded-3xl bg-white p-8"
        style={{ boxShadow: "0 0 30px 5px rgba(0,0,0,0.2)" }}
      >
        {step === "org" && (
          <>
            <div className="flex flex-col gap-2">
              <h1 className="text-xl">Register your company with Knovolo</h1>
              <p className="text-gray-500">
                Follow the steps below to get you started.
              </p>
            </div>
            <form onSubmit={handleOrgSubmit} className="flex flex-col gap-4">
              <div
                className="flex rounded-xl"
                style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="flex items-center rounded-l-xl border-r border-gray-200 bg-white px-3">
                  <span className="text-gray-700">knovolo.com/</span>
                </div>
                <div className="flex-1 overflow-hidden rounded-r-xl bg-gray-200/20">
                  <input
                    type="text"
                    placeholder="your-company"
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    className="h-12 w-full bg-transparent px-4 outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="h-12 w-full rounded-full bg-black text-white transition hover:opacity-90"
              >
                Continue
              </button>
              <div className="mt-6 flex items-center gap-1 text-gray-500">
                <span>Employee? </span>{" "}
                <a
                  href="/auth/signin"
                  className="flex items-center gap-1 hover:underline"
                >
                  Click here <ArrowRight size={16} />
                </a>
              </div>
            </form>
          </>
        )}

        {step === "personal" && (
          <>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep("org")}
                  className="w-fit text-center"
                >
                  <ArrowLeft size={24} />
                </button>
                <h1 className="text-center text-xl">Personal Information</h1>
              </div>

              <p className="text-gray-500">
                Please provide information for your Admin-Account
              </p>
            </div>
            <form
              onSubmit={(e) => handleCompleteSignUp(e)}
              className="space-y-4"
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <label
                      htmlFor="name"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="John"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12 w-full rounded-xl border border-gray-200 bg-gray-100 px-4 outline-none"
                      style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <label
                      htmlFor="surname"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Surname*
                    </label>
                    <input
                      type="text"
                      id="surname"
                      placeholder="Doe"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      className="h-12 w-full rounded-xl border border-gray-200 bg-gray-100 px-4 outline-none"
                      style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Company E-Mail Adress*
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="johndoe@acme.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-100 px-4 outline-none"
                    style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <label
                      htmlFor="password"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Password*
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter password here..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 w-full rounded-xl border border-gray-200 bg-gray-100 px-4 outline-none"
                      style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="mb-4 h-12 w-full rounded-full bg-black text-white transition hover:opacity-90"
              >
                Sign In
              </button>
              {error && <p className="text-red-600">{error}</p>}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
