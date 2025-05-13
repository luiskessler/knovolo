"use client";

import type { User } from "@prisma/client";
import { Clipboard, EllipsisVertical, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SearchableTable } from "~/app/_components/dashboard/searchableTable";
import type { DomainWithRelations } from "~/types/prismaTypes";
import { api } from "~/trpc/react";

export default function DashboardTeam() {
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] =
    useState<boolean>(false);

  type UserTableItem = User & {
    fullName: string;
    departmentString: string;
  };

  const domains: DomainWithRelations[] = [];

  const users: User[] = [];

  const tableUsers: UserTableItem[] = users.map((user) => ({
    ...user,
    fullName: `${user.name || ""} ${user.surname || ""}`,
    departmentString: user.department.join(", "),
  }));

  const migrationServices = [
    {
      name: "CSV-File",
    },
    {
      name: "Slack",
    },
    {
      name: "Microsoft Teams",
    },
    {
      name: "Asana",
    },
    {
      name: "Jira",
    },
    {
      name: "Monday.com",
    },
    {
      name: "Trello",
    },
  ];

  const userColumns = [
    {
      field: "fullName" as keyof UserTableItem,
      label: "Name",
      sortable: true,
    },
    {
      field: "email" as keyof UserTableItem,
      label: "Email",
      sortable: true,
    },
    {
      field: "departmentString" as keyof UserTableItem,
      label: "Department",
      sortable: true,
    },
    {
      field: "role" as keyof UserTableItem,
      label: "Role",
      sortable: true,
    },
    {
      field: "status" as keyof UserTableItem,
      label: "Status",
      sortable: true,
    },
  ];

  const filterOptions = [
    {
      field: "role",
      label: "Role",
      options: ["All", "admin", "user"],
    },
    {
      field: "status",
      label: "Status",
      options: ["All", "active", "invited", "disabled"],
    },
  ];

  return (
    <>
      {isAddMemberModalOpen && (
        <AddMemberModal
          isOpen={isAddMemberModalOpen}
          onClose={() => setIsAddMemberModalOpen(false)}
        />
      )}
      <div className="h-full w-full flex-1 overflow-y-scroll p-6">
        <div className="mb-8 flex w-full flex-col gap-6 rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col">
            <p>Migrate your Team</p>
            <p className="text-sm text-gray-500">
              Connect to your existing services to easily migrate your team.
            </p>
          </div>

          <div className="flex gap-2">
            {migrationServices.map((service, index) => {
              return (
                <div
                  key={service.name + index}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-[#F6F6F6] p-2 px-4"
                >
                  <div className="flex w-fit items-center gap-2">
                    <p className="text-sm text-black">{service.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-8 flex w-full flex-col gap-6 rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <p>Allow E-Mail Domains</p>
              <p className="text-sm text-gray-500">
                E-Mail addresses at these domains are allowed.
              </p>
            </div>
            <button className="flex h-10 items-center gap-2 rounded-md bg-black px-4 text-sm text-white">
              <Plus size={20} />
              Domain
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {domains.map((domain) => (
              <div
                key={domain.id}
                className="flex items-center justify-between gap-2 rounded-md bg-[#F6F6F6] p-2 px-4"
              >
                <div className="flex items-center gap-2">
                  <Clipboard size={16} className="text-gray-500" />
                  <p className="text-sm text-black">{domain.domain}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm">Added by {domain.user.name}</p>
                  <EllipsisVertical size={16} className="text-gray-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <SearchableTable
            data={tableUsers}
            columns={userColumns}
            defaultSortField="fullName"
            defaultSortOrder="asc"
            title="Manage Members"
            filterOptions={filterOptions}
            searchPlaceholder="Search Member"
            addButton={{
              label: "Invite Member",
              onClick: () => setIsAddMemberModalOpen(true),
            }}
            description="Manage your organization's members and invite new ones."
            emptyStateMessage="No team members found matching your search criteria."
          />
        </div>
      </div>
    </>
  );
}

const AddMemberModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const user = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const createNewInvitationMutation =
      api.invitation.createNewInvitation.useMutation();

    try {
      const data = await createNewInvitationMutation.mutateAsync({
        email,
        name,
        surname,
        role,
      });

      if (data.status === 200) {
        setEmail("");
        setName("");
        setSurname("");
        setDepartment("");
        setRole("user");
        onClose();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Add New Member</h2>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
                placeholder="email@example.com"
                required
              />
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
                  placeholder="John"
                />
              </div>
              <div>
                <label
                  htmlFor="surname"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  id="surname"
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="department"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Department
              </label>
              <input
                id="department"
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
                placeholder="Engineering, Marketing, etc."
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="role"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as "user" | "admin")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:bg-gray-400"
              >
                {isLoading ? "Adding..." : "Add Member"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
