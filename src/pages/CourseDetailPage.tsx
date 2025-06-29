import { useParams } from "react-router-dom"
import { PageLayout } from "@/components/page-layout"

export default function CourseDetailPage() {
  const { id } = useParams()
  
  return (
    <PageLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Course Details</h1>
        <p className="text-muted-foreground">Course ID: {id}</p>
        <p className="text-muted-foreground">Course detail page coming soon...</p>
      </div>
    </PageLayout>
  )
}