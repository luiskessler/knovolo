"use client";
import { AnimatePresence } from "framer-motion";
import {
  Database,
  Settings,
  Bell,
  BarChart2,
  LogOut,
  User,
  HelpCircle,
  Moon,
  Home,
  Navigation,
  Users,
  CircleHelp,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import type { SidebarItemProps } from "~/app/_components/dashboard/sidebarItem";
import SidebarItem from "~/app/_components/dashboard/sidebarItem";
import LogoComponent from "~/app/_components/common/logo";
import { StatusAwareWrapper } from "~/app/_components/dashboard/organizationStatus";
import { redirect, usePathname } from "next/navigation";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const { data: sessionData, status } = useSession();
  const pathname = usePathname();
  const user = sessionData?.user;
  const organization = sessionData?.user?.organization!;
  const orgStatus = organization?.status;

  if (!user && status !== "loading") {
    redirect("/auth/user/signin");
  }

  if (status === "loading") {
    return (
      <div className="mx-auto flex h-screen w-[90%] flex-col items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-gray-900"></div>
        <p className="mt-4 text-gray-600">Loading your dashboard...</p>
      </div>
    );
  }

  const isOrgStatusRestricted = [
    "onboarding",
    "trial_ended",
    "inactive",
  ].includes(orgStatus);

  const allowedWhenInactive = ["home", "settings"];
  const currentPath = pathname.split("/")[2];

  console.log(currentPath);

  if (isOrgStatusRestricted && !allowedWhenInactive.includes(currentPath!)) {
    redirect("/dashboard/home");
  }

  return (
    <StatusAwareWrapper organizationStatus={orgStatus!}>
      <DashboardComponent
        restrictions={true}
        children={children}
      ></DashboardComponent>
    </StatusAwareWrapper>
  );
}

const sidebarItems: SidebarItemProps[] = [
  {
    id: "dashboard",
    icon: <Home size={20} />,
    label: "Dashboard",
    href: "home",
    visibility: "*",
    requiresActive: false,
  },
  {
    id: "questions",
    icon: <CircleHelp size={20} />,
    label: "Questions",
    href: "questions",
    visibility: "*",
    requiresActive: true,
  },
  {
    id: "paths",
    icon: <Navigation size={20} />,
    label: "Paths",
    href: "paths",
    visibility: "*",
    requiresActive: true,
  },
  {
    id: "knowledge-base",
    icon: <Database size={20} />,
    label: "Knowledge Base",
    href: "knowledge-base",
    visibility: "*",
    requiresActive: true,
  },
  {
    id: "analytics",
    icon: <BarChart2 size={20} />,
    label: "Analytics",
    href: "analytics",
    visibility: "*",
    requiresActive: true,
  },
  {
    id: "team",
    icon: <Users size={20} />,
    label: "Team",
    href: "team",
    visibility: "admin",
    requiresActive: true,
  },
  {
    id: "settings",
    icon: <Settings size={20} />,
    label: "Settings",
    href: "settings",
    visibility: "admin",
    requiresActive: false,
  },
];

function DashboardComponent({
  children,
  restrictions,
}: {
  children: React.ReactNode;
  restrictions?: boolean;
}) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { data: sessionData, status } = useSession();
  const user = sessionData?.user;

  if (status !== "authenticated" || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const userInitial = user.name ? user.name.slice(0, 1).toUpperCase() : "U";

  return (
    <>
      <AnimatePresence>
        {isProfileModalOpen && (
          <div className="absolute bottom-2 left-22 z-[99999] w-72 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-xl font-medium text-white">
                  {userInitial}
                </div>
                <div className="ml-3">
                  <div className="font-medium text-gray-900">
                    {user.name || "User"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {user.email || "No email"}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2">
              <a
                href="#"
                className="flex items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <User size={16} className="mr-3 text-gray-500" />
                <span>Your Profile</span>
              </a>
              <a
                href="#"
                className="flex items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Settings size={16} className="mr-3 text-gray-500" />
                <span>Settings</span>
              </a>
              <a
                href="#"
                className="flex items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Bell size={16} className="mr-3 text-gray-500" />
                <span>Notifications</span>
              </a>
              <a
                href="#"
                className="flex items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Moon size={16} className="mr-3 text-gray-500" />
                <span>Dark Mode</span>
              </a>
              <a
                href="#"
                className="flex items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <HelpCircle size={16} className="mr-3 text-gray-500" />
                <span>Help & Support</span>
              </a>
            </div>

            <div className="border-t border-gray-200 p-2">
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex w-full items-center rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} className="mr-3" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
      <div className="flex h-screen bg-gray-50">
        <div className="hidden flex-col items-center gap-8 border-r border-gray-200 bg-white py-4 md:flex">
          <div className="flex items-center">
            <LogoComponent className="size-8" />
          </div>

          <div className="flex flex-1 flex-col items-center justify-between px-4">
            <div className="flex flex-col">
              {sidebarItems.map((item) => (
                <SidebarItem
                  id={item.id}
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  visibility={item.visibility}
                  requiresActive={item.requiresActive}
                />
              ))}
            </div>
            <button
              onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
              disabled={restrictions}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black font-medium text-white"
            >
              {userInitial}
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col">{children}</div>
      </div>
    </>
  );
}
