import pool from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
  const { id } = await params;

  const result =  pool.query("SELECT * FROM jobs WHERE id=$1", [id]);

  return NextResponse.json(result);
}

export async function DELETE(req, { params }) {
  const { id } = params;

  await pool.query("DELETE FROM jobs WHERE id=$1", [id]);

  return NextResponse.json({
    message: "Job deleted",
  });
}
