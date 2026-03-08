"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="sm:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72">
        <nav className="flex flex-col gap-6 mt-6">
          <Link href="/" className="text-lg font-semibold">
            Home
          </Link>

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Solutions
            </p>
            <div className="flex flex-col gap-2">
              {components.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="text-sm hover:underline"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Company
            </p>
            <div className="flex flex-col gap-2">
              {components.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="text-sm hover:underline"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t">
            <ModeToggle />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
