// app/admin/components/ApplicationsTable.jsx
"use client";

import { useState } from "react";
import ApplicationModal from "./ApplicationModal";

export default function ApplicationsTable({ applications, refresh }) {
  const [selectedApp, setSelectedApp] = useState(null);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "reviewed":
        return "bg-blue-200 text-blue-800";
      case "accepted":
        return "bg-green-200 text-green-800";
      case "rejected":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const exportCSV = () => {
    if (!applications || applications.length === 0) return;

    const headers = [
      "ID",
      "Full Name",
      "Email",
      "Course",
      "Education",
      "Status",
      "Submitted At",
    ];

    const rows = applications.map((app) => [
      app.application_id,
      app.full_name,
      app.email,
      app.course_name,
      app.education_level,
      app.status || "Pending",
      new Date(app.created_at).toLocaleString(),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `applications_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!applications || applications.length === 0) {
    return <p className="text-center py-4">No applications found.</p>;
  }

  return (
    <>
      <div className="flex justify-end mb-2">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors"
          onClick={exportCSV}
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border px-2 py-1 text-left">ID</th>
              <th className="border px-2 py-1 text-left">Name</th>
              <th className="border px-2 py-1 text-left">Email</th>
              <th className="border px-2 py-1 text-left">Course</th>
              <th className="border px-2 py-1 text-left">Education</th>
              <th className="border px-2 py-1 text-left">Status</th>
              <th className="border px-2 py-1 text-left">Submitted</th>
              <th className="border px-2 py-1 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.application_id} className="hover:bg-amber-600">
                <td className="border px-2 py-1">{app.application_id}</td>
                <td className="border px-2 py-1">{app.full_name}</td>
                <td className="border px-2 py-1">{app.email}</td>
                <td className="border px-2 py-1">{app.course_name}</td>
                <td className="border px-2 py-1">{app.education_level}</td>
                <td className="border px-2 py-1">
                  <span
                    className={`px-2 py-1 rounded text-sm font-semibold ${getStatusColor(
                      app.status,
                    )}`}
                  >
                    {app.status || "Pending"}
                  </span>
                </td>
                <td className="border px-2 py-1">
                  {new Date(app.created_at).toLocaleString()}
                </td>
                <td className="border px-2 py-1">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition-colors"
                    onClick={() => setSelectedApp(app)}
                  >
                    View / Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedApp && (
        <ApplicationModal
          app={selectedApp}
          close={() => setSelectedApp(null)}
          refresh={refresh}
        />
      )}
    </>
  );
}
