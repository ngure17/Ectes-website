"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import Links from "./components/Links";

export default function CareersLayout({ children }) {
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

        <div className="flex flex-col min-h-screen">
          {/* Page Header */}
          <header className="flex items-center gap-2 border-b p-4">
            <h1 className="text-xl font-bold">Careers</h1>
          </header>

          {/* Careers Navigation */}
          <Links />

          {/* Page Content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
