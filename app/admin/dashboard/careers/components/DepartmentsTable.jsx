"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function DepartmentsTable({ departments }) {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    setData(departments);
  }, [departments]);

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this department?",
    );
    if (!confirmDelete) return;

    try {
      await fetch("/api/careers/departments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      setData(data.filter((dep) => dep.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // START EDIT
  const startEdit = (dep) => {
    setEditingId(dep.id);
    setEditedName(dep.name);
  };

  // SAVE EDIT
  const handleUpdate = async (id) => {
    try {
      const res = await fetch("/api/careers/departments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name: editedName }),
      });

      const updated = await res.json();

      setData(data.map((dep) => (dep.id === id ? updated : dep)));
      setEditingId(null);
      setEditedName("");
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className="border rounded-xl p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Department</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((dep) => (
            <TableRow key={dep.id}>
              <TableCell>
                {editingId === dep.id ? (
                  <input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  dep.name
                )}
              </TableCell>

              <TableCell className="text-right space-x-2">
                {editingId === dep.id ? (
                  <>
                    <Button size="sm" onClick={() => handleUpdate(dep.id)}>
                      Save
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startEdit(dep)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(dep.id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
