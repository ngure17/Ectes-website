"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Header } from "@/app/ectes/components/Header";
import { Footer } from "@/app/ectes/components/Footer";
export default function ServiceDetailPage() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchService() {
      try {
        const res = await fetch(`/api/services/${slug}`);
        const data = await res.json();
        if (!data.error) {
          setService(data);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error("Failed to fetch service:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">Loading service details...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-500">Service not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header/>

      {/* Hero Section */}
      <section className="relative w-full h-96 bg-gray-200 dark:bg-gray-800">
        {service.cover_image ? (
          <Image
            src={`data:${service.cover_image_type};base64,${service.cover_image}`}
            alt={service.title}
            fill
            className="object-cover rounded-b-xl"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
            No Image Available
          </div>
        )}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
            {service.title}
          </h1>
        </div>
      </section>

      {/* Description */}
      <section className="max-w-4xl mx-auto py-16 px-6 sm:px-12 lg:px-0">
        <h2 className="text-2xl font-semibold mb-4">About this Service</h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          {service.short_description ||
            service.detailed_description ||
            "No description available."}
        </p>
      </section>

      {/* Sections */}
      {service.sections && service.sections.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-0">
            <h2 className="text-3xl font-extrabold mb-12 text-center">
              Key Features & Details
            </h2>
            <div className="space-y-10">
              {service.sections.map((sec, idx) => (
                <div
                  key={sec.id}
                  className={`flex flex-col md:flex-row items-center gap-8 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg transition hover:shadow-xl`}
                >
                  {/* Section Image */}
                  {sec.section_image ? (
                    <div className="flex-shrink-0 w-full md:w-1/3 h-48 relative rounded-lg overflow-hidden">
                      <Image
                        src={`data:${sec.section_image_type};base64,${sec.section_image}`}
                        alt={sec.heading}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : null}

                  {/* Section Content */}
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">
                      {sec.heading}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {sec.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="text-center py-16 px-6 sm:px-12 lg:px-0 bg-gradient-to-r from-blue-100 to-indigo-400 rounded-t-xl mx-6 sm:mx-12 lg:mx-0 my-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Want to Work With Us?
        </h2>
        <p className="text-white text-lg mb-6">
          Contact us today and let ECTES help bring your projects to life with
          expertise and precision.
        </p>
        <a
          href="/ectes/company/contact"
          className="inline-block px-8 py-4 rounded-lg bg-white text-blue-600 font-semibold shadow-lg hover:shadow-xl transition"
        >
          Get in Touch
        </a>
      </section>
      <Footer />
    </div>
  );
}
