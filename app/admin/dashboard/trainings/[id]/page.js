"use client";

import React from "react";
import { SiteHeader } from "@/components/site-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function TrainingDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch(`/api/courses/${id}`);
        if (!res.ok) throw new Error("Course not found");
        const data = await res.json();

        // Convert BYTEA image to base64 if image_url is empty
        if (!data.image_url && data.image) {
          const base64Image = Buffer.from(data.image).toString("base64");
          data.image_url = `data:${data.image_type};base64,${base64Image}`;
        }

        setCourse(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [id]);

  const downloadPDF = async () => {
    try {
      const res = await fetch(`/api/courses/pdf/${id}`);
      if (!res.ok) throw new Error("PDF not found");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${course.course_name}-outline.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      // revoke URL after a short delay to ensure download completes
      setTimeout(() => window.URL.revokeObjectURL(url), 1000);
    } catch (err) {
      console.error(err);
      alert("Failed to download PDF");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-16 text-gray-700 dark:text-gray-300">
        Loading...
      </p>
    );
  if (!course)
    return (
      <p className="text-center mt-16 text-gray-700 dark:text-gray-300">
        Course not found
      </p>
    );

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
        <main className="min-h-screen">
          <div className="min-h-screen bg-gray-15000  transition-colors duration-300">
            <div className="max-w-5xl mx-auto p-6">
              <div className="m-3 mt-3">
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
                        Trainings
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{course.id}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              {/* Course Image */}
              <div className="mt-5 w-full h-80 md:h-96 overflow-hidden rounded-xl shadow-md mb-6">
                <img
                  src={course.image || "Not Available"}
                  alt={course.course_name}
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Course Name & Description */}
              <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                {course.course_name}
              </h1>
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                {course.brief_explanation}
              </p>

              {/* Course Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-gray-700 dark:text-gray-300">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <p>
                    <strong>Duration:</strong> {course.duration}
                  </p>
                  <p>
                    <strong>Level:</strong> {course.level}
                  </p>
                  <p>
                    <strong>Start Date:</strong> {course.course_start_date}
                  </p>
                  <p>
                    <strong>End Date:</strong> {course.course_end_date || "N/A"}
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <p>
                    <strong>Mode:</strong> {course.mode_of_learning}
                  </p>
                  <p>
                    <strong>Examination Type:</strong>{" "}
                    {course.examination_type || "N/A"}
                  </p>
                </div>
              </div>

              {/* Course Outline */}
              <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Course Outline
                </h2>

                {course.course_outline_file ? (
                  <button
                    onClick={downloadPDF}
                    className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Download Course Outline (PDF)
                  </button>
                ) : (
                  <pre className="text-gray-800 dark:text-gray-200 text-sm whitespace-pre-wrap rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm">
                    {JSON.stringify(course.course_outline, null, 2)}
                  </pre>
                )}
              </div>

              {/* Back Link */}
              <div className="mt-6">
                <Link
                  href="/admin/dashboard/trainings"
                  className="text-[#DC5A59] dark:text-[#f4d03f] font-medium hover:underline"
                >
                  &larr; Back to Training Programs
                </Link>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
