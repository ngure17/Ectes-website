"use client";

import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function EnrollStudentDialog({ currentAdmin = "admin" }) {
  const [formData, setFormData] = useState({
    full_name: "",
    national_id: "",
    email: "",
    phone: "",
    course_id: "",
    status: "Active",
    notes: "",
    enrollment_source: "manual",
  });
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("/api/courses");
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    }
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.full_name ||
      !formData.national_id ||
      !formData.email ||
      !formData.phone ||
      !formData.course_id
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      // 1. Check if student exists
      const resCheck = await fetch(
        `/api/ectes_students/students?national_id=${formData.national_id}`,
      );

      let student = await resCheck.json();

      console.log("Student check:", student);

      if (student && student.length > 0) {
        // student already exists -> use it
        student = student[0];
      } else {
        // create new student
        const resStudent = await fetch("/api/ectes_students/students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: formData.full_name,
            national_id: formData.national_id,
            email: formData.email,
            phone: formData.phone,
          }),
        });

        if (!resStudent.ok) {
          throw new Error("Student creation failed");
        }

        student = await resStudent.json();

        console.log("Student created:", student);
      }
      // 3. Enroll student (send all fields now)
      await fetch("/api/ectes_students/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: student.id,
          course_id: formData.course_id,
          status: formData.status,
          notes: formData.notes || null,
          enrollment_source: formData.enrollment_source || "manual",
          enrolled_by: currentAdmin || "admin",
        }),
      });

      alert("Student enrolled successfully!");
      setFormData({
        full_name: "",
        national_id: "",
        email: "",
        phone: "",
        course_id: "",
        status: "Active",
        notes: "",
        enrollment_source: "manual",
      });
      setOpen(false);
    } catch (err) {
      console.error("Error enrolling student:", err);
      alert("Failed to enroll student. Check console for details.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Enroll Student Manually</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Enroll Student</DialogTitle>
          <DialogDescription>
            Add a student manually to a course.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
          />
          <Input
            name="national_id"
            placeholder="National ID"
            value={formData.national_id}
            onChange={handleChange}
          />
          <Input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          {/* Course Selection */}
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, course_id: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            {courses.length > 0 ? (
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={String(course.id)}>
                    {course.course_name}
                  </SelectItem>
                ))}
              </SelectContent>
            ) : (
              <SelectContent>
                <SelectItem value="none" disabled>
                  No courses available
                </SelectItem>
              </SelectContent>
            )}
          </Select>

          {/* Status */}
          <Select
            defaultValue="Active"
            onValueChange={(value) =>
              setFormData({ ...formData, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Dropped">Dropped</SelectItem>
            </SelectContent>
          </Select>

          {/* Notes */}
          <Input
            name="notes"
            placeholder="Notes (optional)"
            value={formData.notes}
            onChange={handleChange}
          />

          {/* Enrollment Source */}
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, enrollment_source: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Enrollment Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="api">API</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit" className="w-full">
            Enroll Student
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
