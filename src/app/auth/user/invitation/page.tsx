"use client";

import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { ArrowLeft, ArrowRight, Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";

export default function InvitationPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [org, setOrg] = useState("");
  const [orgSlug, setOrgSlug] = useState("");
  const [name, setName] = useState("");
  const [userID, setUserID] = useState("");
  const [tokenID, setTokenID] = useState("");
  const [error, setError] = useState("");
  const [isTokenInvalid, setIsTokenInvalid] = useState<boolean>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const validateTokenMutation = api.invitation.validateToken.useMutation();

  useEffect(() => {
    const fetchTokenValidity = async () => {
      const data = await validateTokenMutation.mutateAsync({
        token: token!,
      });

      if (data.status === 400) {
        setError(data.message);
        setIsTokenInvalid(true);
        return;
      }

      if (data.status && data.status === 400) {
        setError(data.message);
        setIsTokenInvalid(true);
        return;
      }

      if (!data.token) {
        setError("Invalid token");
        setIsTokenInvalid(true);
        return;
      }

      setTokenID(data.token!.id);
      setEmail(data.token!.user.email);
      setOrg(data.token!.organization.name);
      setOrgSlug(data.token!.organization.slug);
      setName(data.token!.user!.name!);
      setUserID(data.token!.user.id);
    };

    fetchTokenValidity();
  }, [token]);

  const completeUserSignupMutation =
    api.invitation.completeUserSignup.useMutation();

  const handleUserSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await completeUserSignupMutation.mutateAsync({
      id: userID,
      password,
      token: tokenID,
    });

    if (!data) {
      throw new Error("Something went wrong");
    }

    if (data.status === 200) {
      signIn("credentials", {
        redirect: true,
        org: orgSlug,
        password: password,
        email: email,
        redirectTo: "/dashboard/home",
      });
    } else {
      setError(data.message);
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

  if (!isTokenInvalid && tokenID)
    return (
      <div className="flex h-[80vh] w-full items-center justify-center p-4">
        <div
          className="relative flex w-[40vw] flex-col gap-8 rounded-3xl bg-white p-8"
          style={{ boxShadow: "0 0 30px 5px rgba(0,0,0,0.2)" }}
        >
          <>
            <div className="flex flex-col gap-2">
              <h1 className="text-xl">
                Hey {name}, you have been invited to {org}!
              </h1>
              <p className="text-gray-500">
                Fill in the missing information below, to complete your signup.
              </p>
            </div>
            <form
              onSubmit={(e) => handleUserSignup(e)}
              className="flex flex-col gap-4"
            >
              <div
                className="flex-1 overflow-hidden rounded-xl bg-white"
                style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
              >
                <input
                  type="text"
                  placeholder="E-Mail"
                  value={email}
                  className="h-12 w-full bg-transparent px-4 outline-none"
                  disabled
                />
              </div>
              <div
                className="flex-1 overflow-hidden rounded-xl bg-white"
                style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
              >
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 w-full bg-transparent px-4 outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="h-12 w-full rounded-full bg-black text-white transition hover:opacity-90"
              >
                Complete Signup
              </button>
            </form>
          </>
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
