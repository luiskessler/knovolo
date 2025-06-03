"use client";

import { ChartLine, CreditCard, FileText, Home, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import DashboardSettingsBilling from "~/app/_components/dashboard/settings/billing";
import DashboardSettingsGeneral from "~/app/_components/dashboard/settings/general";
import DashboardSettingsUsage from "~/app/_components/dashboard/settings/usage";
import DashboardSettingsInvoices from "~/app/_components/dashboard/settings/invoices";
import DashboardSettingsSecurity from "~/app/_components/dashboard/settings/security";

type DashboardNavigationItem = {
  id: string;
  label: string;
  slug: string;
  component: React.ReactNode;
};

const dashboardNavigationItems: DashboardNavigationItem[] = [
  {
    id: "general",
    label: "General",
    slug: "general",
    component: <DashboardSettingsGeneral />,
  },
  {
    id: "usage",
    label: "Usage",
    slug: "usage",
    component: <DashboardSettingsUsage />,
  },
  {
    id: "billing",
    label: "Billing",
    slug: "billing",
    component: <DashboardSettingsBilling />,
  },
  {
    id: "invoices",
    label: "Invoices",
    slug: "invoices",
    component: <DashboardSettingsInvoices />,
  },
  {
    id: "security",
    label: "Security",
    slug: "security",
    component: <DashboardSettingsSecurity />,
  },
];

export default function DashboardSettings() {
  const [activeTab, setActiveTab] = useState<DashboardNavigationItem>(
    dashboardNavigationItems[0]!,
  );

  const params = useSearchParams();

  useEffect(() => {
    if (params.get("tab")) {
      const tab = dashboardNavigationItems.find(
        (item) => item.slug === params.get("tab"),
      );
      if (tab) {
        setActiveTab(tab);
      }
    }
  }, [params]);

  return (
    <div className="flex h-screen w-full flex-col">
      <DashboardNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="n-[91vh] flex flex-col overflow-y-scroll p-4">
        {activeTab.component}
      </div>
    </div>
  );
}

const DashboardNavigation = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: DashboardNavigationItem;
  setActiveTab: React.Dispatch<React.SetStateAction<DashboardNavigationItem>>;
}) => {
  const router = useRouter();

  function handleTabChange(tab: DashboardNavigationItem) {
    setActiveTab(tab);
    router.replace(`/dashboard/settings?tab=${tab.slug}`);
  }

  return (
    <div className="flex h-[9vh] w-full items-center gap-4 border-b border-gray-200 bg-white px-4 py-2">
      {dashboardNavigationItems &&
        dashboardNavigationItems.map((navigationItem) => (
          <div key={navigationItem.id}>
            <button
              onClick={() => handleTabChange(navigationItem)}
              className={`${activeTab.id === navigationItem.id ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"} rounded-lg px-3 py-2 text-sm font-medium`}
            >
              <span>{navigationItem.label}</span>
            </button>
          </div>
        ))}
    </div>
  );
};
