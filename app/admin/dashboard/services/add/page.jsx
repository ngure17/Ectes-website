"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash, GripVertical } from "lucide-react";

export default function AddServiceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams?.get("slug");

  const [loading, setLoading] = useState(false);

  const [serviceData, setServiceData] = useState({
    title: "",
    slug: "",
    short_description: "",
    detailed_description: "",
    icon: "",
    cover_image: null,
    cover_image_type: "",
    meta_title: "",
    meta_description: "",
    display_order: 0,
    status: "draft",
  });

  const [sections, setSections] = useState([]);

  // Load service if editing
  useEffect(() => {
    if (!slug) return;

    async function fetchService() {
      try {
        const res = await fetch(`/api/services/${slug}`);
        const data = await res.json();
        if (!data) return;

        setServiceData({
          title: data.title || "",
          slug: data.slug || "",
          short_description: data.short_description || "",
          detailed_description: data.detailed_description || "",
          icon: data.icon || "",
          cover_image: null,
          cover_image_type: data.cover_image_type || "",
          meta_title: data.meta_title || "",
          meta_description: data.meta_description || "",
          display_order: data.display_order || 0,
          status: data.status || "draft",
        });

        setSections(
          (data.sections || []).map((s, idx) => ({
            ...s,
            section_image: null,
            section_image_type: s.section_image_type || "",
            position: s.position || idx + 1,
          })),
        );
      } catch (err) {
        console.error("Failed to load service:", err);
      }
    }

    fetchService();
  }, [slug]);

  // Section handlers
  const addSection = () => {
    setSections([
      ...sections,
      {
        heading: "",
        content: "",
        icon: "",
        section_image: null,
        section_image_type: "",
        position: sections.length + 1,
      },
    ]);
  };

  const removeSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleSectionImage = (index, file) => {
    if (!file) return;
    const copy = [...sections];
    copy[index].section_image = file;
    copy[index].section_image_type = file.type;
    setSections(copy);
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
    });

  // Submit handler
  const submitService = async (statusOverride = null) => {
    setLoading(true);
    try {
      const sectionsPayload = await Promise.all(
        sections.map(async (sec) => ({
          heading: sec.heading,
          content: sec.content,
          icon: sec.icon,
          position: sec.position,
          section_image: sec.section_image
            ? await fileToBase64(sec.section_image)
            : sec.section_image_base64 || null,
          section_image_type: sec.section_image_type,
        })),
      );

      const payload = {
        ...serviceData,
        cover_image: serviceData.cover_image
          ? await fileToBase64(serviceData.cover_image)
          : serviceData.cover_image_base64 || null,
        cover_image_type: serviceData.cover_image_type,
        status: statusOverride || serviceData.status,
        sections: sectionsPayload,
      };

      const url = slug ? `/api/services/${slug}` : "/api/services";
      const method = slug ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.success) {
        alert(`Service ${slug ? "updated" : "saved"}!`);
        router.push("/admin/dashboard/services");
      } else {
        alert("Error: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Submission failed!");
    }
    setLoading(false);
  };

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
        <div className="p-6 space-y-6">
          {/* Sticky Header */}
          <div className="flex items-center justify-between sticky top-0 bg-background z-50 p-4 shadow-sm">
            <div>
              <h1 className="text-2xl font-semibold">Add New Service</h1>
              <p className="text-sm text-muted-foreground">
                Create and publish a service page
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => submitService("draft")}
                disabled={loading}
              >
                Save Draft
              </Button>
              <Button
                onClick={() => submitService("published")}
                disabled={loading}
              >
                Publish
              </Button>
            </div>
          </div>

          {/* Service Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Service Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Service Title"
                value={serviceData.title}
                onChange={(e) =>
                  setServiceData({ ...serviceData, title: e.target.value })
                }
              />
              <Input
                placeholder="Slug"
                value={serviceData.slug}
                onChange={(e) =>
                  setServiceData({ ...serviceData, slug: e.target.value })
                }
              />
              <Textarea
                placeholder="Short Description"
                value={serviceData.short_description}
                onChange={(e) =>
                  setServiceData({
                    ...serviceData,
                    short_description: e.target.value,
                  })
                }
              />
              <Textarea
                placeholder="Detailed Description"
                value={serviceData.detailed_description}
                onChange={(e) =>
                  setServiceData({
                    ...serviceData,
                    detailed_description: e.target.value,
                  })
                }
              />
            </CardContent>
          </Card>

          {/* Media & Visuals */}
          <Card>
            <CardHeader>
              <CardTitle>Media & Visuals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Icon name (e.g. wrench)"
                value={serviceData.icon}
                onChange={(e) =>
                  setServiceData({ ...serviceData, icon: e.target.value })
                }
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setServiceData({
                    ...serviceData,
                    cover_image: file || null,
                    cover_image_type: file?.type || "",
                  });
                }}
              />
              {serviceData.cover_image && typeof window !== "undefined" && (
                <img
                  src={URL.createObjectURL(serviceData.cover_image)}
                  alt="cover preview"
                  className="mt-2 w-40 h-24 object-cover rounded"
                />
              )}
            </CardContent>
          </Card>

          {/* Service Sections */}
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Service Sections</CardTitle>
              <Button size="sm" onClick={addSection}>
                <Plus className="w-4 h-4 mr-1" /> Add Section
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {sections.map((sec, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg p-4 space-y-3 relative"
                >
                  <div className="absolute left-2 top-2 cursor-move">
                    <GripVertical className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <Input
                    placeholder="Section Heading"
                    value={sec.heading}
                    onChange={(e) => {
                      const copy = [...sections];
                      copy[idx].heading = e.target.value;
                      setSections(copy);
                    }}
                  />
                  <Textarea
                    placeholder="Section Content"
                    value={sec.content}
                    onChange={(e) => {
                      const copy = [...sections];
                      copy[idx].content = e.target.value;
                      setSections(copy);
                    }}
                  />
                  <Input
                    placeholder="Icon (optional)"
                    value={sec.icon}
                    onChange={(e) => {
                      const copy = [...sections];
                      copy[idx].icon = e.target.value;
                      setSections(copy);
                    }}
                  />
                  <div>
                    <label className="text-sm">Upload Section Image</label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleSectionImage(idx, e.target.files[0])
                      }
                    />
                    {sec.section_image && typeof window !== "undefined" && (
                      <img
                        src={URL.createObjectURL(sec.section_image)}
                        alt="preview"
                        className="mt-2 w-40 h-24 object-cover rounded"
                      />
                    )}
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeSection(idx)}
                    >
                      <Trash className="w-4 h-4 mr-1" /> Remove
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* SEO & Visibility */}
          <Card>
            <CardHeader>
              <CardTitle>SEO & Visibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Meta Title"
                value={serviceData.meta_title}
                onChange={(e) =>
                  setServiceData({ ...serviceData, meta_title: e.target.value })
                }
              />
              <Textarea
                placeholder="Meta Description"
                value={serviceData.meta_description}
                onChange={(e) =>
                  setServiceData({
                    ...serviceData,
                    meta_description: e.target.value,
                  })
                }
              />
              <Input
                type="number"
                placeholder="Display Order"
                value={serviceData.display_order}
                onChange={(e) =>
                  setServiceData({
                    ...serviceData,
                    display_order: e.target.value,
                  })
                }
              />
            </CardContent>
          </Card>

          {/* Status Selector */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={serviceData.status}
                onValueChange={(val) =>
                  setServiceData({ ...serviceData, status: val })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
