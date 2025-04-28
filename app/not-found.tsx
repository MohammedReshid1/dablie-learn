import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="container">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-fuchsia-500 to-orange-500">
              <span className="font-bold text-white text-4xl">404</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-neutral-600 mb-8">The page you are looking for doesn't exist or has been moved.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/courses">Browse Courses</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
            >
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
