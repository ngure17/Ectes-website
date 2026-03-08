import pool from "@/lib/db";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { full_name, email, phone, education_level, message, course_id } =
      await req.json();

    // Fetch course name from courses table
    const courseResult = await pool.query(
      "SELECT course_name FROM courses WHERE id = $1",
      [course_id],
    );

    const courseRows = courseResult.rows; // PostgreSQL returns { rows: [...] }

    if (courseRows.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid course ID" }), {
        status: 400,
      });
    }

    const courseName = courseRows[0].course_name;
    // Insert into applications
    await pool.query(
      "INSERT INTO course_applications (course_id, full_name, email, phone, education_level, message, status) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [course_id, full_name, email, phone, education_level, message, "Pending"],
    );

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Application Received for ${courseName}`,
      text: `Hi ${full_name},\n\nThank you for applying for the ${courseName} course. We will review your application and get back to you shortly.\n\nBest regards,\nECTES Team`,
      html: `<p>Hi ${full_name},</p><p>Thank you for applying for the <strong>${courseName}</strong> course. We will review your application and get back to you shortly.</p><p>Best regards,<br/>ECTES Team</p>`,
    });

    return new Response(
      JSON.stringify({ message: `Application submitted for ${courseName}` }),
      {
        success: true,
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      success: False,
      status: 500,
    });
  }
}

// GET /api/admin/apply
export async function GET() {
  try {
    const result = await pool.query(`
      SELECT ca.*, c.course_name
      FROM course_applications ca
      JOIN courses c ON ca.course_id = c.id
      ORDER BY ca.created_at DESC
    `);

    // result.rows contains the array of applications
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 },
    );
  }
}
