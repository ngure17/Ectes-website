"use client";

import Link from "next/link";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

export default function JobsTable({ jobs }) {
  const [data, setData] = useState(jobs);

  // DELETE JOB
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      const res = await fetch("/api/careers/jobs", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Delete failed");

      // remove from UI
      setData(data.filter((job) => job.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete job");
    }
  };

  return (
    <div className="bg-white dark:bg-black border rounded-xl p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Job Listings</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applicants</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((job) => (
            <TableRow key={job.id}>
              <TableCell className="font-medium">{job.title}</TableCell>

              <TableCell>{job.department}</TableCell>

              <TableCell>{job.location}</TableCell>

              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    job.status === "published"
                      ? "bg-green-100 text-green-700"
                      : job.status === "draft"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {job.status}
                </span>
              </TableCell>

              <TableCell>{job.applicants_count}</TableCell>

              <TableCell className="text-right space-x-2">
                {/* EDIT */}
                <Link href={`/admin/dashboard/careers/jobs/edit/${job.id}`}>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </Link>

                {/* DELETE */}
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(job.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
