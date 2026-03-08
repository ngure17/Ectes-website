"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconEdit, IconTrash, IconDotsVertical } from "@tabler/icons-react";

export function ServicesDashboard() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const router = useRouter();

  // Fetch services from API
  useEffect(() => {
    async function fetchServices() {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data);
    }
    fetchServices();
  }, []);

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || service.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Row click handler
  const handleRowClick = (slug) => {
    router.push(`/admin/dashboard/services/${slug}`); // redirect to details page
  };

  return (
    <div className="p-6 bg-background rounded-xl shadow-md">
      {/* Top controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show:</span>

          <Button
            size="sm"
            variant={statusFilter === "all" ? "default" : "outline"}
            onClick={() => setStatusFilter("all")}
          >
            All
          </Button>

          <Button
            size="sm"
            variant={statusFilter === "Published" ? "default" : "outline"}
            onClick={() => setStatusFilter("Published")}
          >
            Published
          </Button>

          <Button
            size="sm"
            variant={statusFilter === "Draft" ? "default" : "outline"}
            onClick={() => setStatusFilter("Draft")}
          >
            Draft
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-2xl">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-4 text-left w-[60%]">Service</th>
              <th className="px-6 py-4 text-center w-[20%]">Status</th>
              <th className="px-6 py-4 text-right w-[20%]">Options</th>
            </tr>
          </thead>

          <tbody>
            {filteredServices.map((service) => (
              <tr
                key={service.id}
                className="border-b last:border-b-0 hover:bg-muted/10 transition-colors cursor-pointer"
                onClick={() => handleRowClick(service.slug)}
              >
                <td className="px-6 py-4 font-medium">{service.title}</td>

                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        service.status === "Published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {service.status}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1"
                      onClick={(e) => {
                        e.stopPropagation(); // prevent row click
                        router.push(
                          `/admin/dashboard/services/add?slug=${service.slug}`,
                        );
                      }}
                    >
                      <IconEdit className="w-4 h-4 text-blue-500" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1"
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (
                          confirm(
                            "Are you sure you want to delete this service?",
                          )
                        ) {
                          await fetch(`/api/services/${service.slug}`, {
                            method: "DELETE",
                          });
                          // refresh services list
                          setServices(
                            services.filter((s) => s.id !== service.id),
                            console.log("Deleting service:", service.slug),
                          );
                        }
                      }}
                    >
                      <IconTrash className="w-4 h-4 text-red-500" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-1">
                          <IconDotsVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
