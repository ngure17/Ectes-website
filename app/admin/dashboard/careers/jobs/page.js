"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const jobs = [
{
id:1,
title:"Machine Learning Engineer",
department:"AI",
location:"Remote",
status:"Published",
applicants:14
},
{
id:2,
title:"Backend Developer",
department:"Engineering",
location:"Nairobi",
status:"Draft",
applicants:0
},
{
id:3,
title:"Data Scientist",
department:"AI",
location:"Remote",
status:"Published",
applicants:6
},
{
id:4,
title:"Frontend Engineer",
department:"Engineering",
location:"Remote",
status:"Published",
applicants:9
},
];
export default function JobsTable() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Job Listings</h2>
          <Button asChild>
            <a href="/admin/dashboard/careers/jobs/add">+ Add Job</a>
          </Button>
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
                  <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">
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
      </CardContent>
    </Card>
  );
}
