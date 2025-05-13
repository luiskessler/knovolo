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
    <nav className="flex h-[10vh] w-full items-center justify-center overflow-hidden">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href={"/"} className="flex items-center justify-center gap-4">
            <LogoComponent className="aspect-square h-8" />
            <p className="text-xl">knovolo</p>
          </Link>
          <ul className="flex items-center justify-center gap-4">
            {navbarLinks.map((link) => (
              <li key={link.name} className="">
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between gap-4">
          {status === "authenticated" ? (
            <>
              <Link href={"/dashboard/home"}>Dashboard</Link>
            </>
          ) : (
            <>
              <Link href={"/auth/user/signin"}>Log In</Link>
              <Link
                href={"/auth/org/register-company"}
                className="flex h-10 items-center justify-center rounded-md border-[1.5px] border-gray-300 px-4 text-black"
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
