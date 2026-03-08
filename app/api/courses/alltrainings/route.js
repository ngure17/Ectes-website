import pool from "@/lib/db";
import { NextResponse } from "next/server";

// GET all courses
export async function GET() {
  try {
    const result = await pool.query(
      `SELECT course_id, course_title, course_description,
      course_modules, image, image_type
      FROM ectes_training_courses
      ORDER BY created_at DESC`,
    );

    const courses = result.rows.map((course) => {
      if (course.image) {
        const base64 = course.image.toString("base64");

        return {
          ...course,
          image: base64,
        };
      }
      return course;
    });

    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function POST(req) {
  try {
    const formData = await req.formData();

    // Text fields
    const course_title = formData.get("course_title");
    const course_description = formData.get("course_description");
    const course_modules = formData.get("course_modules");

    // Image file
    const imageFile = formData.get("image_file");
    let imageBuffer = null;
    let imageType = null;

    if (imageFile && imageFile.arrayBuffer) {
      const bytes = await imageFile.arrayBuffer();
      imageBuffer = Buffer.from(bytes);
      imageType = imageFile.type;
    }

    // Insert into database
    const result = await pool.query(
      `
      INSERT INTO ectes_training_courses
      (course_title, course_description, course_modules, image, image_type)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
      `,
      [
        course_title,
        course_description,
        course_modules,
        imageBuffer,
        imageType,
      ],
    );

    return NextResponse.json({ success: true, course: result.rows[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 },
    );
  }
}
