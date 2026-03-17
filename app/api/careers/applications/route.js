import pool from "@/lib/db";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const cover_letter = formData.get("cover_letter");
    const job_id = formData.get("job_id");
    const resume = formData.get("resume");

    const buffer = Buffer.from(await resume.arrayBuffer());

    // Save application
    await pool.query(
      `
      INSERT INTO applications
      (job_id,name,email,phone,cover_letter,resume,resume_type)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      `,
      [job_id, name, email, phone, cover_letter, buffer, resume.type],
    );

    // Update applicants count
    await pool.query(
      `
      UPDATE jobs
      SET applicants_count = applicants_count + 1
      WHERE id=$1
      `,
      [job_id],
    );

    // Email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send confirmation email
    await transporter.sendMail({
      from: `"Careers Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Application Received",
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for applying for a position with us.</p>
        <p>We have successfully received your application and our team will review it.</p>

        <p>If your qualifications match our requirements, we will contact you for the next steps.</p>

        <br/>

        <p>Best regards,<br/>
        Recruitment Team</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 },
    );
  }
}

//Get all applications with job title
export async function GET() {
  const result = await pool.query(`
SELECT
applications.id,
applications.name,
applications.email,
applications.phone,
applications.stage,
applications.created_at,
jobs.title AS job_title
FROM applications
JOIN jobs
ON applications.job_id = jobs.id
ORDER BY applications.created_at DESC
`);

  return NextResponse.json(result.rows);
}
