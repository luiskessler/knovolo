"use client";

import { Search, ArrowUpDown, Plus } from "lucide-react";
import React, { useState } from "react";
import { formatDateToLocaleString } from "~/utils/general/dateHelper";

type TableItem = Record<string, any>;

type ColumnDef<T extends TableItem> = {
  field: keyof T;

  label: string;

  sortable?: boolean;

  render?: (item: T) => React.ReactNode;
};

type FilterOption = {
  field: string;
  label: string;
  options: string[];
};

interface DataTableProps<T extends TableItem> {
  data: T[];

  columns: ColumnDef<T>[];

  defaultSortField?: keyof T;

  defaultSortOrder?: "asc" | "desc";

  title?: string;

  filterOptions?: FilterOption[];

  searchPlaceholder?: string;

  addButton?: {
    label: string;
    onClick: () => void;
  };

  emptyStateMessage?: string;

  onRowClick?: (item: T) => void;

  description?: string;
}

export function SearchableTable<T extends TableItem>({
  data,
  columns,
  defaultSortField,
  defaultSortOrder = "asc",
  title,
  filterOptions = [],
  searchPlaceholder = "Search...",
  addButton,
  emptyStateMessage = "No items found matching your search criteria.",
  onRowClick,
  description,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortField, setSortField] = useState<keyof T | undefined>(
    defaultSortField,
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(defaultSortOrder);
  const [filters, setFilters] = useState<Record<string, string>>(() => {
    return filterOptions.reduce(
      (acc, filter) => {
        acc[filter.field] = "All";
        return acc;
      },
      {} as Record<string, string>,
    );
  });

  const handleSort = (field: keyof T) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const filteredData = data.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      columns.some((column) => {
        const value = item[column.field];
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      });

    const matchesFilters = Object.entries(filters).every(([field, value]) => {
      return value === "All" || String(item[field]) === value;
    });

    return matchesSearch && matchesFilters;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;

    const valueA = a[sortField];
    const valueB = b[sortField];

    let comparison = 0;

    if ((valueA as any) instanceof Date && (valueB as any) instanceof Date) {
      comparison = valueA.getTime() - valueB.getTime();
    } else if (typeof valueA === "string" && typeof valueB === "string") {
      comparison = valueA.localeCompare(valueB);
    } else {
      comparison = valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  return (
    <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
      {(title || addButton) && (
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          {title && (
            <div className="flex flex-col">
              <p>{title}</p>
              {description && (
                <p className="text-sm text-gray-500">{description}</p>
              )}
            </div>
          )}
          {addButton && (
            <button
              onClick={addButton.onClick}
              className="flex h-10 items-center gap-2 rounded-md bg-black px-4 text-sm text-white"
            >
              <Plus size={20} />
              {addButton.label}
            </button>
          )}
        </div>
      )}

      {(searchPlaceholder || filterOptions.length > 0) && (
        <div className="flex flex-wrap items-center gap-4 p-6">
          {searchPlaceholder && (
            <div className="relative w-full max-w-md">
              <Search className="absolute top-0 bottom-0 left-3 my-auto h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}

          {filterOptions.map((filter) => (
            <div key={filter.field} className="flex items-center gap-2">
              <label
                htmlFor={`filter-${filter.field}`}
                className="text-sm font-medium text-gray-700"
              >
                {filter.label}:
              </label>
              <select
                id={`filter-${filter.field}`}
                value={filters[filter.field]}
                onChange={(e) =>
                  handleFilterChange(filter.field, e.target.value)
                }
                className="rounded-md border border-gray-300 px-3 py-2 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
              >
                {filter.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.field)}
                  className={`px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-500 uppercase ${
                    column.sortable ? "cursor-pointer hover:bg-gray-100" : ""
                  }`}
                  onClick={() => column.sortable && handleSort(column.field)}
                >
                  <div className="flex items-center gap-1">
                    {column.label}
                    {column.sortable && (
                      <ArrowUpDown
                        size={14}
                        className={`${
                          sortField === column.field
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {sortedData.map((item, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 ${onRowClick ? "cursor-pointer" : ""}`}
                onClick={() => onRowClick && onRowClick(item)}
              >
                {columns.map((column) => (
                  <td
                    key={String(column.field)}
                    className="px-6 py-4 text-sm text-gray-700"
                  >
                    {column.render
                      ? column.render(item)
                      : typeof item[column.field] === "object" &&
                          (item[column.field] as any) instanceof Date
                        ? formatDateToLocaleString(item[column.field] as Date)
                        : String(item[column.field])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {sortedData.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            {emptyStateMessage}
          </div>
        )}
      </div>
    </div>
  );
}
