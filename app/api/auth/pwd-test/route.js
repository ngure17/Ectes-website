import bcrypt from "bcryptjs"; // Use bcryptjs as discussed previously
import { NextResponse } from "next/server";

export async function GET() {
  const password = "ECTES@@SuperUser2026yr";
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // This will now correctly return a response to your browser
    return NextResponse.json({
      message: "Success",
      hashedPassword,
    });
  } catch (error) {
    return NextResponse.json({ error: "Hashing failed" }, { status: 500 });
  }
}
