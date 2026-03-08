import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function AllEctesCourses() {
  const [trainingPrograms, setTrainingPrograms] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      const res = await fetch("/api/courses/alltrainings");
      const data = await res.json();

      const mappedData = data.map((course) => ({
        id: course.course_id,
        title: course.course_title,
        description: course.course_description,
        modules: course.course_modules,
        image: course.image,
        image_type: course.image_type,
      }));

      setTrainingPrograms(mappedData);
    }

    fetchCourses();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      <section className="grid md:grid-cols-3 gap-8 p-8">
        {trainingPrograms.map((program) => (
          <div
            key={program.id}
            className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition"
          >
            {/* Image */}
            <div className="w-full">
              <img
                src={`data:${program.image_type};base64,${program.image}`}
                alt={program.title}
                className="w-full h-[180px] object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <h1 className="text-lg font-bold text-amber-800">
                {program.title}
              </h1>

              <p className="text-sm text-gray-600 line-clamp-3">
                {program.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {program.modules?.split(",").map((module, index) => (
                  <span
                    key={index}
                    className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full"
                  >
                    {module.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
