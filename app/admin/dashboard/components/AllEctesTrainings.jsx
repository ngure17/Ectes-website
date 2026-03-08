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

export function AllEctesTrainings() {
  const [trainings, setTrainings] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  // Fetch trainings
  useEffect(() => {
    async function fetchTrainings() {
      try {
        const res = await fetch("/api/courses/alltrainings");
        const data = await res.json();

        console.log("Trainings:", data); // DEBUG

        setTrainings(data);
      } catch (error) {
        console.error("Error fetching trainings:", error);
      }
    }

    fetchTrainings();
  }, []);

  // Filter trainings
  const filteredTrainings = trainings.filter((training) => {
    const title = training?.course_title ?? "";
    const searchValue = search ?? "";

    return title.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <div className="p-6 bg-background rounded-xl shadow-md">
      {/* Search */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search trainings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 rounded-md border px-4 py-2 text-sm focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-2xl">
        <table className="w-full border-collapse">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-4 text-left">Training Title</th>
              <th className="px-6 py-4 text-center">Description</th>
              <th className="px-6 py-4 text-right">Options</th>
            </tr>
          </thead>

          <tbody>
            {filteredTrainings.map((training) => (
              <tr
                key={training.course_id}
                className="border-b hover:bg-muted/10 transition cursor-pointer"
                onClick={() =>
                  router.push(
                    `/admin/dashboard/trainings/all-trainings/${training.course_id}`,
                  )
                }
              >
                {/* Title */}
                <td className="px-6 py-4 font-medium">
                  {training.course_title}
                </td>

                {/* Description */}
                <td className="px-6 py-4 text-center">
                  {training.course_description ?? "—"}
                </td>

                {/* Options */}
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    {/* Edit */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(
                          `/admin/dashboard/trainings/add?course_id=${training.course_id}`,
                        );
                      }}
                    >
                      <IconEdit className="w-4 h-4 text-blue-500" />
                    </Button>

                    {/* Delete */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={async (e) => {
                        e.stopPropagation();

                        if (
                          confirm(
                            "Are you sure you want to delete this training?",
                          )
                        ) {
                          try {
                            const res = await fetch(
                              `/api/courses/alltrainings/${training.course_id}`,
                              {
                                method: "DELETE",
                              },
                            );

                            if (res.ok) {
                              setTrainings((prev) =>
                                prev.filter(
                                  (t) => t.course_id !== training.course_id,
                                ),
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

                    {/* Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <IconDotsVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(
                              `/admin/dashboard/trainings/add?course_id=${training.course_id}`,
                            )
                          }
                        >
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => alert("Use delete button instead")}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}

            {filteredTrainings.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-6 text-muted-foreground"
                >
                  No trainings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
