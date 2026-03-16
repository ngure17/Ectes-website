"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { ThemeSelector } from "@/components/ui/theme-selector";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user info from backend using JWT cookie
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) throw new Error("Not authenticated");

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        router.push("/auth/login"); // redirect if not logged in
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [router]);

  const handleSignOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth/login");
  };

  if (loading) return <p className="text-center mt-16">Loading...</p>;
  if (!user) return null;

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

        <main className="flex flex-col items-center w-full p-6 md:p-10 space-y-8">
          {/* Header */}
          <div className="w-full max-w-4xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold">{user.full_name}</h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <Badge variant="secondary">{user.role || "User"}</Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                asChild
                size="sm"
                className="hidden sm:flex"
              >
                <ThemeSelector />
              </Button>
              <Button
                variant="ghost"
                asChild
                size="sm"
                className="hidden sm:flex"
              >
                <ModeToggle />
              </Button>

              <button
                onClick={handleSignOut}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Profile Card */}
          <div className="w-full max-w-4xl shadow-lg border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Profile Details</h2>
            <p>
              <strong>Name:</strong> {user.full_name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>

            <div className="mt-4 flex flex-col md:flex-row gap-4">
              <button
                onClick={() => router.push("/admin/profile/security")}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Security Settings
              </button>
              <button
                onClick={() => router.push("/admin/profile")}
                className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md"
              >
                Profile
              </button>
            </div>
          </div>

          {/* Dashboard Link */}
          <div className="w-full max-w-4xl mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
            <a href="/dashboard" className="hover:underline">
              Go to Dashboard
            </a>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
