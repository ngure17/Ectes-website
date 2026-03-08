import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET /api/courses/:id
export async function GET(req, { params }) {
  const { id } = await params; // get id from URL

  try {
    const result = await pool.query(
      "SELECT * FROM courses WHERE id = $1",
      [id], // parameterized query
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    // Delete training by id
    await pool.query("DELETE FROM courses WHERE id = $1", [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete training" },
      { status: 500 },
    );
  }
}
