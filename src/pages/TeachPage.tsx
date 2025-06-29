import { PageLayout } from "@/components/page-layout"
import { Header } from "@/components/header"

export default function TeachPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header activeLink="Teach" />
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Teach on DablieLearn</h1>
        <p className="text-muted-foreground">Teach page coming soon...</p>
      </main>
    </div>
  )
}