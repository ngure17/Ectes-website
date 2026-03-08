import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { name } = await req.json();

  const result = await pool.query(
    "INSERT INTO departments(name) VALUES($1) RETURNING *",
    [name],
  );

  return NextResponse.json(result.rows[0]);
}


export async function GET() {

const result = await pool.query(
"SELECT * FROM departments ORDER BY name ASC"
);

return NextResponse.json(result.rows);

}