// app/api/courses/apply/[id]/route.js
import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { id } = await params; // dynamic param from URL
  const { status } = await req.json();

  const validStatuses = ["Pending", "Reviewed", "Accepted", "Rejected"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    // Use execute() for UPDATE to get OkPacket with affectedRows
    const result = pool.query(
      "UPDATE course_applications SET status = $1 WHERE application_id = $2",
      [status, id],
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Status updated" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 },
    );
  }
}
