"use client";

import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { ArrowLeft, ArrowRight, Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { api } from "~/trpc/react";

export default function OrganizationEmailVerificationPage() {
  const [error, setError] = useState("");
  const [isTokenInvalid, setIsTokenInvalid] = useState<boolean>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const verifyEmailMutation = api.organization.handleVerifyEmail.useMutation();

  useEffect(() => {
    const fetchTokenValidity = async () => {
      if (!token) {
        throw new Error("Invalid token");
      }

      console.log(token);

      const data = await verifyEmailMutation.mutateAsync({ token });

      console.log(data);

      if (data.status && data.status === 400) {
        setError(data.message);
        setIsTokenInvalid(true);
        return;
      }
    };

    fetchTokenValidity();
  }, [token]);

  if (error)
    return (
      <div className="flex h-[80vh] w-full items-center justify-center p-4">
        <div
          className="relative flex w-[40vw] flex-col gap-8 rounded-3xl bg-white p-8"
          style={{ boxShadow: "0 0 30px 5px rgba(0,0,0,0.2)" }}
        >
          <h1 className="text-center text-xl">{error}.</h1>
          <Link className="text-center underline" href="/dashboard/home">
            Return to dashboard
          </Link>
        </div>
      </div>
    );

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

  if (!isTokenInvalid) {
    return (
      <>
        <div className="flex h-[80vh] w-full items-center justify-center p-4">
          <div
            className="relative flex w-[40vw] flex-col gap-8 rounded-3xl bg-white p-8"
            style={{ boxShadow: "0 0 30px 5px rgba(0,0,0,0.2)" }}
          >
            <h1 className="text-center text-xl">
              Your Organization has been verified!
            </h1>
            <Link className="text-center underline" href="/dashboard/home">
              Return to dashboard
            </Link>
          </div>
        </div>
      </>
    );
  }

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
