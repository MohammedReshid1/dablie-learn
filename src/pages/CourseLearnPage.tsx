import { useParams } from "react-router-dom"
import { PageLayout } from "@/components/page-layout"

export default function CourseLearnPage() {
  const { id } = useParams()
  
  return (
    <PageLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Learning Course</h1>
        <p className="text-muted-foreground">Course ID: {id}</p>
        <p className="text-muted-foreground">Course learning page coming soon...</p>
      </div>
    </PageLayout>
  )
}