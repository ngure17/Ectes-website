"use client";

import { useState, useEffect } from "react";
import ApplicationsTable from "../components/ApplicationsTable";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await fetch("/api/careers/applications", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch applications");
        const data = await res.json();
        setApplications(data); 
      } catch (err) {
        console.error(err);
        setError("Could not load applications.");
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, []);

  if (loading) return <p className="p-8 text-center">Loading applications...</p>;
  if (error) return <p className="p-8 text-center text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Applications</h1>
      {applications.length > 0 ? (
        <ApplicationsTable applications={applications} />
      ) : (
        <p className="text-gray-500">No applications found.</p>
      )}
    </div>
  );
}