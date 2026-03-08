"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AddJobForm() {
  return (
    <form className="space-y-6  border p-6 rounded-xl">
      <Input placeholder="Job Title" />

      <Input placeholder="Department" />

      <Input placeholder="Location" />

      <Input placeholder="Job Type (Full-Time, Contract, Remote)" />

      <Input placeholder="Experience Level" />

      <Input placeholder="Salary Range" />

      <Input type="date" />

      <Textarea placeholder="Job Description" />

      <Textarea placeholder="Responsibilities" />

      <Textarea placeholder="Requirements" />

      <Button className="w-full">Publish Job</Button>
    </form>
  );
}
