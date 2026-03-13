import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET all enrollments
// GET all enrollments with student & course info
export async function GET() {
  try {
    const { rows } = await pool.query(`
      SELECT 
        e.id,
        s.full_name AS student_name,
        s.national_id,
        s.email,
        s.phone,
        c.course_name,
        e.status,
        e.notes,
        e.enrollment_source,
        e.enrolled_by,
        e.enrollment_date AS date
      FROM enrollments e
      JOIN students s ON e.student_id = s.id
      JOIN courses c ON e.course_id = c.id
      ORDER BY e.enrollment_date DESC
    `);

    return NextResponse.json(rows);
  } catch (err) {
    console.error("Failed to fetch enrollments:", err);
    return NextResponse.json(
      { error: "Failed to fetch enrollments" },
      { status: 500 },
    );
  }
}

// POST new enrollment
export async function POST(req) {
  try {
    const {
      student_id,
      course_id,
      status,
      notes,
      enrollment_source,
      enrolled_by,
    } = await req.json();

    const { rows } = await pool.query(
      `INSERT INTO enrollments
       (student_id, course_id, status, notes, enrollment_source, enrolled_by)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        student_id,
        course_id,
        status || "Active",
        notes || null,
        enrollment_source || "manual",
        enrolled_by || "admin",
      ],
    );

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create enrollment" },
      { status: 500 },
    );
  }
}
// PUT update enrollment status
export async function PUT(req) {
  try {
    const { id, status, notes } = await req.json();

    const { rows } = await pool.query(
      `UPDATE enrollments 
       SET status = $1, notes = $2
       WHERE id = $3
       RETURNING *`,
      [status, notes || null, id],
    );

    return NextResponse.json(rows[0]);
  } catch (err) {
    console.error("Failed to update enrollment:", err);
    return NextResponse.json(
      { error: "Failed to update enrollment" },
      { status: 500 },
    );
  }
}

// DELETE enrollment
export async function DELETE(req) {

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await pool.query(
    "DELETE FROM enrollments WHERE id=$1",
    [id]
  );

  return Response.json({ success: true });
}