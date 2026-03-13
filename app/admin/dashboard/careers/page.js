"use client"

import React from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { useRouter } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import Links from "./components/Links";
import StatsCards from "./components/StatsCards";
import Jobs from "./jobs/page";


export default function Careers() {
  const router = useRouter()
  return (
    <main>
        <div>
            <div className="flex items-center justify-end m-4 md:gap-150 sm:gap-20">
            <h1 className="m-2 font-bold"></h1>
            <Button
              onClick={() => router.push("/admin/dashboard/careers/jobs/add")}
              className="justify-end"
            >
              + Add Job & Career
            </Button>
          </div>
        </div>
        <section>
          
          <div>
            <StatsCards/>
            <Jobs/>
          </div>
        </section>
        </main>
  );
}
