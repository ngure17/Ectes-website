// app/responder/components/app-sidebar.jsx
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";

import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  Globe,
  Blocks,
  ChevronRight,
  LandPlot,
  Award,
} from "lucide-react";
import { CardSim } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { NavUser } from "./nav-user";

export function AppSidebar() {
  const { state } = useSidebar();

  const [overviewOpen, setOverviewOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [globalOpen, setGlobalOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [jobsOpen, setJobsOpen] = useState(false);
  const [applicationsOpen, setApplicationsOpen] = useState(false);
  const [invoiceOpen, setInvoiceOpen] = useState(false);

  return (
    <Sidebar className="border-r">
      {/* ===== Header ===== */}
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-209 h-20 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
            <Image
              src={"/Ectes_Logo-removebg-preview.png"}
              alt={"R"}
              width={100}
              height={100}
            />
          </div>

          {state === "expanded" && (
            <div>
              <h1 className="font-bold">Admin</h1>
              <p className="text-xs text-muted-foreground">Operations</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* ===== Scrollable Content ===== */}
      <SidebarContent className="px-2 overflow-y-auto">
        {/* ===== PLATFORM SECTION ===== */}
        <SidebarMenu>
          <p className="px-3 text-xs font-semibold text-muted-foreground uppercase">
            Platform
          </p>

          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setOverviewOpen(!overviewOpen)}>
              <Blocks className="w-5 h-5" />
              <span>Overview</span>
              <ChevronRight
                className={`ml-auto transition-transform ${overviewOpen ? "rotate-90" : ""}`}
              />
            </SidebarMenuButton>

            {overviewOpen && (
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin/dashboard">
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setEditorOpen(!editorOpen)}>
              <BookOpen className="w-5 h-5" />
              <span>Page Editor</span>
              <ChevronRight
                className={`ml-auto transition-transform ${editorOpen ? "rotate-90" : ""}`}
              />
            </SidebarMenuButton>

            {editorOpen && (
              <SidebarMenuSub>
                {["Page 1", "Page 2", "Page 3"].map((page, i) => (
                  <SidebarMenuSubItem key={page}>
                    <SidebarMenuSubButton asChild>
                      <Link href={`/admin/page-${i + 1}`}>
                        <LayoutDashboard className="w-4 h-4" />
                        <span>{page}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setGlobalOpen(!globalOpen)}>
              <Globe className="w-5 h-5" />
              <span>Global Layouts</span>
              <ChevronRight
                className={`ml-auto transition-transform ${globalOpen ? "rotate-90" : ""}`}
              />
            </SidebarMenuButton>

            {globalOpen && (
              <SidebarMenuSub>
                {["Navigation", "Layout", "Global Pages"].map((item) => (
                  <SidebarMenuSubItem key={item}>
                    <SidebarMenuSubButton asChild>
                      <Link href="#">
                        <LayoutDashboard className="w-4 h-4" />
                        <span>{item}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>
        </SidebarMenu>

        {/* ===== OPERATIONS SECTION ===== */}
        <SidebarMenu className="mt-10">
          <p className="px-3 text-xs font-semibold text-muted-foreground uppercase">
            Operations Management
          </p>

          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setServicesOpen(!servicesOpen)}>
              <CardSim className="w-5 h-5" />
              <span>Services</span>
              <ChevronRight
                className={`ml-auto transition-transform ${servicesOpen ? "rotate-90" : ""}`}
              />
            </SidebarMenuButton>

            {servicesOpen && (
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin/dashboard/services">
                      <CardSim className="w-4 h-4" />
                      <span>Services</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setCoursesOpen(!coursesOpen)}>
              <LandPlot className="w-5 h-5" />
              <span>Courses</span>
              <ChevronRight
                className={`ml-auto transition-transform ${coursesOpen ? "rotate-90" : ""}`}
              />
            </SidebarMenuButton>

            {coursesOpen && (
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin/dashboard/trainings">
                      <LandPlot className="w-4 h-4" />
                      <span>Courses</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin/dashboard/trainings/applications">
                      <LandPlot className="w-4 h-4" />
                      <span>Application Section</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setJobsOpen(!jobsOpen)}>
              <Blocks className="w-5 h-5" />
              <span>Jobs & Careers</span>
              <ChevronRight
                className={`ml-auto transition-transform ${jobsOpen ? "rotate-90" : ""}`}
              />
            </SidebarMenuButton>

            {jobsOpen && (
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin/dashboard/careers">
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Jobs and Careers</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>
        </SidebarMenu>

        {/* ===== APPLICATION MANAGEMENT ===== */}
        <SidebarMenu className="mt-10">
          <p className="px-3 text-xs font-semibold text-muted-foreground uppercase">
            Application Management
          </p>

          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setApplicationsOpen(!applicationsOpen)}
            >
              <Award className="w-5 h-5" />
              <span>Applications</span>
              <ChevronRight
                className={`ml-auto transition-transform ${applicationsOpen ? "rotate-90" : ""}`}
              />
            </SidebarMenuButton>

            {applicationsOpen && (
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin/dashboard">
                      <LandPlot />
                      <span>Courses Applied</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="/admin/dashboard">
                      <Blocks />
                      <span>Jobs Applied</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarMenu className="mt-10">
          <p className="px-3 text-xs font-semibold text-muted-foreground uppercase">
            Invoice
          </p>

          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setInvoiceOpen(!invoiceOpen)}>
              <Award className="w-5 h-5" />
              <span>Invoice</span>
              <ChevronRight
                className={`ml-auto transition-transform ${invoiceOpen ? "rotate-90" : ""}`}
              />
            </SidebarMenuButton>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <Link href="/admin/dashboard">
                    <LandPlot />
                    <span>Create Invoice</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      {/* ===== Footer — NavUser handles its own auth fetch ===== */}
      <SidebarFooter className="border-t p-2">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
