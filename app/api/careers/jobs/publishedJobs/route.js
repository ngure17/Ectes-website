import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT 
        j.*,
        d.name AS department_name
       FROM jobs j
       LEFT JOIN departments d ON j.department_id = d.id
       WHERE j.status = 'published'
       ORDER BY j.created_at DESC`,
    );
    return NextResponse.json(result.rows);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
