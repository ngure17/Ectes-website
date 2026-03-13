// EditJobClient.js
"use client";
import { useEffect, useState } from "react";
import AddJobForm from "../../../components/AddJobForm";

export default function EditJobClient({ id }) {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchJob() {
      try {
        const res = await fetch(`/api/careers/jobs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch job");
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error(err);
        alert("Error fetching job data");
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      const res = await fetch(`/api/careers/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update job");

      alert("Job updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating job");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!job) return <p>Job not found</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Job</h1>
      <AddJobForm initialData={job} onSubmit={handleUpdate} />
    </div>
  );
}
