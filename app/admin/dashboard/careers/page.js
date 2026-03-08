"use client"

import React from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { useRouter } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import Links from "./components/Links";
import JobsTable from "./jobs/page";
import StatsCards from "./components/StatsCards";

const jobs = [
{
id:1,
title:"Machine Learning Engineer",
department:"AI",
location:"Remote",
status:"Published",
applicants:14
},
{
id:2,
title:"Backend Developer",
department:"Engineering",
location:"Nairobi",
status:"Draft",
applicants:0
}
]

export default function Careers() {
  const router = useRouter()
  return (
    <main>
        <div>
            <div className="flex items-center justify-end m-4 md:gap-150 sm:gap-20">
            <h1 className="m-2 font-bold"></h1>
            <Button
              onClick={() => router.push("/admin/dashboard/services/add")}
              className="justify-end"
            >
              + Add Job & Career
            </Button>
          </div>
        </div>
        <section>
          
          <div>
            <StatsCards/>
            <JobsTable jobs={jobs}/>
          </div>
        </section>
        </main>
  );
}
