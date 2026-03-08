import { Card, CardContent } from "@/components/ui/card";

export default function StatsCards() {
  const stats = [
    { title: "Total Jobs", value: 12 },
    { title: "Applications", value: 248 },
    { title: "Interviews", value: 18 },
    { title: "Hired", value: 4 },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {stats.map((item, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">{item.title}</p>

            <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
