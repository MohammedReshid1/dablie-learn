import { PageLayout } from "@/components/page-layout"
import { Header } from "@/components/header"

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header activeLink="Categories" />
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-8">All Categories</h1>
        <p className="text-muted-foreground">Categories page coming soon...</p>
      </main>
    </div>
  )
}