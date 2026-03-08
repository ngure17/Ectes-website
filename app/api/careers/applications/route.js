import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req){

const formData = await req.formData();

const name = formData.get("name");
const email = formData.get("email");
const phone = formData.get("phone");
const cover_letter = formData.get("cover_letter");
const job_id = formData.get("job_id");
const resume = formData.get("resume");

const buffer = Buffer.from(
await resume.arrayBuffer()
);

await pool.query(
`
INSERT INTO applications
(job_id,name,email,phone,cover_letter,resume,resume_type)
VALUES ($1,$2,$3,$4,$5,$6,$7)
`,
[
job_id,
name,
email,
phone,
cover_letter,
buffer,
resume.type
]
);

await pool.query(
`
UPDATE jobs
SET applicants_count = applicants_count + 1
WHERE id=$1
`,
[job_id]
);

return NextResponse.json({success:true});

}

//Get all applications with job title
export async function GET(){

const result = await pool.query(`
SELECT
applications.id,
applications.name,
applications.email,
applications.phone,
applications.stage,
applications.created_at,
jobs.title AS job_title
FROM applications
JOIN jobs
ON applications.job_id = jobs.id
ORDER BY applications.created_at DESC
`);

return NextResponse.json(result.rows);

}