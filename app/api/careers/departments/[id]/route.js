export async function DELETE(req, { params }) {
  const { id } = params;

  await pool.query("DELETE FROM departments WHERE id=$1", [id]);

  return NextResponse.json({ message: "Department deleted" });
}
