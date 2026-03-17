// app/admin/dashboard/careers/jobs/[id]/edit/page.js
import pool from "@/lib/db"
import EditJobClient from "./EditJobClient"

export default async function EditJobPage({ params }) {
  const { id } = await params

  const result = await pool.query(
    `SELECT j.*, d.name AS department_name
     FROM jobs j
     LEFT JOIN departments d ON j.department_id = d.id
     WHERE j.id = $1`,
    [id]
  )

  if (result.rows.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg">Job not found.</p>
          <a href="/admin/dashboard/careers" className="text-blue-500 hover:underline text-sm mt-2 inline-block">
            &larr; Back to careers
          </a>
        </div>
      </div>
    )
  }

  return <EditJobClient id={id} job={result.rows[0]} />
}