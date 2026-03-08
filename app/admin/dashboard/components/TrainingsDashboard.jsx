"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconEdit, IconTrash, IconDotsVertical } from "@tabler/icons-react";

export function TrainingsDashboard() {
  const [trainings, setTrainings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const router = useRouter();

  // Fetch trainings
  useEffect(() => {
    async function fetchTrainings() {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setTrainings(data);
    }
    fetchTrainings();
  }, []);

  //
  const filteredtrainings = trainings.filter((training) => {
    const title = training?.course_name ?? "";
    const searchValue = search ?? "";

    const matchesSearch = title
      .toLowerCase()
      .includes(searchValue.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || training.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-background rounded-xl shadow-md">
      {/* Top controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search trainings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 rounded-md border px-4 py-2 text-sm focus:ring-2 focus:ring-primary"
        />

        <div className="flex items-center gap-2">
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
        <table className="w-full border-collapse">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-4 text-left">Training</th>
              <th className="px-6 py-4 text-center">Level</th>
              <th className="px-6 py-4 text-right">Options</th>
            </tr>
          </thead>

          <tbody>
            {filteredtrainings.map((training) => (
              <tr
                key={training.id}
                className="border-b hover:bg-muted/10 transition cursor-pointer"
                onClick={() =>
                  router.push(`/admin/dashboard/trainings/${training.id}`)
                }
              >
                <td className="px-6 py-4 font-medium">
                  {training.course_name}
                </td>

                <td className="px-6 py-4 text-center">
                  {training.level ?? "—"}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(
                          `/admin/dashboard/trainings/add?id=${training.id}`,
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
                        e.stopPropagation(); // prevent row click

                        if (
                          confirm(
                            "Are you sure you want to delete this training?",
                          )
                        ) {
                          try {
                            const res = await fetch(
                              `/api/courses/${training.id}`,
                              {
                                method: "DELETE",
                              },
                            );

                            if (res.ok) {
                              // Remove from UI
                              setTrainings((prev) =>
                                prev.filter((s) => s.id !== training.id),
                              );
                              alert("Training deleted successfully");
                            } else {
                              alert("Failed to delete training");
                            }
                          } catch (error) {
                            console.error(error);
                            alert("Error deleting training");
                          }
                        }
                      }}
                    >
                      <IconTrash className="w-4 h-4 text-red-500" />
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
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
