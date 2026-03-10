import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req) {
  try {
    const data = await req.json();
    const {
      title,
      slug,
      short_description,
      detailed_description,
      icon,
      cover_image,
      cover_image_type,
      meta_title,
      meta_description,
      display_order,
      status,
      sections,
    } = data;

    // Insert service
    const serviceQuery = `
      INSERT INTO services
      (title, slug, short_description, detailed_description, icon, cover_image, cover_image_type, meta_title, meta_description, display_order, status)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING id
    `;
    const serviceResult = await pool.query(serviceQuery, [
      title,
      slug,
      short_description,
      detailed_description,
      icon,
      cover_image ? Buffer.from(cover_image, "base64") : null,
      cover_image_type || null,
      meta_title,
      meta_description,
      display_order,
      status,
    ]);

    const serviceId = serviceResult.rows[0].id;

    // Insert sections
    for (let sec of sections) {
      await pool.query(
        `
        INSERT INTO service_sections
        (service_id, heading, content, icon, section_image, section_image_type, position)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
      `,
        [
          serviceId,
          sec.heading,
          sec.content,
          sec.icon,
          sec.section_image ? Buffer.from(sec.section_image, "base64") : null,
          sec.section_image_type || null,
          sec.position,
        ],
      );
    }

    return NextResponse.json({ success: true, serviceId });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

// app/api/services/route.js
export async function GET() {
  try {
    const servicesRes = await pool.query(`
      SELECT *, encode(cover_image, 'base64') AS cover_image, cover_image_type
      FROM services
      ORDER BY created_at DESC
    `);

    return NextResponse.json(servicesRes.rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
