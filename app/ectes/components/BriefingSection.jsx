"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, Cpu, Zap, Toolbox, Home } from "lucide-react";
import Link from "next/link";

// Tailwind accent class maps
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

// Helper to trim description
function trimDescription(desc, wordLimit = 20) {
  if (!desc) return "No description available.";
  const words = desc.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : desc;
}

export default function EctesBrief() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();

        const mapped = data.map((s, idx) => ({
          title: s.title,
          description: trimDescription(s.short_description),
          icon: [Toolbox, Zap, Cpu, Home, BookOpen][idx % 5],
          accent: ["blue", "green", "purple", "red", "orange"][idx % 5],
          href: `/ectes/company/services/${s.slug}`,
        }));

        setServices(mapped);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    }
    fetchServices();
  }, []);

  // Predefined Trainings card
  const trainingsCard = {
    title: "Trainings",
    description:
      "We offer practical, industry-focused trainings for individuals and corporate personnel.",
    icon: BookOpen,
    accent: "orange",
    href: "/ectes/company/trainings",
  };

  return (
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
          , we provide industry-focused trainings and entrepreneurial services
          to help individuals and companies achieve excellence.
          <br />
          Turn your skills and ideas into tangible results with our programs.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Trainings Card */}
        <Link
          href={trainingsCard.href}
          className={`group relative p-6 rounded-xl bg-card border border-border
            shadow-lg transition-all duration-300
            hover:shadow-xl hover:-translate-y-1
            focus-within:shadow-xl focus-within:-translate-y-1
            active:shadow-xl active:-translate-y-1
            ${borderAccent[trainingsCard.accent]}
            flex flex-col gap-4`}
        >
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full bg-muted transition-colors duration-300 ${bgAccent[trainingsCard.accent]}`}
          >
            <trainingsCard.icon
              className={`w-6 h-6 text-muted-foreground transition-colors duration-300 ${textAccent[trainingsCard.accent]}`}
            />
          </div>
          <h2
            className={`text-xl font-semibold transition-all duration-300 ${textAccent[trainingsCard.accent]} group-hover:font-bold group-focus-within:font-bold group-active:font-bold`}
          >
            {trainingsCard.title}
          </h2>
          <p className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80 group-focus-within:text-foreground/80 group-active:text-foreground/80">
            {trainingsCard.description}
          </p>
          <span
            className={`mt-auto inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${textAccent[trainingsCard.accent]}`}
          >
            Learn more
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-focus-within:translate-x-1 group-active:translate-x-1">
              →
            </span>
          </span>
        </Link>

        {/* Dynamically fetched services */}
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
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full bg-muted transition-colors duration-300 ${bgAccent[service.accent]}`}
              >
                <Icon
                  className={`w-6 h-6 text-muted-foreground transition-colors duration-300 ${textAccent[service.accent]}`}
                />
              </div>
              <h2
                className={`text-xl font-semibold transition-all duration-300 ${textAccent[service.accent]} group-hover:font-bold group-focus-within:font-bold group-active:font-bold`}
              >
                {service.title}
              </h2>
              <p className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80 group-focus-within:text-foreground/80 group-active:text-foreground/80">
                {service.description
                              ? service.description
                                  .split(" ")
                                  .slice(0, 10)
                                  .join(" ") + "..."
                              : "No description available."}
              </p>
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
  );
}
