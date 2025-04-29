import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";

export default function MyCoursesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="My Courses" text="View and manage your enrolled courses." />
      <div className="p-4 border rounded-lg bg-card border-border">
        <p className="text-muted-foreground">
          Your enrolled courses will appear here. (Content to be implemented)
        </p>
      </div>
    </DashboardShell>
  );
} 