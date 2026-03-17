"use client";

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
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";

export default function JobsTable({ jobs }) {
  const [data, setData] = useState(jobs);
  const router = useRouter();

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
            <TableRow
              key={job.id}
              onClick={() =>
                router.push(`/admin/dashboard/careers/jobs/${job.id}`)
              }
            >
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
                {/* View */}

                <Button size="sm" variant="outline">
                  <Eye />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
