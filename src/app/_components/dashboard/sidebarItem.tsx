"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { useOrganizationStatus } from "./organizationStatus";
import { useSession } from "next-auth/react";

export type SidebarItemProps = {
  id: string;
  icon: React.ReactNode;
  label: string;
  href: string;
  visibility: "admin" | "user" | "*";
  requiresActive?: boolean;
};

export default function SidebarItem({
  id,
  icon,
  label,
  href,
  visibility,
  requiresActive,
}: SidebarItemProps) {
  const pathname = usePathname();
  const sessionData = useSession();
  const isActive = pathname.includes(href);
  const { status, isActive: isOrgActive } = useOrganizationStatus();
  const statusRestricted =
    status === "onboarding" ||
    status === "trial_ended" ||
    status === "inactive" ||
    status === "pending";

  const shouldDisable = requiresActive && statusRestricted;
  const userRole = sessionData?.data?.user?.role;

  const isVisibleToUser = visibility === "*" || userRole === visibility;

  if (!isVisibleToUser) {
    return null;
  }

  if (shouldDisable) {
    return (
      <div className="group relative my-1 cursor-not-allowed">
        <div
          className={`flex w-full items-center rounded-md px-3 py-2 opacity-40 ${isActive ? "bg-gray-100 text-black" : "text-gray-500"}`}
        >
          <span>{icon}</span>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/dashboard/${href}`}
      className={`my-1 flex w-full items-center rounded-md px-3 py-2 ${isActive ? "bg-gray-100 text-black" : "text-gray-500 hover:bg-gray-50 hover:text-black"}`}
    >
      <span>{icon}</span>
    </Link>
  );
}
