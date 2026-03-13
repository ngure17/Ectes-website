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

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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
  const [services, setServices] = useState([]);
  useEffect(() => {
    async function fetchCourses() {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setTrainingPrograms(data);
    }
    fetchCourses();

    async function fetchServices() {
      try {
        const data = await fetch("/api/services").then((res) => res.json());
        setServices(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchServices();
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
            <NavigationMenuList className="flex items-center gap-3 relative">
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Link href="/" className="font-medium">
                    Home
                  </Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  align="start" // Aligns the dropdown to the start of the trigger
                  className="bg-white dark:bg-black shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 p-4"
                >
                  <ul className="w-96">
                    <ListItem href="/" title="Home">
                      ECTES overview
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
                <NavigationMenuTrigger>Trainings</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-96">
                    <ListItem
                      href="/ectes/company/trainings"
                      title="Trainings And Consultancies"
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
                      we offer a wide range of training programs and
                      consultancies in the fields of mechanical engineering,
                      electrical and electronics, automotive repair, and
                      building and construction. Our training programs are
                      designed to equip individuals with the necessary skills
                      and knowledge to excel in their respective industries.
                      Whether you're looking to enhance your technical expertise
                      or seeking guidance on specific projects, our
                      consultancies provide tailored solutions to meet your
                      needs.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <span className="font-semibold text-gray-700 dark:text-white hover:text-gray-900 cursor-pointer">
                    <Link
                      href="/ectes/company/services"
                      className="font-medium"
                    >
                      Productions & Services
                    </Link>
                  </span>
                </NavigationMenuTrigger>

                <NavigationMenuContent className="bg-white dark:bg-black shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <ul className="w-96 flex flex-col gap-3">
                    {services.map((service) => (
                      <li
                        key={service.id}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                      >
                        <Link
                          href={`/ectes/company/services/${service.slug}`}
                          className="block p-3"
                        >
                          <h3 className="text-gray-900 dark:text-white font-medium text-lg">
                            {service.title}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">
                            {service.short_description
                              ? service.short_description
                                  .split(" ")
                                  .slice(0, 10)
                                  .join(" ") + "..."
                              : "No description available."}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white dark:bg-black shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <ul className="w-96">
                    <ListItem href="/ectes/company/about-us" title="About Us">
                      Our Introductions and Services
                    </ListItem>
                    <ListItem
                      href="/ectes/company/careers"
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
  const [services, setServices] = useState([]);

  const toggle = (section) => setOpen(open === section ? null : section);

  useEffect(() => {
    async function fetchServices() {
      try {
        const data = await fetch("/api/services").then((res) => res.json());
        setServices(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchServices();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="sm:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-6">
          {/* Home */}
          <Link href="/" className="text-lg font-semibold">
            Home
          </Link>

          {/* Trainings */}
          <MobileSection
            title="Trainings"
            isOpen={open === "trainings"}
            onToggle={() => toggle("trainings")}
          >
            <MobileItem
              href="/ectes/company/trainings"
              title="Trainings And Consultancies"
              description="Practical, industry-driven training programs designed to empower innovation and technical excellence."
              badge={
                trainingPrograms.length > 0 ? (
                  <Badge className="bg-blue-800 text-white text-xs">
                    Intake ongoing
                  </Badge>
                ) : null
              }
            />
          </MobileSection>

          {/* Productions & Services */}
          <MobileSection
            title="Productions & Services"
            isOpen={open === "services"}
            onToggle={() => toggle("services")}
          >
            {services.map((service) => (
              <MobileItem
                key={service.id}
                href={`/ectes/company/services/${service.slug}`}
                title={service.title}
                description={
                  service.short_description
                    ? service.short_description
                        .split(" ")
                        .slice(0, 10)
                        .join(" ") + "..."
                    : "No description available."
                }
              />
            ))}
          </MobileSection>

          {/* Company */}
          <MobileSection
            title="Company"
            isOpen={open === "company"}
            onToggle={() => toggle("company")}
          >
            <MobileLink title="About Us" href="/ectes/company/about-us" />
            <MobileLink
              title="Careers and Jobs"
              href="/ectes/company/careers"
            />
            <MobileLink title="Contact Support" href="/ectes/company/contact" />
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
