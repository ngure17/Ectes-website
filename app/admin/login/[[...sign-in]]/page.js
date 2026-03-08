"use client";

import React, { useEffect } from "react";
import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Login() {
  const { isSignedIn, isLoaded } = useUser(); // Check if user is signed in
  const router = useRouter();

  // Redirect to dashboard once user is signed in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/admin/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <main className="min-h-screen flex items-center justify-center mt-3.5">
      <SignIn path="/admin/login" routing="path" />
    </main>
  );
}
