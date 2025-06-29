import { PageLayout } from "@/components/page-layout"
import { Header } from "@/components/header"

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header activeLink="Explore" />
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-8">All Courses</h1>
        <p className="text-muted-foreground">Course listing page coming soon...</p>
      </main>
    </div>
  )
}