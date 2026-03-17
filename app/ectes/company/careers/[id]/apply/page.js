// app/careers/[id]/apply/page.js
import pool from "@/lib/db"
import { Header } from "../../../../components/Header"
import ApplyForm from "./ApplyForm"

export default async function ApplyPage({ params }) {
  const { id } = await params

  const result = await pool.query(
    `SELECT j.*, d.name AS department_name
     FROM jobs j
     LEFT JOIN departments d ON j.department_id = d.id
     WHERE j.id = $1 AND j.status = 'published'`,
    [id]
  )

  if (result.rows.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <p className="text-gray-400 text-lg">This position is no longer available.</p>
            <a href="/careers" className="text-blue-500 hover:underline text-sm mt-2 inline-block">
              &larr; View all openings
            </a>
          </div>
        </div>
      </div>
    )
  }

  const job = result.rows[0]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />
      <ApplyForm job={job} />
    </div>
  )
}