"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { api } from "~/trpc/react";

export default function SignIn() {
  const [step, setStep] = useState<
    "org" | "creds" | "pw-forgot-confirm" | "pw-forgot"
  >("org");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const clearInput = () => {
    setEmail("");
    setOrg("");
    setPassword("");
  };

  const handleOrgSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (org) setStep("creds");
  };

  const handleCredsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearInput();
    await signIn("credentials", {
      org,
      email,
      password,
      redirect: true,
      callbackUrl: `/dashboard/home`,
    });
  };

  const forgotPasswordMutation = api.user.handleForgotPassword.useMutation();

  const handlePasswordForgotten = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter a valid E-Mail address");
      return;
    }

    const data = await forgotPasswordMutation.mutateAsync({
      email,
    });

    if (data.status === 200) {
      setStep("pw-forgot-confirm");
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div
        className="relative flex w-[40vw] flex-col gap-8 rounded-3xl bg-white p-8"
        style={{ boxShadow: "0 0 30px 5px rgba(0,0,0,0.2)" }}
      >
        {step === "org" && (
          <>
            <h1 className="text-center text-xl">Employee Log In</h1>
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
                Log In
              </button>
              <div className="mt-6 flex items-center gap-1 text-gray-500">
                <span>New? </span>{" "}
                <a
                  href="/product"
                  className="flex items-center gap-1 hover:underline"
                >
                  Book a Demo <ArrowRight size={16} />
                </a>
              </div>
            </form>
            {error && <div className="mt-6 text-red-500">{error}</div>}
          </>
        )}

        {step === "creds" && (
          <>
            <h1 className="text-center text-xl">Log In to {org}</h1>
            <form onSubmit={handleCredsSubmit} className="space-y-4">
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-100 px-4 outline-none"
                  style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
                  required
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-100 px-4 outline-none"
                  style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
                  required
                />
              </div>

              <button
                type="submit"
                className="mb-4 h-12 w-full rounded-full bg-black text-white transition hover:opacity-90"
              >
                Log In
              </button>

              <button
                type="button"
                onClick={() => setStep("org")}
                className="absolute top-8 left-8 w-fit text-center"
              >
                <ArrowLeft size={24} />
              </button>
              <div className="mt-6 flex items-center gap-1 text-gray-500">
                <span>Forgot your Password? </span>{" "}
                <button
                  type="button"
                  onClick={(e) => setStep("pw-forgot")}
                  className="flex items-center gap-1 hover:underline"
                >
                  Click here
                </button>
              </div>
            </form>
            {error && <div className="mt-6 text-red-500">{error}</div>}
          </>
        )}

        {step === "pw-forgot" && (
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
                <h1 className="text-center text-xl">Forgot Password</h1>
              </div>
              <p className="text-gray-500">
                Enter your E-Mail address to reset your password.
              </p>
            </div>
            <form onSubmit={handleOrgSubmit} className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    E-Mail Address*
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
              </div>

              <button
                type="submit"
                onClick={(e) => handlePasswordForgotten(e)}
                className="mb-4 h-12 w-full rounded-full bg-black text-white transition hover:opacity-90"
              >
                Send Reset Link
              </button>
            </form>
            {error && <div className="mt-6 text-red-500">{error}</div>}
          </>
        )}

        {step == "pw-forgot-confirm" && (
          <div className="flex flex-col gap-2">
            <h1 className="text-center text-xl">Reset Password</h1>
            <p className="text-gray-500">
              We have sent you an email with a link to reset your password.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
