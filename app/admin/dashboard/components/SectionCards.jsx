import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Solutions</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Our Services
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            ECTES Total Services <span>{4}</span>
          </div>
          <div className="text-muted-foreground">
            <a
              href="/admin/dashboard/services"
              className="
                  mt-auto inline-flex items-center gap-2
                  text-sm font-semibold transition-all duration-300
  "
            >
              Learn more
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-focus-within:translate-x-1 group-active:translate-x-1">
                →
              </span>
            </a>
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Trainings</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Our Recent Courses
          </CardTitle>
          <CardAction>
            <Badge
              variant="secondary"
              className="text-xs bg-blue-800 text-white text-xs hover:bg-amber-800"
            >
              Intake ongoing
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Ongoing courses total <span>{5}</span>
          </div>
          <div className="text-muted-foreground">
            <a
              href="/admin/dashboard/trainings"
              className="
                  mt-auto inline-flex items-center gap-2
                  text-sm font-semibold transition-all duration-300
  "
            >
              Learn more
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-focus-within:translate-x-1 group-active:translate-x-1">
                →
              </span>
            </a>
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Jobs and Careers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Jobs Listed
          </CardTitle>
          <CardAction>
            <Badge
              variant="secondary"
              className="text-xs bg-blue-800 text-white text-xs hover:bg-amber-800"
            >
              Application ongoing
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Jobs ECTES is Offering 
          </div>
          <div className="text-muted-foreground"><a
              href="#"
              className="
                  mt-auto inline-flex items-center gap-2
                  text-sm font-semibold transition-all duration-300
  "
            >
              Learn more
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-focus-within:translate-x-1 group-active:translate-x-1">
                →
              </span>
            </a></div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>ECTES Portfolio</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
           Our work updates 
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance increase <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Meets growth projections <br></br>
            <a
              href="#"
              className="
                  mt-auto inline-flex items-center gap-2
                  text-sm font-semibold transition-all duration-300
  "
            >
              Learn more
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-focus-within:translate-x-1 group-active:translate-x-1">
                →
              </span>
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
