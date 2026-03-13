import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  const { rows } = await pool.query(
    "SELECT * FROM students ORDER BY created_at DESC",
  );
  return NextResponse.json(rows);
}

export async function POST(req) {
  const { full_name, national_id, email, phone } = await req.json();
  const { rows } = await pool.query(
    `INSERT INTO students(full_name, national_id, email, phone)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [full_name, national_id, email, phone],
  );
  return NextResponse.json(rows[0]);
}


export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {

    await pool.query("DELETE FROM enrollments WHERE student_id=$1", [id]);

    await pool.query("DELETE FROM students WHERE id=$1", [id]);

    return Response.json({ success: true });

  } catch (error) {
    console.error(error);
    return new Response("Error deleting student", { status: 500 });
  }
}