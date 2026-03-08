"use client";

import ApplicationsTable from "../components/ApplicationsTable";
export default function ApplicationsPage() {
  const applications = [
    {
      id: 1,
      name: "John Doe",
      job: "ML Engineer",
      email: "john@email.com",
      stage: "Screening",
    },
    {
      id: 2,
      name: "Mary Ann",
      job: "Backend Dev",
      email: "mary@email.com",
      stage: "Applied",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Applications</h1>

      <ApplicationsTable applications={applications} />
    </div>
  );
}
