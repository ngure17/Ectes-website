export async function PATCH(req, { params }) {
  const { id } = params;

  const { stage } = await req.json();

  await pool.query(
    `
UPDATE applications
SET stage=$1
WHERE id=$2
`,
    [stage, id],
  );

  return NextResponse.json({
    message: "Stage updated",
  });
}
