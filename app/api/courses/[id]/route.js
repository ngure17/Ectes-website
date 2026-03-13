import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET /api/courses/:id
export async function GET(req, { params }) {
  const { id } = await params;

  try {
    const result = await pool.query(
      `SELECT id, course_name, brief_explanation, duration,
      level, course_start_date, mode_of_learning,
      image, image_type
      FROM courses
      WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    const course = result.rows[0];

    // convert bytea -> base64
    if (course.image) {
      const base64 = Buffer.from(course.image).toString("base64");

      course.image = `data:${course.image_type};base64,${base64}`;
    }

    return NextResponse.json(course);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
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
