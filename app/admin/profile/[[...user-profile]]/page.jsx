"use client";

import { useUser } from "@clerk/nextjs";
import { UserProfile } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";

export default function ProfilePage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/admin/login");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) return null;

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar />

      <SidebarInset>
        <SiteHeader />

        <div className="flex flex-1 flex-col p-6">
          <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

          <div className="flex justify-center">
            <UserProfile
              path="/admin/profile"
              routing="path"
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-lg border rounded-xl",
                },
              }}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
