import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    const result = await pool.query(
      `SELECT 
        j.*,
        d.name AS department_name
       FROM jobs j
       LEFT JOIN departments d ON j.department_id = d.id
       WHERE j.id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;

  try {
    const result = await pool.query(
      "DELETE FROM jobs WHERE id=$1 RETURNING id",
      [id],
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = await params;

  try {
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
      `UPDATE jobs SET
        title=$1,
        department_id=$2,
        location=$3,
        job_type=$4,
        experience_level=$5,
        salary_range=$6,
        description=$7,
        responsibilities=$8,
        requirements=$9,
        status=$10,
        updated_at=NOW()
       WHERE id=$11
       RETURNING *`,
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
        id,
      ],
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
