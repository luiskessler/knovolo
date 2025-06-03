import React from "react";

export type Integration = {
  name: string;
  status: string;
  active: boolean;
};

export default function IntegrationItem({ name, status, active }: Integration) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
      <div className="flex items-center">
        <div
          className={`h-4 w-4 rounded-full ${
            active ? "bg-green-500" : "bg-gray-300"
          } mr-3`}
        ></div>
        <span className="font-medium">{name}</span>
      </div>
      <span
        className={`text-sm ${active ? "text-green-600" : "text-gray-500"}`}
      >
        {status}
      </span>
    </div>
  );
}

