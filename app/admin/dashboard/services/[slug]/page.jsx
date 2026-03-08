"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ServiceDetailsPage() {
  const params = useParams();
  const { slug } = params;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchService() {
      try {
        const res = await fetch(`/api/services/${slug}`);
        const data = await res.json();
        setService(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchService();
  }, [slug]);

  if (loading) return <p className="p-6">Loading service...</p>;
  if (!service) return <p className="p-6">Service not found.</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Service Header */}
      <Card>
        <CardHeader>
          <CardTitle>{service.title}</CardTitle>
          <Badge
            className={`mt-2 ${
              service.status === "Published"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {service.status}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-2">
          {service.cover_image && (
            <img
              src={`data:${service.cover_image_type};base64,${service.cover_image}`}
              alt={service.title}
              className="w-full max-h-64 object-cover rounded-lg"
            />
          )}
          <p className="text-muted-foreground">{service.short_description}</p>
          <p>{service.detailed_description}</p>
        </CardContent>
      </Card>

      {/* Sections */}
      {service.sections && service.sections.length > 0 && (
        <div className="space-y-4">
          {service.sections
            .sort((a, b) => a.position - b.position)
            .map((section) => (
              <Card key={section.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {section.icon && <span>{section.icon}</span>}
                    {section.heading}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div dangerouslySetInnerHTML={{ __html: section.content }} />
                  {section.section_image && (
                    <img
                      src={`data:${section.section_image_type};base64,${section.section_image}`}
                      alt={section.heading}
                      className="w-full max-h-48 object-cover rounded"
                    />
                  )}
                </CardContent>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}
