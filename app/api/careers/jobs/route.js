import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  const {
    title,
    department_id,
    location,
    job_type,
    experience_level,
    salary_range,
    description,
    responsibilities,
    requirements,
    status,
  } = body;

  const result = await pool.query(
    `
INSERT INTO jobs
(title,department_id,location,job_type,experience_level,
salary_range,description,responsibilities,requirements,status)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
RETURNING *
`,
    [
      title,
      department_id,
      location,
      job_type,
      experience_level,
      salary_range,
      description,
      responsibilities,
      requirements,
      status,
    ],
  );

  return NextResponse.json(result.rows[0]);
}

//Get all jobs with department name and filter by search and status
export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search");
  const status = searchParams.get("status");

  let query = `
SELECT
jobs.*,
departments.name AS department
FROM jobs
LEFT JOIN departments
ON jobs.department_id = departments.id
WHERE 1=1
`;

  let values = [];

  if (search) {
    values.push(`%${search}%`);
    query += ` AND title ILIKE $${values.length}`;
  }

  if (status) {
    values.push(status);
    query += ` AND status=$${values.length}`;
  }

  query += ` ORDER BY created_at DESC`;

  const result = await pool.query(query, values);

  return NextResponse.json(result.rows);
}

export async function DELETE(req) {
  const { id } = await req.json();

  await pool.query("DELETE FROM jobs WHERE id=$1", [id]);

  return NextResponse.json({
    success: true,
  });
}
