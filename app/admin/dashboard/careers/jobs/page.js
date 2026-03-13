"use client";

import { useEffect, useState } from "react";
import JobsTable from "../components/JobsTable";

export default function Jobs() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/careers/jobs");
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="p-6">
        <p className="text-gray-500">Loading jobs...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen">

      <JobsTable jobs={jobs} />
    </main>
  );
}