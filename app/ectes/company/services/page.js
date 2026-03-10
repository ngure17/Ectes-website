"use client";

import React, { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { BookOpen, Cpu, Zap, Toolbox, Home } from "lucide-react";
import Link from "next/link";

const borderAccent = {
  orange:
    "hover:border-orange-500 focus-within:border-orange-500 active:border-orange-500",
  blue: "hover:border-blue-500 focus-within:border-blue-500 active:border-blue-500",
  green:
    "hover:border-green-500 focus-within:border-green-500 active:border-green-500",
  purple:
    "hover:border-purple-500 focus-within:border-purple-500 active:border-purple-500",
  red: "hover:border-red-500 focus-within:border-red-500 active:border-red-500",
};

const bgAccent = {
  orange:
    "group-hover:bg-orange-500 group-focus-within:bg-orange-500 group-active:bg-orange-500",
  blue: "group-hover:bg-blue-500 group-focus-within:bg-blue-500 group-active:bg-blue-500",
  green:
    "group-hover:bg-green-500 group-focus-within:bg-green-500 group-active:bg-green-500",
  purple:
    "group-hover:bg-purple-500 group-focus-within:bg-purple-500 group-active:bg-purple-500",
  red: "group-hover:bg-red-500 group-focus-within:bg-red-500 group-active:bg-red-500",
};

const textAccent = {
  orange:
    "group-hover:text-orange-600 group-focus-within:text-orange-600 group-active:text-orange-600",
  blue: "group-hover:text-blue-600 group-focus-within:text-blue-600 group-active:text-blue-600",
  green:
    "group-hover:text-green-600 group-focus-within:text-green-600 group-active:text-green-600",
  purple:
    "group-hover:text-purple-600 group-focus-within:text-purple-600 group-active:text-purple-600",
  red: "group-hover:text-red-600 group-focus-within:text-red-600 group-active:text-red-600",
};

export default function Solutions() {
  const [services, setServices] = useState([]);

  // Fetch services from API
  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        const mapped = data.map((s, idx) => ({
          title: s.title,
          description:
            s.short_description?.trim() ||
            s.detailed_description?.trim() ||
            "No description available.",
          icon: [Toolbox, Zap, Cpu, Home, BookOpen][idx % 5], // Rotate icons
          accent: ["blue", "green", "purple", "red", "orange"][idx % 5], // Rotate accents
          href: `/ectes/company/services/${s.slug}`, // Link to dynamic slug page
        }));
        setServices(mapped);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    }
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative bg-gradient-to-r from-gray to-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <img
                  src="/customer-image.jfif"
                  alt="Professional services"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                  WE LEAD IN CUSTOMER SATISFACTION.
                </h1>
                <p className="text-gray-700 text-lg">
                  We guarantee professional work and pocket-friendly pricing.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background text-foreground py-20 px-6 sm:px-12 lg:px-24">
          {/* Section Header */}
          <div className="group max-w-7xl mx-auto text-center mb-12 rounded-2xl p-6 transition-all duration-300 hover:bg-muted/40 dark:hover:bg-muted/20">
            <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">
              Services & Trainings
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              At{" "}
              <span className="font-semibold text-amber-900 dark:text-amber-400">
                ECTES
              </span>
              , we provide industry-focused trainings and entrepreneurial
              services to help individuals and companies achieve excellence.
              <br />
              Turn your skills and ideas into tangible results with our
              programs.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <Link
                  key={idx}
                  href={service.href}
                  className={`group relative p-6 rounded-xl bg-card border border-border
                    shadow-lg transition-all duration-300
                    hover:shadow-xl hover:-translate-y-1
                    focus-within:shadow-xl focus-within:-translate-y-1
                    active:shadow-xl active:-translate-y-1
                    ${borderAccent[service.accent]}
                    flex flex-col gap-4`}
                >
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-full
                      bg-muted transition-colors duration-300
                      ${bgAccent[service.accent]}`}
                  >
                    <Icon
                      className={`w-6 h-6 text-muted-foreground transition-colors duration-300 ${textAccent[service.accent]}`}
                    />
                  </div>

                  {/* Title */}
                  <h2
                    className={`text-xl font-semibold transition-all duration-300
                      ${textAccent[service.accent]} group-hover:font-bold group-focus-within:font-bold group-active:font-bold`}
                  >
                    {service.title}
                  </h2>

                  {/* Description */}
                  <p className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80 group-focus-within:text-foreground/80 group-active:text-foreground/80">
                    {service.description
                              ? service.description
                                  .split(" ")
                                  .slice(0, 10)
                                  .join(" ") + "..."
                              : "No description available."}
                  </p>

                  {/* CTA */}
                  <span
                    className={`mt-auto inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${textAccent[service.accent]}`}
                  >
                    Learn more
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-focus-within:translate-x-1 group-active:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
