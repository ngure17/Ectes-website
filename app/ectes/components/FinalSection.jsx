"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, Mail, MapPin, Award, Shield, Building2 } from "lucide-react";

// Client Data
const trainingClients = [
  { name: "Isuzu East Africa", logo: "/isuzu-logo.png" },
  { name: "Del Monte Kenya", logo: "/delmonte.png" },
  { name: "Kisima Farm", logo: "/kisima-farm.png" },
  { name: "East Africa Spectre", logo: "/spectre-remove.png" },
  {
    name: "Eastern Produce Kenya",
    logo: "/eastern_produce_kenya_ltd.png",
  },
  { name: "Oldonyo Farm", logo: "/oldonyo-farm.png" },
  { name: "Mugie Conservancy", logo: "/mugie.png" },
  { name: "Davis & Shirtliff", logo: "/davis&sharif.png" },
];

const constructionClients = [
  { name: "Wanawake kwa Wanawake", logo: "/wanawake_kwa_wanawake.png" },
  { name: "Ndingi Mwananzeki Foundation", logo: "/ndingi.png" },
  { name: "St. Lasalle School", logo: "/st.lasalle.png" },
];

// Client Marquee
const ClientMarquee = ({ clients, reverse = false }) => (
  <div className="overflow-hidden relative">
    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-amber-200 to-transparent z-10 pointer-events-none" />
    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
    <div
      className={`flex gap-6 py-4 whitespace-nowrap ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
    >
      {[...clients, ...clients, ...clients].map((client, idx) => (
        <div
          key={idx}
          className="group flex flex-col items-center justify-center min-w-[180px] sm:min-w-[200px] bg-white rounded-xl p-4 shadow-md border border-slate-100 hover:border-amber-200 hover:shadow-xl transition-all duration-300"
        >
          <div className="w-16 h-16 relative flex items-center justify-center">
            <img
              src={client.logo}
              alt={client.name}
              className="w-full h-full object-contain group-hover:grayscale-0 transition-all duration-300"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
          <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 text-center mt-2 transition-colors">
            {client.name}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// Final Section Component
export default function FinalSection() {
  return (
    <main className="space-y-20 px-6 sm:px-12 lg:px-24 py-2 mt-0">
      {/* CTA Section */}
      <motion.section
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="rounded-2xl p-8 sm:p-12 flex flex-col items-center text-center space-y-6 shadow-xl border hover:border-slate-50"
>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold light: text-black dark:text-slate-200 ">
          Ready for Our Services?
        </h1>
        <p className="text-lg sm:text-xl text-black dark:text-slate-300 max-w-2xl">
          Reach us through our 24/7 support team for training programs,
          construction services, or any inquiries.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-black dark:text-white rounded-xl font-semibold hover:bg-amber-600 transition-all shadow-lg hover:shadow-xl"
          >
            <Phone className="h-5 w-5" />
            Contact Us
          </Link>
          <a
            href="#location"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800 text-black dark:text-white rounded-xl font-semibold hover:bg-slate-900 transition-all shadow-lg hover:shadow-xl"
          >
            <MapPin className="h-5 w-5" />
            Find Our Location
          </a>
        </div>
      </motion.section>

      {/* Clients Section */}
      <section className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-amber-600">
            Trusted Partners
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-slate-300">
            Our Key Clients
          </h1>
          <p className="mt-4 text-lg text-black dark:text-slate-300 max-w-2xl mx-auto">
            Proud to serve leading organizations across Kenya with dedication
            and excellence.
          </p>
        </motion.div>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-slate-300 text-center sm:text-left">
              Training Clients
            </h2>
            <ClientMarquee clients={trainingClients} />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-slate-300 text-center sm:text-left">
              Construction Clients
            </h2>
            <ClientMarquee clients={constructionClients} reverse />
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl p-8 sm:p-12 shadow-2xl"
      >
        <div className="text-center mb-8">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-2 text-amber-400">
            <Award className="h-4 w-4" />
            <span className="text-sm font-semibold">Quality Assurance</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mt-4">
            Certifications & Compliance
          </h1>
          <p className="mt-4 text-lg text-black dark:text-slate-400">
            ECTES operates under strict regulatory standards
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            {[
              {
                icon: Building2,
                text: "Eastlands College of Technology (Strathmore Education Trust)",
              },
              {
                icon: Shield,
                text: "National Construction Authority (NCA) certification",
              },
              { icon: Building2, text: "Nairobi City County approvals" },
              {
                icon: Award,
                text: "Compliance with national technical and safety standards",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="text-black dark:text-slate-300 text-sm sm:text-base">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full" />
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl p-6 dark:shadow-xl flex items-center justify-center">
                <img
                  src="/certification-image.png"
                  alt="ECTES Certification"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect fill='%23f59e0b' width='200' height='200' rx='20'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' font-weight='bold' fill='white' text-anchor='middle' dy='.3em'%3ENCA%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

    </main>
  );
}
