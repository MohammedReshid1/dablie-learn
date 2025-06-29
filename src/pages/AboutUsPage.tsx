import { PageLayout } from "@/components/page-layout"
import { Header } from "@/components/header"

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header activeLink="About Us" />
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-8">About Us</h1>
        <p className="text-muted-foreground">About us page coming soon...</p>
      </main>
    </div>
  )
}