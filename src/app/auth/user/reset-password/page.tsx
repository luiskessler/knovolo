"use client";

import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { ArrowLeft, ArrowRight, Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";

export default function UserResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "loading",
  );
  const [isTokenInvalid, setIsTokenInvalid] = useState<boolean>();
  const [step, setStep] = useState<"password" | "success" | "error">(
    "password",
  );

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const resetPasswordMutation =
    api.user.handleResetPasswordConfirm.useMutation();

  const handleConfirmPasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (error) {
      setError("");
      return;
    }

    if (password !== confirmPassword) {
      setError("Please make sure that your passwords match.");
      return;
    }

    setState("loading");

    if (!token) {
      setError("Invalid token");
      return;
    }

    const data = await resetPasswordMutation.mutateAsync({
      token,
      password,
    });

    if (data.status === 200) {
      setIsTokenInvalid(false);
      setError("");
    }
  };

  if (!token || isTokenInvalid)
    return (
      <div className="flex h-[80vh] w-full items-center justify-center p-4">
        <div
          className="relative flex w-[40vw] flex-col gap-8 rounded-3xl bg-white p-8"
          style={{ boxShadow: "0 0 30px 5px rgba(0,0,0,0.2)" }}
        >
          <h1 className="text-center text-xl">
            Mmh, it seems your link is bad.
          </h1>
          <p className="text-center">
            You should aks your employer to invite you again.
          </p>
        </div>
      </div>
    );

  if (!isTokenInvalid)
    return (
      <div className="flex h-[80vh] w-full items-center justify-center p-4">
        <div
          className="relative flex w-[40vw] flex-col gap-8 rounded-3xl bg-white p-8"
          style={{ boxShadow: "0 0 30px 5px rgba(0,0,0,0.2)" }}
        >
          <>
            {step === "password" ? (
              <>
                <div className="flex flex-col gap-2">
                  <h1 className="text-xl">Change Your Password</h1>
                  <p className="text-gray-500">
                    Enter and confirm your new password below.
                  </p>
                </div>
                <form
                  onSubmit={(e) => handleConfirmPasswordReset(e)}
                  className="flex flex-col gap-4"
                >
                  <div
                    className="flex-1 overflow-hidden rounded-xl bg-white"
                    style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
                  >
                    <input
                      type="password"
                      placeholder="New Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 w-full bg-transparent px-4 outline-none"
                      required
                    />
                  </div>
                  <div
                    className="flex-1 overflow-hidden rounded-xl bg-white"
                    style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
                  >
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-12 w-full bg-transparent px-4 outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="h-12 w-full rounded-full bg-black text-white transition hover:opacity-90"
                  >
                    Save new Password
                  </button>
                </form>
              </>
            ) : step === "success" ? (
              <div className="flex flex-col gap-2">
                <h1 className="text-xl">Password Changed</h1>
                <p className="text-gray-500">
                  Your password has been changed successfully.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <h1 className="text-xl">Password Reset Failed</h1>
                <p className="text-gray-500">
                  Something went wrong. Please try again.
                </p>
              </div>
            )}
          </>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    );

  return (
    <div className="flex h-[80vh] w-full items-center justify-center p-4">
      <div className="relative flex w-[40vw] flex-col items-center justify-center gap-8 rounded-3xl">
        <div className="flex gap-2">
          <p>Loading</p> <Loader className="loader" />
        </div>
      </div>
    </div>
  );
}
