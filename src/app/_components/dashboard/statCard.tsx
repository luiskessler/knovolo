import React from "react";

type StatCardProps = {
  title: string;
  value: string;
  change: string;
};

export default function StatCard({ title, value, change }: StatCardProps) {
  const isPositive = change.startsWith("+");

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <div className="mt-2 flex items-baseline">
        <p className="text-3xl font-semibold text-black">{value}</p>
        <p
          className={`ml-2 text-sm font-medium ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {change}
        </p>
      </div>
    </div>
  );
}
