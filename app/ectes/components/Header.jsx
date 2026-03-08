"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ThemeSelector } from "@/components/ui/theme-selector";

const menuConfig = {
  getStarted: [
    {
      title: "Introduction",
      description: "Our Introductions and Services",
      href: "/",
    },
    {
      title: "News Update",
      description: "Find our Updates",
      href: "/docs/installation",
    },
    {
      title: "Trainings And Innovative Empowerments",
      description:
        "Practical, industry-driven training programs designed to empower innovation and technical excellence.",
      href: "/ectes/company/trainings",
      showBadge: true,
    },
  ],

  solutions: [
    {
      title: "Mechanical Engineering",
      href: "/ectes/company/services/mechanical",
    },
    {
      title: "Electrical and Electronics",
      href: "/ectes/company/services/electrical",
    },
    { title: "Automotive Repair", href: "/ectes/company/services/automotive" },
    {
      title: "Building and Construction",
      href: "/ectes/company/services/construction",
    },
  ],

  company: [
    { title: "About Us", href: "/ectes/company/about" },
    { title: "Careers and Jobs", href: "/ectes/company/careers" },
    { title: "Contact Support", href: "/ectes/company/contact" },
  ],
};
/* ------------------ HEADER ------------------ */
export function Header() {
  const [trainingPrograms, setTrainingPrograms] = useState([]);
  useEffect(() => {
    async function fetchCourses() {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setTrainingPrograms(data);
    }
    fetchCourses();
  }, []);

  return (
    <header className="w-full border-b">
      <div className="container mx-auto flex h-16 sm:h-20 items-center px-4">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/Ectes_Logo-removebg-preview.png"
            alt="ECTES logo"
            width={150}
            height={50}
            className="object-contain"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-6">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/" className="font-medium">
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Get Started</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-96">
                    <ListItem href="/" title="Introduction">
                      Our Introductions and Services
                    </ListItem>
                    <ListItem href="/docs/installation" title="News Update">
                      Find our Updates
                    </ListItem>
                    <ListItem
                      href="/ectes/company/trainings"
                      title="Trainings And Innovative Empowerments"
                      badge={
                        trainingPrograms.length > 0 ? (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-blue-800 text-white text-xs hover:bg-amber-800"
                          >
                            Intake ongoing
                          </Badge>
                        ) : null
                      }
                    >
                      Practical, industry-driven training programs designed to
                      empower innovation and technical excellence.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Link href={"/ectes/company/services"}>Solutions</Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-96">
                    <ListItem href="/" title="Mechanical Engineering">
                      Our Introductions and Services
                    </ListItem>
                    <ListItem
                      href="/docs/installation"
                      title="Electrical and Electronics"
                    >
                      Find our Updates
                    </ListItem>
                    <ListItem
                      href="/docs/primitives/typography"
                      title="Automotive Repair"
                    >
                      Styles for headings and paragraphs.
                    </ListItem>
                    <ListItem
                      href="/docs/primitives/typography"
                      title="Building and construction"
                    >
                      Styles for headings and paragraphs.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-96">
                    <ListItem href="/ectes/company/about-us" title="About Us">
                      Our Introductions and Services
                    </ListItem>
                    <ListItem
                      href="/docs/installation"
                      title="Careers and Jobs"
                    >
                      Find our Updates
                    </ListItem>
                    <ListItem
                      href="/ectes/company/contact"
                      title="Contact Support"
                    >
                      Styles for headings and paragraphs.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Mobile Menu */}
          <MobileMenu trainingPrograms={trainingPrograms} />
          {/* Desktop toggle */}
          <div className="lg:ml-auto flex items-center gap-2  sm:flex">
            <ThemeSelector />
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

/* ------------------ MOBILE MENU ------------------ */

function MobileMenu({ trainingPrograms }) {
  const [open, setOpen] = useState(null);

  const toggle = (section) => setOpen(open === section ? null : section);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="sm:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72">
        <nav className="mt-6 flex flex-col gap-6">
          {/* Home */}
          <Link href="/" className="text-lg font-semibold">
            Home
          </Link>

          {/* Get Started */}
          <MobileSection
            title="Get Started"
            isOpen={open === "getStarted"}
            onToggle={() => toggle("getStarted")}
          >
            {menuConfig.getStarted.map((item) => (
              <MobileItem
                key={item.title}
                {...item}
                badge={
                  item.showBadge && trainingPrograms.length > 0 ? (
                    <Badge className="bg-blue-800 text-white text-xs">
                      Intake ongoing
                    </Badge>
                  ) : null
                }
              />
            ))}
          </MobileSection>

          {/* Solutions */}
          <MobileSection
            title="Solutions"
            isOpen={open === "solutions"}
            onToggle={() => toggle("solutions")}
          >
            {menuConfig.solutions.map((item) => (
              <MobileLink key={item.title} {...item} />
            ))}
          </MobileSection>

          {/* Company */}
          <MobileSection
            title="Company"
            isOpen={open === "company"}
            onToggle={() => toggle("company")}
          >
            {menuConfig.company.map((item) => (
              <MobileLink key={item.title} {...item} />
            ))}
          </MobileSection>

          {/* Toggles */}
          <div className="pt-4 border-t flex gap-2">
            <ThemeSelector />
            <ModeToggle />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

/* ------------------ HELPERS ------------------ */

function MobileSection({ title, isOpen, onToggle, children }) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex w-full justify-between items-center text-sm font-medium"
      >
        {title}
        <span>{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="mt-3 flex flex-col gap-3 pl-2">{children}</div>
      )}
    </div>
  );
}

function MobileLink({ title, href }) {
  return (
    <Link href={href} className="text-sm hover:underline">
      {title}
    </Link>
  );
}

function MobileItem({ title, description, href, badge }) {
  return (
    <Link href={href} className="rounded-md p-2 hover:bg-muted transition">
      <div className="flex items-center gap-2 text-sm font-medium">
        {title}
        {badge}
      </div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </Link>
  );
}

function ListItem({ title, badge, children, href }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block rounded-md p-3 hover:bg-muted transition-colors"
        >
          <div className="flex items-center gap-4 text-sm font-medium">
            <span>{title}</span>
            {badge}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
