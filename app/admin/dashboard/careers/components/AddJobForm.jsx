"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const emptyForm = {
  title: "",
  department_id: "",
  location: "",
  job_type: "",
  experience_level: "",
  salary_range: "",
  description: "",
  responsibilities: "",
  requirements: "",
  status: "draft",
};

export default function AddJobForm({ onSubmit, initialData }) {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialData || emptyForm);

  const isEditing = !!initialData;

  // Sync if initialData arrives late (after async fetch in parent)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Fetch departments
  useEffect(() => {
    async function fetchDepartments() {
      try {
        const res = await fetch("/api/careers/departments");
        if (!res.ok) throw new Error("Failed to fetch departments");
        const data = await res.json();
        setDepartments(data);
      } catch (err) {
        console.error(err);
        alert("Error loading departments");
      }
    }
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "department_id" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(formData);
      if (!isEditing) {
        setFormData(emptyForm);
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <p className="text-gray-500 mt-1">
          {isEditing
            ? "Edit the job posting details below"
            : "Add a new job posting to the careers page"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Title */}
        <div>
          <label className="block mb-2 font-medium">Job Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-3 dark:bg-gray-800"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block mb-2 font-medium">Department</label>
          <select
            name="department_id"
            value={formData.department_id}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-3 dark:bg-gray-800"
          >
            <option value="">Select Department</option>
            {departments.map((dep) => (
              <option key={dep.id} value={dep.id}>
                {dep.name}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block mb-2 font-medium">Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded-md p-3 dark:bg-gray-800"
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block mb-2 font-medium">Job Type</label>
          <select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            className="w-full border rounded-md p-3 dark:bg-gray-800"
          >
            <option value="">Select Type</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
            <option>Remote</option>
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block mb-2 font-medium">Experience Level</label>
          <select
            name="experience_level"
            value={formData.experience_level}
            onChange={handleChange}
            className="w-full border rounded-md p-3 dark:bg-gray-800"
          >
            <option value="">Select Level</option>
            <option>Entry Level</option>
            <option>Mid Level</option>
            <option>Senior</option>
            <option>Lead</option>
          </select>
        </div>

        {/* Salary Range */}
        <div>
          <label className="block mb-2 font-medium">Salary Range</label>
          <input
            name="salary_range"
            value={formData.salary_range}
            onChange={handleChange}
            placeholder="e.g 80k - 120k"
            className="w-full border rounded-md p-3 dark:bg-gray-800"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-2 font-medium">Job Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-md p-3 dark:bg-gray-800"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-md p-3 dark:bg-gray-800"
          />
        </div>

        {/* Responsibilities */}
        <div>
          <label className="block mb-2 font-medium">Responsibilities</label>
          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-md p-3 dark:bg-gray-800"
          />
        </div>

        {/* Requirements */}
        <div>
          <label className="block mb-2 font-medium">Requirements</label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-md p-3 dark:bg-gray-800"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
          disabled={loading}
        >
          {loading ? "Saving..." : isEditing ? "Update Job" : "Create Job"}
        </Button>
      </form>
    </div>
  );
}
