"use client";

import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { SessionProvider } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import { LayoutProvider } from "./_components/common/layoutProvider";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionProvider>
      <html lang="en" className={`${geist.variable}`}>
        <body>
          <AnimatePresence>
            <LayoutProvider>
              <Toaster />
              <TRPCReactProvider>{children}</TRPCReactProvider>
            </LayoutProvider>
          </AnimatePresence>
        </body>
      </html>
    </SessionProvider>
  );
}
