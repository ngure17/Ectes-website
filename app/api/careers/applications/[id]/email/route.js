// app/api/careers/applications/[id]/email/route.js
import pool from "@/lib/db"
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

const stageMessages = {
  reviewing: {
    subject: "Your application is under review",
    body: (name, job) => `Hi ${name},\n\nThank you for applying for the ${job} position. We wanted to let you know that your application is currently being reviewed by our team.\n\nWe'll be in touch soon.\n\nBest regards,\nThe Hiring Team`,
  },
  interview: {
    subject: "Interview invitation",
    body: (name, job) => `Hi ${name},\n\nCongratulations! We were impressed by your application for the ${job} position and would like to invite you for an interview.\n\nWe'll reach out shortly to schedule a suitable time.\n\nBest regards,\nThe Hiring Team`,
  },
  offered: {
    subject: "Job offer — congratulations!",
    body: (name, job) => `Hi ${name},\n\nWe're thrilled to let you know that we'd like to offer you the ${job} position. Our team was impressed with your application and interview.\n\nWe'll send over the formal offer letter shortly.\n\nBest regards,\nThe Hiring Team`,
  },
  rejected: {
    subject: "Your application update",
    body: (name, job) => `Hi ${name},\n\nThank you for taking the time to apply for the ${job} position. After careful consideration, we've decided to move forward with other candidates at this time.\n\nWe appreciate your interest and encourage you to apply for future openings.\n\nBest regards,\nThe Hiring Team`,
  },
}

export async function POST(req, { params }) {
  const { id } = await params

  try {
    const { stage } = await req.json()

    const result = await pool.query(
      `SELECT a.name, a.email, j.title AS job_title
       FROM applications a
       JOIN jobs j ON a.job_id = j.id
       WHERE a.id = $1`,
      [id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    const { name, email, job_title } = result.rows[0]
    const template = stageMessages[stage]

    if (!template) {
      return NextResponse.json({ error: "No email template for this stage" }, { status: 400 })
    }

    await transporter.sendMail({
      from: `"Hiring Team" <${process.env.SMTP_USER}>`,
      to: email,
      subject: template.subject,
      text: template.body(name, job_title),
    })

    return NextResponse.json({ message: "Email sent" })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
