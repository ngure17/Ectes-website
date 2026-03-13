"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Trash2 } from "lucide-react";

export default function StudentDetailsDialog({ student, open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [applications, setApplications] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(student?.status);

  useEffect(() => {
    if (!open || !student) return;

    async function fetchStudentDetails() {
      try {
        setLoading(true);

        const resHistory = await fetch(
          `/api/ectes_students/enrollments?student_id=${student.id}`,
        );
        const historyData = await resHistory.json();
        setHistory(historyData);

        const resApps = await fetch(
          `/api/ectes_students/other_applications_of_a_student?phone=${student.phone}`,
        );
        const appsData = await resApps.json();
        setApplications(appsData);
      } catch (err) {
        console.error("Failed fetching student details", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStudentDetails();
  }, [student, open]);

  const getStatusColor = (status) => {
    if (status === "Active") return "text-green-600";
    if (status === "Completed") return "text-blue-600";
    if (status === "Pending") return "text-yellow-600";
    if (status === "Dropped") return "text-red-600";
    return "text-gray-600";
  };

  const filteredHistory = history.filter(
    (h) => h.course_name !== student.course_name,
  );

  async function handleDeleteStudent() {
    if (!confirm("Delete this student and all enrollments?")) return;

    try {
      const res = await fetch(`/api/ectes_students/students?id=${student.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      alert("Student deleted successfully");
      setOpen(false);
      window.location.reload();
    } catch {
      alert("Failed to delete student");
    }
  }

  async function handleDeleteEnrollment(id) {
    if (!confirm("Delete this enrollment?")) return;

    await fetch(`/api/ectes_students/enrollments?id=${id}`, {
      method: "DELETE",
    });

    setHistory((prev) => prev.filter((e) => e.id !== id));
  }

  async function updateStatus() {
    await fetch(`/api/ectes_students/enrollments`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        enrollment_id: student.enrollment_id,
        status: currentStatus,
      }),
    });

    alert("Status updated");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{student?.full_name}</DialogTitle>
          <DialogDescription>
            Student profile, enrollments and applications
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-6">
            {/* STUDENT INFO */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Student Information</h3>

              <p>
                <strong>National ID:</strong> {student?.national_id || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {student?.email || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {student?.phone || "N/A"}
              </p>

              <div className="flex gap-2 mt-3">
                <Button variant="destructive" onClick={handleDeleteStudent}>
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete Student
                </Button>
              </div>
            </div>

            {/* CURRENT COURSE */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Current Course</h3>

              <p>
                <strong>Course:</strong> {student?.name}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className={getStatusColor(currentStatus)}>
                  {currentStatus}
                </span>
              </p>

              <select
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value)}
                className="border rounded px-2 py-1 mt-2"
              >
                <option>Active</option>
                <option>Completed</option>
                <option>Dropped</option>
              </select>

              <Button className="ml-3" size="sm" onClick={updateStatus}>
                Update
              </Button>
              <p>
                <strong>
                  Enrollment Date:{" "}
                  <span>{new Date(student?.date).toLocaleDateString()}</span>
                </strong>
              </p>
            </div>

            {/* COURSE HISTORY */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Course History</h3>

              {filteredHistory.length === 0 ? (
                <p>No history</p>
              ) : (
                <ul className="space-y-2">
                  {filteredHistory.map((e) => (
                    <li
                      key={e.id}
                      className="flex justify-between items-center"
                    >
                      <span>
                        {e.course_name} —{" "}
                        <span className={getStatusColor(e.status)}>
                          {e.status}
                        </span>
                      </span>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteEnrollment(e.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* APPLICATIONS */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Applications</h3>

              {applications.length === 0 ? (
                <p>No applications</p>
              ) : (
                <ul className="space-y-2">
                  {applications.map((app) => (
                    <li
                      key={app.application_id}
                      className="flex justify-between"
                    >
                      <span>
                        {app.course_name} —{" "}
                        <span className={getStatusColor(app.status)}>
                          {app.status}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
