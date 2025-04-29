import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/page-layout"

export default function NotFound() {
  return (
    <PageLayout>
      <div className="container flex flex-col items-center justify-center min-h-[70vh] py-16 text-center">
        <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
          404
        </h1>
        <h2 className="text-3xl font-bold mt-6 mb-4">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
          >
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/courses">Browse Courses</Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  )
}
