"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AddTrainingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    course_title: "",
    brief_explanation: "",
    duration: "",
    intake_period: "",
    level: "Beginner",
    examination_type: "",
    course_start_date: "",
    course_end_date: "",
    mode_of_learning: "Online",
    image_url: "",
    image: null,
    course_outline_file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      const res = await fetch("/api/courses", {
        method: "POST",
        body: formData,
      });

      setLoading(false);

      if (res.ok) {
        router.push("/admin/dashboard/trainings");
      } else {
        alert("Failed to create training");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Error submitting form");
    }
  };

  return (
    <div className="p-6 bg-background rounded-xl shadow-md max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Add Training</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="course_title"
          placeholder="Course Name"
          value={form.course_title}
          onChange={handleChange}
          required
        />
        <Textarea
          name="brief_explanation"
          placeholder="Brief Explanation"
          value={form.brief_explanation}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="duration"
            placeholder="Duration"
            value={form.duration}
            onChange={handleChange}
            required
          />
          <Input
            name="intake_period"
            placeholder="Intake Period"
            value={form.intake_period}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="level"
            placeholder="Certificate/Diploma/Level III,II,I etc"
            value={form.level}
            onChange={handleChange}
            required
          />
          <Input
            name="examination_type"
            placeholder="Examination Type"
            value={form.examination_type}
            onChange={handleChange}
            required
          />
        </div>

        {/* Mode of Learning select */}
        <div>
          <label className="block mb-1 font-medium">Mode of Learning</label>
          <select
            name="mode_of_learning"
            value={form.mode_of_learning}
            onChange={handleChange}
            className="w-full rounded-md border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="Physical">Full-Time</option>
            <option value="Physical">Part-Time</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Online">Online</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="date"
            name="course_start_date"
            value={form.course_start_date}
            onChange={handleChange}
            required
          />
          <Input
            type="date"
            name="course_end_date"
            value={form.course_end_date}
            onChange={handleChange}
            required
          />
        </div>

        <Input
          name="image_url"
          placeholder="Image URL (optional)"
          value={form.image_url}
          onChange={handleChange}
        />

        <div>
          <label className="block mb-1 font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, image: e.target.files[0] }))
            }
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Upload Course Outline (PDF)
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                course_outline_file: e.target.files[0],
              }))
            }
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Training"}
        </Button>
      </form>
    </div>
  );
}
