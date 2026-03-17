import { Header } from "../../components/Header";
import Link from "next/link";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { IconFolderCode } from "@tabler/icons-react";

export default async function CareersPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/careers/jobs/publishedJobs`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    console.error("Failed to fetch jobs");
    return <p>Failed to load jobs.</p>;
  }

  const jobs = await res.json();
  console.log(jobs);

  // Group jobs by department
  const grouped = jobs.reduce((acc, job) => {
    const dept = job.department_name ?? "General";
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(job);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      {/* Hero */}
      <section className="border-b border-gray-100 dark:border-gray-800 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-4">
            We&apos;re hiring
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
            Join our team
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
            We&apos;re building something meaningful. Come work with people who
            care about doing great work.
          </p>

          {jobs.length > 0 && (
            <div className="flex items-center gap-2 mt-8">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-sm font-semibold">
                {jobs.length}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                open position{jobs.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Jobs */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {jobs.length === 0 ? (
            <div className="flex items-center justify-center py-24">
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <IconFolderCode />
                  </EmptyMedia>
                  <EmptyTitle>No open positions</EmptyTitle>
                  <EmptyDescription>
                    Keep an eye on this page for future opportunities to join
                    our team!
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(grouped).map(([department, deptJobs]) => (
                <div key={department}>
                  {/* Department heading */}
                  <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                      {department}
                    </h2>
                    <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
                  </div>

                  {/* Job rows */}
                  <div className="divide-y divide-gray-100 dark:divide-gray-800 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
                    {deptJobs.map((job) => (
                      <Link
                        key={job.id}
                        href={`/ectes/company/careers/${job.id}`}
                        className="group flex items-center justify-between gap-4 px-6 py-5 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-tl-2xl rounded-tr-2xl"
                      >
                        <div className="min-w-0">
                          <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5">
                            {job.location && (
                              <span className="text-xs text-gray-400">
                                {job.location}
                              </span>
                            )}
                            {job.location && job.job_type && (
                              <span className="text-gray-200 dark:text-gray-700">
                                &middot;
                              </span>
                            )}
                            {job.job_type && (
                              <span className="text-xs text-gray-400">
                                {job.job_type}
                              </span>
                            )}
                            {job.experience_level && (
                              <>
                                <span className="text-gray-200 dark:text-gray-700">
                                  &middot;
                                </span>
                                <span className="text-xs text-gray-400">
                                  {job.experience_level}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {job.salary_range && (
                            <span className="hidden sm:block text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-100 dark:border-gray-700">
                              {job.salary_range}
                            </span>
                          )}
                          <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 dark:group-hover:bg-blue-500 dark:group-hover:border-blue-500 transition-colors">
                            Apply
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
