"use client";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { GraduationCap, Wrench, Eye } from "lucide-react";
import Link from "next/link";
import AllEctesCourses from "../../components/AllEctesCourses";

export default function TrainingList() {
  const [trainingPrograms, setTrainingPrograms] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      const res = await fetch("/api/courses");
      const data = await res.json();

      const mappedData = data.map((course) => {
        let imageSrc = "/heroSection/mechanics service.jpeg"; // default fallback

        if (course.image && course.image_type) {
          imageSrc = `data:${course.image_type};base64,${course.image}`;
        }

        return {
          id: course.id,
          title: course.course_name,
          description: course.brief_explanation,
          duration: course.duration,
          level: course.level,
          start_date: course.course_start_date,
          mode_of_learning: course.mode_of_learning,
          image: imageSrc,
          icon: GraduationCap,
        };
      });

      setTrainingPrograms(mappedData);
    }

    fetchCourses();
  }, []);
  return (
    <div className="min-h-screen">
      {/* ================= HERO SECTION ================= */}
      <Header />
      <section className="bg-gradient-to-br from-[#F4D03F] to-[#f0c030] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <GraduationCap className="w-20 h-20 mx-auto mb-6 text-gray-900" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Professional Training Programs
          </h1>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto">
            Gain practical skills and industry-recognized certifications through
            our hands-on training programs
          </p>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Why Train With Us?
        </h2>

        {/* The container below forces a row and prevents wrapping */}
        <div className="flex flex-1 items-center justify-evenly gap-6 mb-16 w-full max-w-7xl mx-auto px-4 flex-wrap">
          {/* Card 1 */}
          <div className="flex-1 text-center p-6 rounded-xl shadow-sm min-w-[250px] border-none">
            <div className="w-16 h-16 bg-[#DC5A59] rounded-full flex items-center justify-center mx-auto mb-4 shrink-0">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
            <p className="text-sm">
              Learn from experienced professionals with years of industry
              expertise
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex-1 text-center p-6 rounded-xl shadow-sm min-w-[250px] border-none">
            <div className="w-16 h-16 bg-[#DC5A59] rounded-full flex items-center justify-center mx-auto mb-4 shrink-0">
              <Wrench className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Hands-On Training</h3>
            <p className=" text-sm">
              Practical, real-world experience with modern equipment and tools
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex-1 text-center p-6 rounded-xl shadow-sm min-w-[250px] border-none">
            <div className="w-16 h-16 bg-[#DC5A59] rounded-full flex items-center justify-center mx-auto mb-4 shrink-0">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Job Ready Skills</h3>
            <p className=" text-sm">
              Graduate with the skills employers are looking for today
            </p>
          </div>
        </div>

        {/* ================= PROGRAMS GRID ================= */}
        <h2 className="text-3xl font-semibold text-center mb-12">
          Our Training Programs Currently on Offer
        </h2>

        {/* Section 2: Training Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainingPrograms.map((program) => {
            const Icon = program.icon;

            return (
              <div
                key={program.id}
                className="flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900 overflow-hidden hover:shadow-2xl dark:hover:shadow-gray-700 transition-shadow duration-300 h-full"
              >
                {/* Image container with overlay */}
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Icon overlay */}
                  <div className="absolute top-4 left-4 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md dark:shadow-gray-900">
                    <Icon className="w-5 h-5 text-[#DC5A59]" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {program.title}
                  </h3>

                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
                    {program.description}
                  </p>

                  {/* Info */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-gray-600 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-700 pt-4">
                    <p>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        Duration:
                      </span>{" "}
                      {program.duration}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        Level:
                      </span>{" "}
                      {program.level}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        Start Date:
                      </span>{" "}
                      {program.start_date}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        Mode:
                      </span>{" "}
                      {program.mode_of_learning}
                    </p>
                  </div>

                  {/* Button */}
                  <Link
                    href={`/ectes/company/trainings/${program.id}`}
                    className="mt-auto inline-block w-full py-3 rounded-lg bg-gradient-to-r from-[#DC5A59] to-[#F4D03F] dark:from-[#c54948] dark:to-[#e5b500] text-white font-semibold text-center shadow-md dark:shadow-gray-900 hover:shadow-xl transition-all duration-300"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        {/* ================= CTA ================= */}
        <div className="mt-16rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Ready to Start Your Training Journey?
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Contact us today to learn more about our programs, admission
            requirements, and enrollment process.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#DC5A59] text-white px-8 py-3 rounded text-lg font-semibold hover:bg-[#c54948] transition-colors"
          >
            Get Started Today
          </Link>
        </div>
        <div>
          <h1 className="flex justify-center font-bold">
            All our Trainings and courses we offer as Eastlands college of
            technology Entreprise Limited
          </h1>
          <AllEctesCourses />
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
}
