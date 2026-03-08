"use client";

import Link from "next/link";

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
  return (
    <div className="bg-white border rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Job Listings</h2>

        <Link href="/admin/careers/jobs/add">
          <Button>+ Add Job</Button>
        </Link>
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
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell className="font-medium">{job.title}</TableCell>

              <TableCell>{job.department}</TableCell>

              <TableCell>{job.location}</TableCell>

              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    job.status === "Published"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {job.status}
                </span>
              </TableCell>

              <TableCell>{job.applicants}</TableCell>

              <TableCell className="text-right space-x-2">
                <Button size="sm" variant="outline">
                  Edit
                </Button>

                <Button size="sm" variant="destructive">
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
