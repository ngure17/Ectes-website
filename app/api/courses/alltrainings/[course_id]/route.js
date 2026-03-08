import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET /api/courses/:id
export async function GET(req, { params }) {
  const { course_id } = await params; 

  try {
    const result = await pool.query(
      "SELECT * FROM ectes_training_courses WHERE course_id = $1",
      [course_id], // parameterized query
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Training not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { course_id } = await params;

  try {
    await pool.query(
      "DELETE FROM ectes_training_courses WHERE course_id = $1",
      [course_id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete training course" },
      { status: 500 }
    );
  }
}