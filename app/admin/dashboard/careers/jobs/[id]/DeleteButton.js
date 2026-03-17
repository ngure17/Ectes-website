// app/admin/dashboard/careers/jobs/[id]/DeleteButton.js
"use client"

import { useRouter } from "next/navigation"

export default function DeleteButton({ id }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this job?")) return

    try {
      const res = await fetch(`/api/careers/jobs/${id}`, { method: "DELETE" })

      if (!res.ok) throw new Error("Failed to delete")

      router.push("/admin/dashboard/careers")
    } catch (e) {
      console.error(e)
      alert("Failed to delete job. Please try again.")
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-sm px-4 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950 transition-colors"
    >
      Delete
    </button>
  )
}