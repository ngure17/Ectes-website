import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  // Await params because your Next.js/Turbopack version requires it
  const { id } = await params;

  try {
    const result = await pool.query(
      `SELECT course_outline_file, course_outline_type, course_name
       FROM courses
       WHERE id = $1`,
      [id]
    );

    if (result.rowCount === 0 || !result.rows[0].course_outline_file) {
      return NextResponse.json({ error: "PDF not found" }, { status: 404 });
    }

    const { course_outline_file, course_outline_type, course_name } = result.rows[0];

    // Return binary PDF
    return new NextResponse(course_outline_file, {
      status: 200,
      headers: {
        "Content-Type": course_outline_type || "application/pdf",
        "Content-Disposition": `attachment; filename="${course_name}-outline.pdf"`,
      },
    });
  } catch (err) {
    console.error("PDF download error:", err);
    return NextResponse.json({ error: "Failed to fetch PDF" }, { status: 500 });
  }
}