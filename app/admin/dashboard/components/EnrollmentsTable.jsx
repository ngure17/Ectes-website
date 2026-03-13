"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye, Download } from "lucide-react";
import StudentDetailsDialog from "./StudentDetailsDialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function EnrollmentsTable() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
  });

  // Fetch enrollments
  useEffect(() => {
    async function fetchEnrollments() {
      try {
        const res = await fetch("/api/ectes_students/enrollments");
        if (!res.ok) throw new Error("Failed to fetch enrollments");
        const data = await res.json();
        setEnrollments(data);
      } catch (err) {
        console.error("Error fetching enrollments:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEnrollments();
  }, []);

  const handleDelete = async (studentId) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this enrollment?",
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/ectes_students/enrollments/${studentId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete enrollment");

      setEnrollments(enrollments.filter((e) => e.id !== studentId));
      alert("Enrollment deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete enrollment");
    }
  };

  // Filter enrollments based on search and status
  const filteredEnrollments = useMemo(() => {
    return enrollments.filter((e) => {
      const matchesSearch =
        !filters.search ||
        e.student_name?.toLowerCase().includes(filters.search.toLowerCase()) ||
        e.email?.toLowerCase().includes(filters.search.toLowerCase()) ||
        e.phone?.includes(filters.search);
      const matchesStatus =
        !filters.status ||
        e.status?.toLowerCase() === filters.status.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [enrollments, filters]);

  // CSV Export
  const exportCSV = () => {
    const headers = [
      "Student",
      "National ID",
      "Email",
      "Phone",
      "Course",
      "Status",
      "Date",
    ];
    const rows = filteredEnrollments.map((e) => [
      e.student_name,
      e.national_id,
      e.email,
      e.phone,
      e.course_name,
      e.status,
      e.date,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "enrollments.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <p className="p-4">Loading enrollments...</p>;

  return (
    <div className="p-4">
      {/* Filters & Export */}
      <div className="flex flex-wrap justify-between gap-1 mb-4">
        <input
          type="text"
          placeholder="Search by name, email, phone..."
          className="border rounded px-2 py-1"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <select
          className="border rounded px-2 py-1 dark:bg-gray-700 dark:border-gray-600e"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Dropped">Dropped</option>
        </select>
        <Button variant="outline" onClick={exportCSV} className={"m-3"}>
          <Download size={16} className="mr-2" />
          Export CSV
        </Button>
      </div>

      <Table>
        <TableCaption>Students enrolled in courses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>National ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredEnrollments.map((enrollment) => (
            <TableRow
              key={enrollment.id}
              className="cursor-pointer"
              onClick={() => {
                setSelectedStudent(enrollment);
                setOpen(true);
              }}
            >
              <TableCell className="font-medium">
                {enrollment.student_name}
              </TableCell>
              <TableCell>{enrollment.national_id}</TableCell>
              <TableCell>{enrollment.email}</TableCell>
              <TableCell>{enrollment.phone}</TableCell>
              <TableCell>{enrollment.course_name}</TableCell>
              <TableCell>{enrollment.status}</TableCell>
              <TableCell>{enrollment.date}</TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye size={16} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Pencil size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(enrollment.id)}
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <StudentDetailsDialog
        student={selectedStudent}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
