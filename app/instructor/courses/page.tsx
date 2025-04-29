import { DashboardHeader } from "@/components/dashboard-header";
import { InstructorShell } from "@/components/instructor-shell";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function InstructorCoursesPage() {
  return (
    <InstructorShell>
      <DashboardHeader heading="My Courses" text="Manage your created courses.">
         <Button asChild className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600">
          <Link href="/instructor/courses/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Course
          </Link>
        </Button>
      </DashboardHeader>
      <div className="p-4 border rounded-lg bg-card border-border">
        <p className="text-muted-foreground">
          A table or list of your created courses (published and drafts) will appear here. (Content to be implemented)
        </p>
      </div>
    </InstructorShell>
  );
} 