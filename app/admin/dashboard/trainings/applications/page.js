"use client";

import { useState, useEffect, useMemo } from "react";
import { SiteHeader } from "@/components/site-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import ApplicationsTable from "../../components/ApplicationsTable";
import Filters from "../../components/Filters";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    course_id: "",
    status: "",
    search: "",
  });

  // DELETE dialog state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteMonths, setDeleteMonths] = useState(3);
  const [deleteStatus, setDeleteStatus] = useState("");
  const [deleteCourse, setDeleteCourse] = useState("");
  const [courses, setCourses] = useState([]);

  // Fetch applications
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/courses/apply");
      if (!res.ok) throw new Error(`API Error: ${res.status}`);
      const data = await res.json();
      setApplications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  // Fetch courses for delete dialog
  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    }
    fetchCourses();
  }, []);

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

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete these applications?")) return;
    if (deleteMonths < 3) {
      alert("You can only delete applications older than 3 months.");
      return;
    }

    try {
      const res = await fetch("/api/courses/apply", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          olderThanMonths: deleteMonths,
          status: deleteStatus || undefined,
          course_id: deleteCourse || undefined,
        }),
      });

      const data = await res.json();
      alert(data.message || data.error);
      setDeleteOpen(false);
      fetchApplications(); // refresh table
    } catch (err) {
      console.error(err);
      alert("Failed to delete applications");
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
        <div className="p-6">
          <div className="flex flex-1 justify-between items-center">
            <h1 className="text-2xl font-bold mb-4">Applications Dashboard</h1>
            <div className="flex gap-2">
              <Link href="/admin/dashboard/trainings/enrollments">
                <Button>View Enrollments</Button>
              </Link>

              {/* Delete Dialog Trigger */}
              <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive">Delete Applications</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[400px]">
                  <DialogHeader>
                    <DialogTitle>Delete Applications</DialogTitle>
                    <DialogDescription>
                      Select parameters to delete applications older than 3
                      months.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 mt-4">
                    {/* Months */}
                    <Input
                      type="number"
                      value={deleteMonths}
                      onChange={(e) =>
                        setDeleteMonths(parseInt(e.target.value))
                      }
                      placeholder="Months older than"
                      min={3}
                    />

                    {/* Status */}
                    <Select onValueChange={(value) => setDeleteStatus(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Reviewed">Reviewed</SelectItem>
                        <SelectItem value="Accepted">Accepted</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Course */}
                    <Select onValueChange={(value) => setDeleteCourse(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Course (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Courses</SelectItem>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={String(course.id)}>
                            {course.course_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={handleDelete}
                    >
                      Delete Applications
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="mt-4 mb-5">
            <Breadcrumb className="bg-transparent p-0 ">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/admin/dashboard"
                    className="hover:text-amber-700"
                  >
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/admin/dashboard/trainings/applications"
                    className="hover:text-amber-700"
                  >
                    View All Applications
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/admin/dashboard/trainings/enrollments"
                    className="hover:text-amber-700"
                  >
                    All Enrollments
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>:</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <Filters filters={filters} setFilters={setFilters} />

          {loading && (
            <p className="text-muted-foreground">Loading applications...</p>
          )}
          {error && <p className="text-red-500 font-medium">{error}</p>}

          {!loading && !error && (
            <ApplicationsTable
              applications={filteredApps}
              refresh={fetchApplications}
            />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
