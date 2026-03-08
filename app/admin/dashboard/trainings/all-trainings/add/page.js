"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function AddEctesCourse() {
  // Form state
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseModules, setCourseModules] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("course_title", courseTitle);
    formData.append("course_description", courseDescription);
    formData.append("course_modules", courseModules);
    if (imageFile) formData.append("image_file", imageFile);

    try {
      const res = await fetch("/api/courses/alltrainings", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Course added successfully!");
        setCourseTitle("");
        setCourseDescription("");
        setCourseModules("");
        setImageFile(null);
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
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
        <section>
          <div>
            <h1 className="m-5 font-bold">Add Training Course</h1>
          </div>
          <div className="m-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/dashboard/trainings">
                    Trainings on offer
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/dashboard/trainings/all-trainings">
                    All our Trainings
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Add Courses</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div>
            <form className="m-3 space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <Input
                  name="course_title"
                  placeholder="Course Title"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  required
                />
                <Textarea
                  name="course_description"
                  placeholder="Course Description"
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  required
                />
                <Textarea
                  name="course_modules"
                  placeholder="Course Modules"
                  value={courseModules}
                  onChange={(e) => setCourseModules(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  Course Image (optional)
                </label>
                <input
                  type="file"
                  name="image_file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="border rounded p-2 w-full"
                />
              </div>

              <div className="flex justify-center">
                <Button type="submit" className="btn btn-primary mt-4">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
