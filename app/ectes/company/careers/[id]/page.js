// app/careers/[id]/page.js
import pool from "@/lib/db";
import { Header } from "../../../components/Header";

export default async function CareerJobPage({ params }) {
  const { id } = await params;

  const result = await pool.query(
    `SELECT 
      j.*,
      d.name AS department_name
     FROM jobs j
     LEFT JOIN departments d ON j.department_id = d.id
     WHERE j.id = $1 AND j.status = 'published'`,
    [id],
  );

  if (result.rows.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <p className="text-gray-400 text-lg">
              This position is no longer available.
            </p>
            <a
              href="/careers"
              className="text-blue-500 hover:underline text-sm mt-2 inline-block"
            >
              &larr; View all openings
            </a>
          </div>
        </div>
      </div>
    );
  }

  const job = result.rows[0];

  const formattedDate = job.created_at
    ? new Date(job.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Back */}
        <a
          href="/ectes/company/careers"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors mb-10"
        >
          &larr; All openings
        </a>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left — main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Title */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-3">
                {job.title}
              </h1>
              <p className="text-gray-400 text-sm">
                {job.department_name ?? "General"}
                {job.location ? ` · ${job.location}` : ""}
                {formattedDate ? ` · Posted ${formattedDate}` : ""}
              </p>
            </div>

            {/* Description */}
            {job.description && (
              <Section title="About this role">{job.description}</Section>
            )}

            {/* Responsibilities */}
            {job.responsibilities && (
              <Section title="Responsibilities">{job.responsibilities}</Section>
            )}

            {/* Requirements */}
            {job.requirements && (
              <Section title="Requirements">{job.requirements}</Section>
            )}
          </div>

          {/* Right — sidebar */}
          <div className="space-y-6">
            {/* Apply card */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 sticky top-8">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                Interested in this role?
              </h2>
              <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                Submit your application and we&apos;ll get back to you within a
                few business days.
              </p>
              <a
                href={`/ectes/company/careers/${id}/apply`}
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
              >
                Apply for this position
              </a>
            </div>

            {/* Details card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-4">
              <h2 className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
                Details
              </h2>

              {job.job_type && <Detail label="Job type" value={job.job_type} />}
              {job.experience_level && (
                <Detail label="Experience" value={job.experience_level} />
              )}
              {job.salary_range && (
                <Detail label="Salary" value={job.salary_range} />
              )}
              {job.location && <Detail label="Location" value={job.location} />}
              {job.department_name && (
                <Detail label="Department" value={job.department_name} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        {title}
      </h2>
      <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line text-sm">
          {children}
        </p>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
        {value}
      </span>
    </div>
  );
}
