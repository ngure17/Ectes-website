"use client";

import DepartmentsTable from "../components/DepartmentsTable";

export default function DepartmentsPage() {
  const departments = [
    { id: 1, name: "Engineering" },
    { id: 2, name: "AI" },
    { id: 3, name: "Marketing" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Departments</h1>

      <DepartmentsTable departments={departments} />
    </div>
  );
}
