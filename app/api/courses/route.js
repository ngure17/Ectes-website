import pool from "@/lib/db";
import { NextResponse } from "next/server";

// GET all courses
export async function GET() {
  try {
    const result = await pool.query(
      `SELECT id, course_name, brief_explanation, duration,
      level, course_start_date, mode_of_learning,
      image, image_type
      FROM courses
      ORDER BY created_at DESC`,
    );

    const courses = result.rows.map((course) => {
      if (course.image) {
        return {
          ...course,
          image: course.image.toString("base64"),
        };
      }
      return course;
    });

    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST new course on offer
export async function POST(req) {
  try {
    const formData = await req.formData();

    const course_name = formData.get("course_title");
    const brief_explanation = formData.get("brief_explanation");
    const duration = formData.get("duration");
    const intake_period = formData.get("intake_period");
    const level = formData.get("level");
    const examination_type = formData.get("examination_type");
    const course_start_date = formData.get("course_start_date");
    const course_end_date = formData.get("course_end_date");
    const mode_of_learning = formData.get("mode_of_learning");
    const image_url = formData.get("image_url");

    const imageFile = formData.get("image");
    const outlineFile = formData.get("course_outline_file");

    let imageBuffer = null;
    let imageType = null;

    let outlineBuffer = null;
    let outlineType = null;

    // Handle image upload
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      imageBuffer = Buffer.from(bytes);
      imageType = imageFile.type;
    }

    // Handle course outline pdf
    if (outlineFile && outlineFile.size > 0) {
      const bytes = await outlineFile.arrayBuffer();
      outlineBuffer = Buffer.from(bytes);
      outlineType = outlineFile.type;
    }

    const result = await pool.query(
      `
      INSERT INTO courses
      (
        course_name,
        brief_explanation,
        duration,
        intake_period,
        level,
        examination_type,
        course_start_date,
        course_end_date,
        mode_of_learning,
        image_url,
        image,
        image_type,
        course_outline_file,
        course_outline_type
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
      RETURNING *
      `,
      [
        course_name,
        brief_explanation,
        duration,
        intake_period,
        level,
        examination_type,
        course_start_date,
        course_end_date,
        mode_of_learning,
        image_url,
        imageBuffer,
        imageType,
        outlineBuffer,
        outlineType,
      ],
    );

    return NextResponse.json({
      success: true,
      course: result.rows[0],
    });
  } catch (error) {
    console.error("Course creation error:", error);

    return NextResponse.json(
      { success: false, error: "Failed to create course" },
      { status: 500 },
    );
  }
}
