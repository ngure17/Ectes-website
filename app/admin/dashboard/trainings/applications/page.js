"use client";

import { useState, useEffect, useMemo } from "react";
import { SiteHeader } from "@/components/site-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import ApplicationsTable from "../../components/ApplicationsTable";
import Filters from "../../components/Filters";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    course_id: "",
    status: "",
    search: "",
  });

  // Fetch applications
  const fetchApplications = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/courses/apply");

      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setApplications(data);
      } else {
        setApplications([]);
      }
    } catch (err) {
      console.error("Failed to fetch applications:", err);
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Filtered applications computed from filters
  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      const matchesCourse =
        !filters.course_id ||
        String(app.course_id) === String(filters.course_id);
      const matchesStatus =
        !filters.status ||
        app.status?.toLowerCase() === filters.status.toLowerCase();
      const matchesSearch =
        !filters.search ||
        app.full_name?.toLowerCase().includes(filters.search.toLowerCase()) ||
        app.email?.toLowerCase().includes(filters.search.toLowerCase());

      return matchesCourse && matchesStatus && matchesSearch;
    });
  }, [applications, filters]);

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

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Applications Dashboard</h1>

          <Filters filters={filters} setFilters={setFilters} />

          {loading && (
            <p className="text-muted-foreground">Loading applications...</p>
          )}

          {error && <p className="text-red-500 font-medium">{error}</p>}

          {!loading && !error && (
            <ApplicationsTable
              applications={filteredApps}
              refresh={fetchApplications} // ✅ pass refresh properly
            />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
