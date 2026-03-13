"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/app/ectes/components/Header";
import { Button } from "@/components/ui/button";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    education_level: "",
    message: "",
  });

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch(`/api/courses/${id}`);
        if (!res.ok) throw new Error("Course not found");

        const data = await res.json();

        // Handle image
        if (data.image) {
          if (data.image.startsWith("data:image")) {
            data.image_url = data.image;
          } else {
            data.image_url = `data:${data.image_type};base64,${data.image}`;
          }
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

  async function handleApply(e) {
    e.preventDefault();

    try {
      const res = await fetch("/api/courses/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course_id: id,
          ...formData,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Application submitted successfully!");
        setShowForm(false);
        setFormData({
          full_name: "",
          email: "",
          phone: "",
          education_level: "",
          message: "",
        });
      } else {
        alert("Application failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

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
    <main className="min-h-screen ">
      <Header />
      <div className="min-h-screen bg-gray-15000 dark:bg-gray-600 transition-colors duration-300">
        <div className="max-w-5xl mx-auto p-6">
          {/* Course Image */}
          <div className="w-full h-80 md:h-96 overflow-hidden rounded-xl shadow-md mb-6">
            <img
              src={course.image || "/default-course-logo.png"}
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
                <strong>Start Date:</strong>{" "}
                {new Date(course.course_start_date).toLocaleString() || "N/A"}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {new Date(course.course_end_date).toLocaleString() || "N/A"}
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

            <div className="flex gap-4">
              <button
                onClick={downloadPDF}
                className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Download Course Outline (PDF)
              </button>

              {course.course_outline && (
                <pre className="text-gray-800 dark:text-gray-200 text-sm whitespace-pre-wrap rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm">
                  {JSON.stringify(course.course_outline, null, 2)}
                </pre>
              )}
            </div>
          </div>
          {showForm && (
            <form
              onSubmit={handleApply}
              className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4"
            >
              <h2 className="text-xl font-semibold">Course Application</h2>

              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full border p-2 rounded"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Email"
                required
                className="w-full border p-2 rounded"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Phone"
                required
                className="w-full border p-2 rounded"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Enter current education level"
                className="w-full border p-2 rounded"
                value={formData.education_level}
                onChange={(e) =>
                  setFormData({ ...formData, education_level: e.target.value })
                }
              />

              <textarea
                placeholder="Add some Optional text about yourself or why you want to take this course"
                className="w-full border p-2 rounded"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />

              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded"
              >
                Submit Application
              </button>
            </form>
          )}

          <div className="mt-7 w-full flex flex-row gap-5 item justify-end border dark:bg-gray-600 p-6 rounded-lg shadow-sm">
            <Button
              onClick={() => setShowForm(!showForm)}
              className="border w-40 mt-3"
            >
              Apply Now
            </Button>
            <Button className="border w-40 mt-3">
              <Link href={"/ectes/company/contact"}>Apply via Email</Link>
            </Button>
          </div>

          {/* Back Link */}
          <div className="mt-6">
            <Link
              href="/ectes/company/trainings"
              className="text-[#DC5A59] dark:text-[#f4d03f] font-medium hover:underline"
            >
              &larr; Back to Training Programs
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
