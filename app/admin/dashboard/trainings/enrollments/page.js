import React from "react";
import { SiteHeader } from "@/components/site-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import EnrollmentsTable from "../../components/EnrollmentsTable";
import EnrollStudentDialog from "../../components/EnrollStudentDialog";

const EnrollmentsPage = () => {
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
        <div>
          <div className="mt-4 mb-5 m-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/dashboard" className="hover:text-amber-700">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/dashboard/trainings/applications" className="hover:text-amber-700">
                    View All Applications
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/dashboard/trainings/enrollments" className="hover:text-amber-700">
                    All Enrollments
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>:</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex flex-1 justify-between m-3">
            <div>
              <h1 className="text-2xl font-bold mb-4 m-3">
                Enrollments Dashboard
              </h1>
              <p className="text-muted-foreground m-3">
                This is where you can view and manage enrollments.
              </p>
            </div>
            <div className="flex flex-row items-center justify-end">
              <EnrollStudentDialog />
            </div>
          </div>
          <EnrollmentsTable />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default EnrollmentsPage;
