"use client";

import { motion } from "framer-motion";
import {
  Wrench,
  Building2,
  Sun,
  Droplets,
  Shield,
  Award,
  Users,
  Target,
  Eye,
  ChevronRight,
} from "lucide-react";
import { Header } from "../../components/Header";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 bg-[url('/ectes%20bg.jpg')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />

          <div className="relative z-10 flex h-full items-center justify-center px-6">
            <motion.div
              className="max-w-4xl text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-2 text-amber-400"
              >
                <Award className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Strathmore Education Trust
                </span>
              </motion.div>

              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                About <span className="text-amber-400">ECTES</span>
              </h1>

              <p className="mx-auto max-w-2xl text-lg text-slate-300 sm:text-xl">
                The enterprise arm and official business services agent of
                Eastlands College of Technology, delivering excellence in
                technical training and construction services across Kenya.
              </p>
            </motion.div>
          </div>

          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </section>

        {/* About Overview */}
        <section className="px-6 py dark:bg-gray-400 ">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid gap-12 lg:grid-cols-2 lg:gap-16  from-slate-500 to-gray-500"
            >
              <motion.div
                variants={fadeInUp}
                className="flex flex-col justify-center "
              >
                <span className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber-600">
                  Who We Are
                </span>
                <h2 className="mb-6 text-3xl font-bold text-slate-900 sm:text-4xl">
                  Enterprise Excellence Through Technical Innovation
                </h2>
                <p className="mb-6 text-lg leading-relaxed text-slate-600">
                  ECTES is the enterprise arm and official business services
                  agent of Eastlands College of Technology (ECT), an institution
                  under the Strathmore Education Trust. We provide technical
                  training, production and construction services to industries
                  and organizations across Kenya.
                </p>
                <p className="text-lg leading-relaxed text-slate-600">
                  Our commitment to quality, safety, and professional standards
                  has made us a trusted partner for companies, industries,
                  institutions, and individuals seeking reliable technical
                  solutions.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-gray-500 p-8 lg:p-12"
              >
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-500/10" />
                <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-slate-900/5" />

                <div className="relative space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white">
                      <Shield className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        NCA Certified
                      </h3>
                      <p className="text-slate-600">
                        National Construction Authority certified operations
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-white">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Strathmore Trust
                      </h3>
                      <p className="text-slate-600">
                        Backed by Strathmore Education Trust excellence
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Industry Partnerships
                      </h3>
                      <p className="text-slate-600">
                        Strong collaborations with leading organizations
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-slate-900 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid gap-8 md:grid-cols-2"
            >
              <motion.div
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 p-8 lg:p-10"
              >
                <div className="absolute right-4 top-4 opacity-20">
                  <Target className="h-32 w-32 text-white" />
                </div>

                <div className="relative z-10">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 text-white">
                    <Target className="h-7 w-7" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-white">
                    Our Mission
                  </h3>
                  <p className="text-lg leading-relaxed text-white/90">
                    To deliver high-quality training, production and
                    construction services through practical skills development,
                    innovation and strong industry partnerships—driven by the
                    standards and values of Eastlands College of Technology
                    under the Strathmore Education Trust.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700 p-8 lg:p-10"
              >
                <div className="absolute right-4 top-4 opacity-10">
                  <Eye className="h-32 w-32 text-white" />
                </div>

                <div className="relative z-10">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                    <Eye className="h-7 w-7" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-white">
                    Our Vision
                  </h3>
                  <p className="text-lg leading-relaxed text-slate-300">
                    To be a leading provider of industry-focused technical
                    training and professional services that empower individuals,
                    strengthen industries, and contribute to Kenya's sustainable
                    development.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* What We Do */}
        <section className="px-6 py-20 dark:bg-gray-400">
          <div className="mx-auto max-w-6xl ">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-12 text-center"
            >
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-amber-600">
                Our Services
              </span>
              <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
                What We Do
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-600">
                We support companies, industries, institutions and individuals
                through comprehensive technical training and professional
                construction services.
              </p>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-2 dark:bg-gray-400">
              {/* Technical Training */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl border border-slate-200 bg-white dark:bg-gray-400 p-8 shadow-lg shadow-slate-100 transition-all hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <Wrench className="h-8 w-8" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-slate-900">
                  Technical Training Programs
                </h3>
                <p className="mb-6 text-slate-600">
                  Comprehensive training programs for technicians and staff,
                  designed to build practical skills and industry-ready
                  expertise.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-lg bg-slate-50 dark:bg-gray-400 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-white">
                      <Sun className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Solar PV Installation
                      </h4>
                      <p className="text-sm text-slate-500">
                        Photovoltaic system design and installation
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg bg-slate-50 dark:bg-gray-400 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-white">
                      <Droplets className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Solar Heating Systems
                      </h4>
                      <p className="text-sm text-slate-500">
                        Solar water heating solutions
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg bg-slate-50  dark:bg-gray-400 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700 text-white">
                      <Wrench className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Technical Skills Development
                      </h4>
                      <p className="text-sm text-slate-500">
                        Industry-focused practical training
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Production & Construction */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl border border-slate-200 bg-white dark:bg-gray-400 p-8 shadow-lg shadow-slate-100 transition-all hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-slate-800 text-white">
                  <Building2 className="h-8 w-8" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-slate-900">
                  Production & Construction Services
                </h3>
                <p className="mb-6 text-slate-600">
                  Full-service construction and fabrication solutions for
                  residential, commercial, and industrial projects.
                </p>

                <div className="space-y-3">
                  {[
                    "Private developments & Residential projects",
                    "Sewerage & Drainage Installation",
                    "Tank stand fabrication",
                    "Steel works & Metal fabrication",
                    "Plumbing & Electrical installations",
                    "General construction services",
                  ].map((service, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <ChevronRight className="h-5 w-5 text-amber-500" />
                      <span className="text-slate-700">{service}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Key Clients */}
        <section className="bg-slate-50 dark:bg-gray-400 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-12 text-center"
            >
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-amber-600">
                Trusted Partners
              </span>
              <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
                Our Key Clients
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-600">
                Proud to serve leading organizations across Kenya with
                dedication and excellence.
              </p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {/* Training Clients */}
              <motion.div
                variants={fadeInUp}
                className="sm:col-span-2 lg:col-span-3"
              >
                <h3 className="mb-4 text-lg font-semibold text-slate-700">
                  Training Clients
                </h3>
              </motion.div>

              {[
                { name: "Kisima Farm", type: "Agricultural Training" },
                { name: "Mugie Conservancy", type: "Conservation & Wildlife" },
                { name: "East Africa Spectre", type: "Industrial Training" },
                { name: "Davis & Shirtliff", type: "Water & Energy Solutions" },
              ].map((client, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="rounded-xl border border-slate-200 bg-white dark:bg-gray-400 p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100  text-amber-600">
                    <Users className="h-6 w-6" />
                  </div>
                  <h4 className="mb-1 font-semibold text-slate-900">
                    {client.name}
                  </h4>
                  <p className="text-sm text-slate-500">{client.type}</p>
                </motion.div>
              ))}

              {/* Construction Clients */}
              <motion.div
                variants={fadeInUp}
                className="sm:col-span-2 lg:col-span-3 mt-6"
              >
                <h3 className="mb-4 text-lg font-semibold text-slate-700">
                  Construction Clients
                </h3>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="rounded-xl border border-slate-200 bg-white dark:bg-gray-400 p-6 shadow-sm transition-all hover:shadow-md sm:col-span-2"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-800 text-white">
                  <Building2 className="h-6 w-6" />
                </div>
                <h4 className="mb-1 font-semibold text-slate-900">
                  Wanawake kwa Wanawake
                </h4>
                <p className="text-sm text-slate-500">
                  Community Development Projects
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Certifications */}
        <section className="px-6 py-20 dark:bg-gray-400">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-12 text-center"
            >
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-amber-600">
                Quality Assurance
              </span>
              <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
                Certifications & Compliance
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-600">
                ECTES operates under strict regulatory standards to ensure
                quality and safety.
              </p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {[
                {
                  icon: Award,
                  title: "Strathmore Education Trust",
                  desc: "Eastlands College of Technology",
                },
                {
                  icon: Shield,
                  title: "NCA Certification",
                  desc: "National Construction Authority",
                },
                {
                  icon: Building2,
                  title: "County Approvals",
                  desc: "Nairobi City County",
                },
                {
                  icon: Award,
                  title: "Safety Standards",
                  desc: "National Technical Compliance",
                },
              ].map((cert, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-center"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-500 text-white">
                    <cert.icon className="h-7 w-7" />
                  </div>
                  <h4 className="mb-2 font-semibold text-white">
                    {cert.title}
                  </h4>
                  <p className="text-sm text-slate-400">{cert.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-amber-500 to-amber-600 px-6 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Ready to Partner with ECTES?
              </h2>
              <p className="mb-8 text-lg text-white/90">
                Let's discuss how we can support your training or construction
                needs.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-amber-600 shadow-lg transition-all hover:bg-slate-100 hover:shadow-xl"
                >
                  Contact Us Today
                  <ChevronRight className="ml-2 h-5 w-5" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 font-semibold text-white transition-all hover:bg-white/10"
                >
                  View All Services
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 px-6 py-12">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold text-white">ECTES</h3>
                <p className="text-slate-400">
                  Eastlands College of Technology Enterprise Services
                </p>
              </div>
              <p className="text-sm text-slate-500">
                © {new Date().getFullYear()} ECTES. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
