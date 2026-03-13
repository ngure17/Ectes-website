import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const phone = url.searchParams.get("phone"); // ?phone=0712345678

    let query = `
      SELECT ca.*, c.course_name
      FROM course_applications ca
      JOIN courses c ON ca.course_id = c.id
    `;
    const params = [];

    if (phone) {
      query += " WHERE ca.phone = $1";
      params.push(phone);
    }

    query += " ORDER BY ca.created_at DESC";

    const result = await pool.query(query, params);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 },
    );
  }
}
