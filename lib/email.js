// lib/email.js
import nodemailer from "nodemailer";

export async function sendEmail(to, subject, html) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Eastlands College" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}
