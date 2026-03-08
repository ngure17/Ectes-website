export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search");
  const status = searchParams.get("status");

  let query = `
SELECT
jobs.*,
departments.name AS department
FROM jobs
LEFT JOIN departments
ON jobs.department_id = departments.id
WHERE 1=1
`;

  let values = [];

  if (search) {
    values.push(`%${search}%`);
    query += ` AND title ILIKE $${values.length}`;
  }

  if (status) {
    values.push(status);
    query += ` AND status=$${values.length}`;
  }

  query += ` ORDER BY created_at DESC`;

  const result = await pool.query(query, values);

  return NextResponse.json(result.rows);
}

export async function DELETE(req, { params }) {
  const { id } = params;

  await pool.query("DELETE FROM jobs WHERE id=$1", [id]);

  return NextResponse.json({
    message: "Job deleted",
  });
}
