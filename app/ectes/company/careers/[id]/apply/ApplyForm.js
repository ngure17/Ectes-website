// app/careers/[id]/apply/ApplyForm.js
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ApplyForm({ job }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cover_letter: "",
  })
  const [resume, setResume] = useState(null)
  const [resumeError, setResumeError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setResumeError("")

    if (!file) return

    const allowed = ["application/pdf", "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]

    if (!allowed.includes(file.type)) {
      setResumeError("Only PDF or Word documents are accepted.")
      setResume(null)
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setResumeError("File must be under 5MB.")
      setResume(null)
      return
    }

    setResume(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!resume) {
      setResumeError("Please upload your resume.")
      return
    }

    setLoading(true)

    try {
      const data = new FormData()
      data.append("job_id", job.id)
      data.append("name", formData.name)
      data.append("email", formData.email)
      data.append("phone", formData.phone)
      data.append("cover_letter", formData.cover_letter)
      data.append("resume", resume)

      const res = await fetch("/api/careers/applications", {
        method: "POST",
        body: data,
      })

      if (!res.ok) throw new Error("Failed to submit application")

      setSubmitted(true)
    } catch (err) {
      console.error(err)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Success state
  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-950 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Application submitted!
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Thanks for applying for <span className="text-gray-700 dark:text-gray-200 font-medium">{job.title}</span>.
            We&apos;ll review your application and get back to you within a few business days.
          </p>
          <a
            href="/ectes/company/careers"
            className="inline-block text-sm text-blue-600 hover:underline"
          >
            &larr; View all openings
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">

      {/* Back */}
      <a
        href={`/ectes/company/career/${job.id}`}
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors mb-10"
      >
        &larr; Back to job
      </a>

      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-2">
          {job.department_name ?? "General"}
        </p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          Apply for {job.title}
        </h1>
        <p className="text-sm text-gray-400">
          {job.location && `${job.location} · `}{job.job_type}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Personal info */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-5">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Personal information
          </h2>

          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
              Full name <span className="text-red-400">*</span>
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Jane Doe"
              className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="jane@example.com"
                className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                Phone
              </label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+254 700 000 000"
                className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Resume */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-3">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Resume <span className="text-red-400">*</span>
          </h2>
          <p className="text-xs text-gray-400">PDF or Word document, max 5MB</p>

          <label className={`flex flex-col items-center justify-center w-full border-2 border-dashed rounded-xl py-8 px-4 cursor-pointer transition-colors
            ${resume
              ? "border-green-300 bg-green-50 dark:bg-green-950 dark:border-green-800"
              : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 bg-white dark:bg-gray-800"
            }`}
          >
            {resume ? (
              <>
                <svg className="w-6 h-6 text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">{resume.name}</p>
                <p className="text-xs text-gray-400 mt-1">Click to replace</p>
              </>
            ) : (
              <>
                <svg className="w-6 h-6 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <p className="text-sm text-gray-400">Click to upload your resume</p>
              </>
            )}
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {resumeError && (
            <p className="text-xs text-red-500">{resumeError}</p>
          )}
        </div>

        {/* Cover letter */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-3">
          <div>
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Cover letter
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">Optional — tell us why you&apos;re a great fit</p>
          </div>
          <textarea
            name="cover_letter"
            value={formData.cover_letter}
            onChange={handleChange}
            rows="6"
            placeholder="I'm excited to apply for this role because..."
            className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white font-semibold py-4 rounded-xl transition-colors text-sm"
        >
          {loading ? "Submitting..." : "Submit application"}
        </button>

        <p className="text-center text-xs text-gray-400">
          By submitting, you agree that we may store and process your information for recruitment purposes.
        </p>

      </form>
    </div>
  )
}