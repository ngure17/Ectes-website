import React from 'react'
import DeleteButton from "./DeleteButton"

const ViewJob = async ({ params }) => {
  try {
    const { id } = await params

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/careers/jobs/${id}`,
      { cache: "no-store" }
    )

    if (!res.ok) throw new Error("Failed to fetch job")
    const job = await res.json()

    const statusStyles = {
      published: "bg-green-100 text-green-800 border border-green-200",
      draft: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      closed: "bg-red-100 text-red-800 border border-red-200",
    }

    const formattedDate = job.created_at
      ? new Date(job.created_at).toLocaleDateString("en-US", {
          year: "numeric", month: "long", day: "numeric"
        })
      : null

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <a
              href="/admin/dashboard/careers"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              &larr; Back to Jobs
            </a>
            <div className="flex gap-3">
              <a
                href={`/admin/dashboard/careers/jobs/${id}/edit`}
                className="text-sm px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Edit
              </a>
              <DeleteButton id={id} />
            </div>
          </div>

          {/* Header card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 mb-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {job.title}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {job.department_name ?? "No department"} &middot; {job.location ?? "No location"}
                </p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full capitalize ${statusStyles[job.status] ?? "bg-gray-100 text-gray-700"}`}>
                {job.status}
              </span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-6">
              {job.job_type && (
                <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full dark:bg-blue-950 dark:text-blue-300 dark:border-blue-900">
                  {job.job_type}
                </span>
              )}
              {job.experience_level && (
                <span className="text-xs bg-purple-50 text-purple-700 border border-purple-100 px-3 py-1 rounded-full dark:bg-purple-950 dark:text-purple-300 dark:border-purple-900">
                  {job.experience_level}
                </span>
              )}
              {job.salary_range && (
                <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-900">
                  {job.salary_range}
                </span>
              )}
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
              <div>
                <p className="text-xs text-gray-400 mb-1">Applicants</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {job.applicants_count ?? 0}
                </p>
              </div>
              {formattedDate && (
                <div>
                  <p className="text-xs text-gray-400 mb-1">Posted</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{formattedDate}</p>
                </div>
              )}
            </div>
          </div>

          {/* Content sections */}
          <div className="space-y-6">
            {job.description && (
              <Section title="About this role">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </Section>
            )}
            {job.responsibilities && (
              <Section title="Responsibilities">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                  {job.responsibilities}
                </p>
              </Section>
            )}
            {job.requirements && (
              <Section title="Requirements">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                  {job.requirements}
                </p>
              </Section>
            )}
          </div>

        </div>
      </div>
    )
  } catch (e) {
    console.error(e)
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg">Could not load job posting.</p>
          <a href="/admin/dashboard/careers" className="text-blue-500 hover:underline text-sm mt-2 inline-block">
            &larr; Back to careers
          </a>
        </div>
      </div>
    )
  }
}

function Section({ title, children }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
      {children}
    </div>
  )
}

export default ViewJob