"use client";

import AddJobForm from "../../components/AddJobForm";

export default function Add() {

  const handleCreateJob = async (data) => {
    try {

      const res = await fetch("/api/careers/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed");

      alert("Job created successfully");

    } catch (error) {
      console.error(error);
      alert("Error creating job");
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">
        Create Job Posting
      </h1>

      <AddJobForm onSubmit={handleCreateJob} />
    </div>
  );
}