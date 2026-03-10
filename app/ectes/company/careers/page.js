import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { IconFolderCode } from "@tabler/icons-react";
import { ArrowUpRightIcon } from "lucide-react";
import { Header } from "../../components/Header";

export default function CareersPage() {
  return (
    <div className="min-h-screen">
        <Header />
      <div className="min-h-screen flex items-center">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconFolderCode />
            </EmptyMedia>
            <EmptyTitle>No Careers Yet</EmptyTitle>
            <EmptyDescription>
              Keep an eye on this page for future opportunities to join our team!
            </EmptyDescription>
          </EmptyHeader>
        
        </Empty>
      </div>
    </div>
  );
}
