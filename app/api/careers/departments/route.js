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

export async function DELETE(req) {
  const { id } = await req.json();

  await pool.query("DELETE FROM departments WHERE id = $1", [id]);

  return NextResponse.json({ success: true });
}

export async function PUT(req) {
  const { id, name } = await req.json();

  const result = await pool.query(
    "UPDATE departments SET name = $1 WHERE id = $2 RETURNING *",
    [name, id],
  );

  return NextResponse.json(result.rows[0]);
}