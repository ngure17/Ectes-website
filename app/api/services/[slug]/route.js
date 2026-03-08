import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req, { params }) {
  const { slug } = await params;

  try {
    // Fetch service
    const serviceRes = await pool.query(
      `SELECT id, title, slug, short_description, detailed_description, icon, 
              encode(cover_image, 'base64') AS cover_image, cover_image_type, status
       FROM services
       WHERE slug = $1`,
      [slug],
    );

    if (serviceRes.rows.length === 0) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const service = serviceRes.rows[0];

    // Fetch sections
    const sectionsRes = await pool.query(
      `SELECT id, heading, content, icon, 
              encode(section_image, 'base64') AS section_image, section_image_type, position
       FROM service_sections
       WHERE service_id = $1
       ORDER BY position ASC`,
      [service.id],
    );

    service.sections = sectionsRes.rows;

    return NextResponse.json(service);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { slug } = await params; 

  const client = await pool.connect(); 
  try {
    await client.query("BEGIN");

    // Get the service ID
    const serviceRes = await client.query(
      `SELECT id FROM services WHERE slug = $1`,
      [slug],
    );

    if (!serviceRes.rows.length) {
      await client.query("ROLLBACK");
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const serviceId = serviceRes.rows[0].id;

    // Delete all sections first
    await client.query(`DELETE FROM service_sections WHERE service_id = $1`, [
      serviceId,
    ]);

    // Delete the service itself
    await client.query(`DELETE FROM services WHERE id = $1`, [serviceId]);

    await client.query("COMMIT");
    return NextResponse.json({ success: true });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Failed to delete service:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    client.release();
  }
}
