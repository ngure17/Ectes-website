"use client"

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
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
import { ServicesDashboard } from "../components/ServicesDashboard";
import { useRouter } from "next/navigation";


export default function Page() {
  const router = useRouter()
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
            <h1 className="m-2 font-bold">ECTES SERVICES</h1>
            <Button
              onClick={() => router.push("/admin/dashboard/services/add")}
              className="justify-end"
            >
              + Add Service
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
                    <BreadcrumbLink href="/admin/dashboard/services">
                      Services
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>id</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
          <ServicesDashboard />
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
