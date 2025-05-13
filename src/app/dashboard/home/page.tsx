"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";
import { ActivityItem } from "~/app/_components/dashboard/activityItem";
import IntegrationItem, {
  type Integration,
} from "~/app/_components/dashboard/integrationItem";
import StatCard from "~/app/_components/dashboard/statCard";

export type Path = {
  id: number;
  title: string;
  creator: string;
  department: string;
  uses: number;
  rating: number;
};

export type ActivityItem = {
  user: string;
  action: string;
  subject: string;
  time: string;
};

const recentPaths: Path[] = [
  {
    id: 1,
    title: "Customer Ticket Resolution",
    creator: "Sarah Chen",
    department: "Customer Support",
    uses: 234,
    rating: 4.8,
  },
  {
    id: 2,
    title: "New Employee Onboarding",
    creator: "Mark Johnson",
    department: "HR",
    uses: 189,
    rating: 4.6,
  },
  {
    id: 3,
    title: "Quarterly Report Generation",
    creator: "Ava Williams",
    department: "Finance",
    uses: 127,
    rating: 4.5,
  },
];

const popularQueries: string[] = [
  "How do I process a refund?",
  "Where do I find customer contact history?",
  "How to update user permissions?",
  "What's the process for escalating issues?",
];

const recentActivities: ActivityItem[] = [
  {
    user: "James Peterson",
    action: "created a new path",
    subject: "Handling Customer Complaints",
    time: "2 hours ago",
  },
  {
    user: "Emma Roberts",
    action: "used",
    subject: "Sales Demo Process",
    time: "4 hours ago",
  },
  {
    user: "Michael Chen",
    action: "improved",
    subject: "Bug Reporting Workflow",
    time: "Yesterday",
  },
];

const integrations: Integration[] = [
  { name: "Zendesk", status: "Connected", active: true },
  { name: "Salesforce", status: "Connected", active: true },
  { name: "Company Intranet", status: "Connected", active: true },
  { name: "Jira", status: "Not configured", active: false },
];

export default function DashboardHome() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <main className="h-full flex-1 overflow-y-scroll p-6">
      <div className="mb-8 rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
        <div className="relative">
          <Search className="absolute top-0 bottom-0 left-3 my-auto h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Ask a question or search for a process..."
            className="w-full rounded-lg border border-gray-300 py-3 pr-20 pl-10 text-lg focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute top-1 right-1 bottom-1 my-auto rounded-lg bg-black px-4 py-2 text-white transition-all hover:bg-gray-800">
            Ask AI
          </button>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-sm text-gray-500">Popular queries:</p>
          <div className="flex flex-wrap gap-2">
            {popularQueries.map((query, index) => (
              <button
                key={index}
                className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700 transition-all hover:bg-gray-200"
                onClick={() => setSearchQuery(query)}
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard title="Total Paths" value="482" change="+24" />
        <StatCard title="Active Users" value="1,204" change="+12%" />
        <StatCard title="Time Saved" value="348 hrs" change="+32%" />
      </div>

      <div className="mb-8 rounded-lg border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-xl font-bold text-black">Recent Paths</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-500 uppercase">
                  Path Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-500 uppercase">
                  Creator
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-500 uppercase">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-500 uppercase">
                  Uses
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-500 uppercase">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {recentPaths.map((path) => (
                <tr key={path.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-black">
                    {path.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {path.creator}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {path.department}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {path.uses}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <div className="flex items-center">
                      {path.rating}
                      <div className="ml-2 h-2 w-16 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full bg-yellow-400"
                          style={{ width: `${(path.rating / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="font-medium text-black hover:text-gray-600">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-black">Recent Activity</h2>
          <div className="divide-y divide-gray-100">
            {recentActivities.map((activity, index) => (
              <ActivityItem
                key={index}
                user={activity.user}
                action={activity.action}
                subject={activity.subject}
                time={activity.time}
              />
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-black">
            Browser Extension
          </h2>
          <div className="mb-6 flex items-center rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <p className="font-bold text-green-800">Extension Active</p>
              <p className="text-sm text-green-600">
                Recording available on supported sites
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {integrations.map((integration, index) => (
              <IntegrationItem
                key={index}
                name={integration.name}
                status={integration.status}
                active={integration.active}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
