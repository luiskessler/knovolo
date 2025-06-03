"use client";

import React from "react";
import LogoComponent from "./logo";
import Link from "next/link";
import { useSession } from "next-auth/react";

const navbarLinks = [
  { name: "Product", href: "/product" },
  { name: "For Companies", href: "/for-companies" },
  { name: "For Employees", href: "/for-employees" },
  { name: "Pricing", href: "/pricing" },
];

export default function NavbarComponent() {
  const { data: session, status } = useSession();

  return (
    <nav className="fixed top-0 left-0 z-[999999999999] flex h-[8vh] w-full items-center justify-center overflow-hidden border-b-[0.5px] border-white text-black backdrop-blur-3xl dark:border-[#acacac]/30 dark:text-white">
      <div className="flex w-[70%] max-w-7xl items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href={"/"} className="flex items-center justify-center gap-4">
            <LogoComponent className="aspect-square h-7" />
            <p className="text-xl font-medium">Knovolo</p>
          </Link>
        </div>
        <ul className="flex items-center justify-center gap-4 text-sm text-[#acacac]">
          {navbarLinks.map((link) => (
            <li
              key={link.name}
              className="hover:underline-[#acacac] underline-offset-2 transition duration-300 hover:underline"
            >
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between gap-4">
          {status === "authenticated" ? (
            <>
              <Link
                href={"/dashboard/home"}
                className="flex h-10 items-center rounded-md bg-[#fff]/90 px-2 text-sm text-black"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link href={"/auth/user/signin"} className="text-[#acacac]">
                Log In
              </Link>
              <Link
                href={"/auth/org/register-company"}
                className="flex h-10 items-center justify-center rounded-md border-[1.5px] border-[#acacac]/30 px-4 text-white"
              >
                Register Company
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
