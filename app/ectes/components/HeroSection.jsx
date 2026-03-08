"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Camera, ArrowRight, Wrench, Building2 } from "lucide-react";
import Carousel from "./Carousel";

export default function HeroSection() {
  const slides = [
    {
      src: "/heroSection/trainings.jpeg",
      alt: "Technical training session",
      title: "Technical Training Programs",
    },
    {
      src: "/heroSection/trainings2.jpeg",
      alt: "Practical training program",
      title: "Hands-on Skills Development",
    },
    {
      src: "/heroSection/welding training.jpeg",
      alt: "Welding training session",
      title: "Welding & Fabrication Training",
    },
    {
      src: "/heroSection/welding.jpeg",
      alt: "Welding workshop",
      title: "Industrial Welding Workshop",
    },
    {
      src: "/heroSection/image.jpeg",
      alt: "ECTES construction project",
      title: "Construction Projects",
    },
    {
      src: "/heroSection/Ectes product 1.jpeg",
      alt: "Steel fabrication product",
      title: "Steel Fabrication Works",
    },
    {
      src: "/heroSection/mechanics service.jpeg",
      alt: "Automotive mechanical services",
      title: "Automotive Mechanical Services",
    },
  ];

  return (
    <section className="bg-gradient-href-b from-slate-50 href-white py-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto text-center">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold light:text-black dark:text-slate-200 leading-tight mb-6"
        >
          Building Skills. Inspiring Entrepreneurs.{" "}
          <span className="text-amber-500">Driving Innovation.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg sm:text-xl light:text-black dark:text-slate-200 leading-relaxed max-w-3xl mx-auto"
        >
          At{" "}
          <span className="font-bold text-amber-600">
            Eastlands College of Technology Enterprise
          </span>
          , we equip aspiring innovators and entrepreneurs with hands-on skills
          and practical knowledge through cutting-edge{" "}
          <span className="font-medium text-red-300">TVET programs</span>. Our
          enterprise bridges education and real-world opportunities, empowering
          students and professionals href turn ideas into thriving businesses.
        </motion.p>

        {/* Gallery Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative mt-16 py-16 rounded-3xl bg-slate-900 px-6 sm:px-12"
        >
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-2 text-amber-400">
                <Camera className="h-4 w-4" />
                <span className="text-sm font-semibold tracking-wide">
                  Our Work in Action
                </span>
              </div>

              <h2 className="mb-4 text-3xl font-bold dark: text-white sm:text-4xl">
                Training & Project Gallery
              </h2>

              <p className="mx-auto max-w-2xl text-lg text-slate-400">
                A glimpse into our hands-on technical training programs and
                real-world construction and fabrication projects delivered
                across Kenya.
              </p>
            </motion.div>

            {/* Carousel */}
            <Carousel slides={slides} autoPlay={true} delay={4500} />
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="font-bold text-2xl dark: text-slate-300 mb-8 light:text-gray-400">
            See More About Us
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 l= dark:text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Wrench className="h-5 w-5" />
              Explore Our Training Programs
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/ectes/company/services"
              className="group inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Building2 className="h-5 w-5" />
              View Solutions & Services
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
