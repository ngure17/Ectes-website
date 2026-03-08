"use client"
import React from "react";

import { SiteHeader } from "@/components/site-header";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { TrainingsDashboard } from "../components/TrainingsDashboard";
import { useRouter } from "next/navigation";


export default function Trainings() {
  const router = useRouter();
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <section>
          <div className="flex items-center md:gap-150 sm:gap-20">
            <h1 className="m-2 font-bold">ECTES Trainings and Services</h1>
            <Button
              onClick={() => router.push("/admin/dashboard/trainings/add")}
              className="justify-end"
            >
              + Add Training
            </Button>
          </div>
          <div>
            {/*===Breadcrumb/ Links*/}
            <div className="m-3">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/dashboard">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/dashboard/trainings">
                      Trainings on offer
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                   <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/dashboard/trainings/all-trainings">
                      All our Trainings
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Courses</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
          <TrainingsDashboard/>
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
