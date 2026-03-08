import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

export default function ApplicationsTable({ applications }) {
  return (
    <div className="border rounded-xl p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Candidate</TableHead>
            <TableHead>Job</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id}>
              <TableCell className="font-medium">{app.name}</TableCell>

              <TableCell>{app.job}</TableCell>

              <TableCell>{app.email}</TableCell>

              <TableCell>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded">
                  {app.stage}
                </span>
              </TableCell>

              <TableCell>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </TableCell>

              <TableCell>
                <Button size="sm">Review</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
