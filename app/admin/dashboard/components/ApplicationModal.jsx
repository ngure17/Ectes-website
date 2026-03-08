// app/admin/components/ApplicationModal.jsx
"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function ApplicationModal({ app, close, refresh }) {
  const [status, setStatus] = useState(app.status || "Pending");
  const [updating, setUpdating] = useState(false);

  const updateStatus = async () => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/courses/apply/${app.application_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      refresh();
      close();
    } catch (error) {
      console.error(error);
      alert("Error updating application status");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader />
        <div
          className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-5 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl shadow-xl max-w-lg w-full p-6 relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">
              Application #{app.application_id}
            </h2>

            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              <p>
                <strong>Name:</strong> {app.full_name}
              </p>
              <p>
                <strong>Email:</strong> {app.email}
              </p>
              <p>
                <strong>Phone:</strong> {app.phone}
              </p>
              <p>
                <strong>Course:</strong> {app.course_name}
              </p>
              <p>
                <strong>Education:</strong> {app.education_level}
              </p>
              <p>
                <strong>Message:</strong>{" "}
                <span className="italic">{app.message}</span>
              </p>

              <div>
                <label className="block font-semibold mb-1">Status:</label>
                <select
                  className="bg-blue-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option>Pending</option>
                  <option>Reviewed</option>
                  <option>Accepted</option>
                  <option>Rejected</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition"
                onClick={close}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={updateStatus}
                disabled={updating}
              >
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
