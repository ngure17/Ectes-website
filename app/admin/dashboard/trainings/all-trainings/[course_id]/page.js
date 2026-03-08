"use client";

import React, { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
  const { course_id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch(`/api/courses/alltrainings/${course_id}`);

        if (!res.ok) throw new Error("Training not found");

        const data = await res.json();

        setCourse(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [course_id]);

  if (loading) {
    return <p className="text-center mt-20">Loading training...</p>;
  }

  if (!course) {
    return <p className="text-center mt-20">Training not found</p>;
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader />

        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
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
                  <BreadcrumbPage>{course.course_id}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Training Card */}
            <div className=" shadow-md rounded-xl p-6">
              {/* Image */}
              {course.image && (
                <img
                  src={course.image || "Not Available"}
                  alt={course.course_title}
                  className="w-full h-80 object-cover rounded-lg mb-6"
                />
              )}

              {/* Title */}
              <h1 className="text-3xl font-bold mb-4">{course.course_title}</h1>

              {/* Description */}
              <p className="text-gray-700 mb-6">{course.course_description}</p>

              {/* Modules */}
              <div className="bg-gray-300 p-5 rounded-lg">
                <h2 className="text-xl font-semibold mb-3">Course Modules:</h2>

                <p className="text-gray-700 whitespace-pre-line">
                  {course.course_modules || "No modules added"}
                </p>
              </div>

              {/* Metadata */}
              <div className="mt-6 text-sm text-gray-500">
                Created at: {new Date(course.created_at).toLocaleDateString()}
              </div>
            </div>

            {/* Back */}
            <div className="mt-6">
              <Link
                href="/admin/dashboard/trainings/all-trainings"
                className="text-blue-600 hover:underline"
              >
                ← Back to trainings
              </Link>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
