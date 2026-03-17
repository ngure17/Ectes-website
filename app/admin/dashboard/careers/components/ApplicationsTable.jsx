"use client"

import { useState } from "react"
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const STAGES = ["applied", "reviewing", "interview", "offered", "rejected"]

const stageStyles = {
  applied:   "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  reviewing: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  interview: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  offered:   "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  rejected:  "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
}

export default function ApplicationsTable({ applications: initial }) {
  const [applications, setApplications] = useState(initial)
  const [reviewing, setReviewing] = useState(null)  // the app being reviewed
  const [selectedStage, setSelectedStage] = useState("")
  const [sending, setSending] = useState(false)
  const [downloading, setDownloading] = useState(null)

  const handleDownload = async (app) => {
    setDownloading(app.id)
    try {
      const res = await fetch(`/api/careers/applications/${app.id}`)
      if (!res.ok) throw new Error("Failed to download")

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${app.name}-resume`
      a.click()
      URL.revokeObjectURL(url)
    } catch (e) {
      console.error(e)
      alert("Failed to download resume")
    } finally {
      setDownloading(null)
    }
  }

  const openReview = (app) => {
    setReviewing(app)
    setSelectedStage(app.stage)
  }

  const closeReview = () => {
    setReviewing(null)
    setSelectedStage("")
  }

  const handleUpdateStage = async (notify) => {
    if (!reviewing) return
    setSending(true)

    try {
      // Update stage
      const res = await fetch(`/api/careers/applications/${reviewing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: selectedStage }),
      })
      if (!res.ok) throw new Error("Failed to update stage")

      // Optionally send email
      if (notify) {
        const emailRes = await fetch(`/api/careers/applications/${reviewing.id}/email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stage: selectedStage }),
        })
        if (!emailRes.ok) throw new Error("Stage updated but email failed")
      }

      // Update local state
      setApplications((prev) =>
        prev.map((a) => a.id === reviewing.id ? { ...a, stage: selectedStage } : a)
      )

      alert(notify ? "Stage updated and email sent!" : "Stage updated!")
      closeReview()
    } catch (e) {
      console.error(e)
      alert(e.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <div className="border rounded-xl p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Job</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.name}</TableCell>
                <TableCell>{app.job_title}</TableCell>
                <TableCell>{app.email}</TableCell>

                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium capitalize ${stageStyles[app.stage] ?? stageStyles.applied}`}>
                    {app.stage}
                  </span>
                </TableCell>

                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={downloading === app.id}
                    onClick={() => handleDownload(app)}
                  >
                    {downloading === app.id ? "Downloading..." : "Download"}
                  </Button>
                </TableCell>

                <TableCell>
                  <Button size="sm" onClick={() => openReview(app)}>
                    Review
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Review modal */}
      {reviewing && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          onClick={closeReview}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Review Application
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                {reviewing.name} &middot; {reviewing.job_title}
              </p>
            </div>

            {/* Applicant info */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Email</span>
                <span className="text-gray-700 dark:text-gray-200">{reviewing.email}</span>
              </div>
              {reviewing.phone && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Phone</span>
                  <span className="text-gray-700 dark:text-gray-200">{reviewing.phone}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Current stage</span>
                <span className={`px-2 py-0.5 text-xs rounded-full font-medium capitalize ${stageStyles[reviewing.stage]}`}>
                  {reviewing.stage}
                </span>
              </div>
            </div>

            {/* Cover letter */}
            {reviewing.cover_letter && (
              <div className="mb-6">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">Cover letter</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line max-h-32 overflow-y-auto">
                  {reviewing.cover_letter}
                </p>
              </div>
            )}

            {/* Stage selector */}
            <div className="mb-6">
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                Update stage
              </label>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {STAGES.map((s) => (
                  <option key={s} value={s} className="capitalize">{s}</option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  disabled={sending}
                  onClick={() => handleUpdateStage(false)}
                >
                  Update only
                </Button>
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={sending}
                  onClick={() => handleUpdateStage(true)}
                >
                  {sending ? "Sending..." : "Update & notify"}
                </Button>
              </div>
              <button
                onClick={closeReview}
                className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-center py-1 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}