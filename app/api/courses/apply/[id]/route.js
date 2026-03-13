// app/api/courses/apply/[id]/route.js
import pool from "@/lib/db";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { id } = await params; // dynamic param from URL
  const { status } = await req.json();

  const validStatuses = ["Pending", "Reviewed", "Accepted", "Rejected"];

  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    // Get student + course info
    const application = await pool.query(
      `SELECT ca.email, ca.full_name, ca.phone,c.course_name
       FROM course_applications ca
       JOIN courses c ON ca.course_id = c.id
       WHERE ca.application_id = $1`,
      [id],
    );

    if (application.rows.length === 0) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 },
      );
    }

    const { email, full_name, course_name, phone } = application.rows[0];

    // Update status
    const result = await pool.query(
      "UPDATE course_applications SET status = $1 WHERE application_id = $2",
      [status, id],
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 },
      );
    }

    // Setup email transporter once
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email depending on status
    if (status === "Reviewed") {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Application Reviewed for ${course_name}`,
        html: `<p>Hi ${full_name},</p>
               <p>Thank you for applying for the <strong>${course_name}</strong> course.</p>
               <p>Your application has been reviewed. Please keep checking your email for the fee structure.</p>
               <p>Best regards,<br/>ECTES Team</p>`,
      });
    }

    if (status === "Accepted") {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Application Accepted for ${course_name}`,
        html: `<p>Hi ${full_name},</p>
           <p>Congratulations! Your application for the <strong>${course_name}</strong> course has been accepted.</p>
           <p>Best regards,<br/>ECTES Team</p>`,
      });

      // 1 Check if student exists by email
      const existingStudent = await pool.query(
        "SELECT id FROM students WHERE email = $1",
        [email],
      );

      let studentId;

      if (existingStudent.rows.length > 0) {
        studentId = existingStudent.rows[0].id;
      } else {
        // 2 Create student
        const newStudent = await pool.query(
          `INSERT INTO students (full_name, email, phone)
       VALUES ($1, $2, $3)
       RETURNING id`,
          [full_name, email, phone],
        );
        studentId = newStudent.rows[0].id;
      }

      // 3 Get course_id from course_name
      const courseResult = await pool.query(
        "SELECT id FROM courses WHERE course_name = $1",
        [course_name],
      );

      if (courseResult.rows.length === 0) {
        throw new Error("Course not found for enrollment");
      }

      const courseId = courseResult.rows[0].id;

      // 4 Enroll student automatically
      await pool.query(
        `INSERT INTO enrollments
     (student_id, course_id, status, enrollment_source, enrolled_by)
     VALUES ($1, $2, $3, $4, $5)`,
        [studentId, courseId, "Active", "application", "system"],
      );
    }

    if (status === "Rejected") {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Application Rejected for ${course_name}`,
        html: `<p>Hi ${full_name},</p>
               <p>We regret to inform you that your application for the <strong>${course_name}</strong> course has been rejected.</p>
               <p>Best regards,<br/>ECTES Team</p>`,
      });
    }

    return NextResponse.json(
      { message: "Status updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 },
    );
  }
}
