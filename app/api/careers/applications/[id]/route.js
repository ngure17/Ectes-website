// app/api/careers/applications/[id]/route.js
import pool from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH(req, { params }) {
  const { id } = await params  

  try {
    const { stage } = await req.json()

    await pool.query(
      "UPDATE applications SET stage=$1 WHERE id=$2",
      [stage, id]
    )

    return NextResponse.json({ message: "Stage updated" })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(req, { params }) {
  const { id } = await params

  try {
    const result = await pool.query(
      "SELECT resume, resume_type, name FROM applications WHERE id=$1",
      [id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const { resume, resume_type, name } = result.rows[0]

    const ext = resume_type === "application/pdf" ? "pdf"
      : resume_type === "application/msword" ? "doc" : "docx"

    return new Response(resume, {
      headers: {
        "Content-Type": resume_type,
        "Content-Disposition": `attachment; filename="${name}-resume.${ext}"`,
      },
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}