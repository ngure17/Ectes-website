import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

export default function DepartmentsTable({ departments }) {
  return (
    <div className=" border rounded-xl p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Department</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {departments.map((dep) => (
            <TableRow key={dep.id}>
              <TableCell>{dep.name}</TableCell>

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
