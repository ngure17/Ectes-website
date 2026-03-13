"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AddDepartmentForm({ onAdd }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/careers/departments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      //if (!res.ok) throw new Error("Failed to add department");

      const newDepartment = await res.json();
      onAdd(newDepartment); // update parent state
      setName(""); // reset form
    } catch (err) {
      console.error(err);
      alert("Error adding department");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Add Department</h2>

      <div>
        <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Department Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
          placeholder="Enter department name"
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Department"}
      </Button>
    </form>
  );
}