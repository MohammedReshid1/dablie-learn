import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div>
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-5 w-32" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                  </div>
                  {i === 1 && <Skeleton className="h-2 w-full mt-2" />}
                </CardContent>
              </Card>
            ))}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Skeleton className="h-10 w-full md:w-64" />
              <Skeleton className="h-10 w-full md:w-[180px]" />
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <div className="bg-card p-4">
              <div className="flex items-center gap-4 py-3">
                <Skeleton className="h-5 w-[250px]" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-24" />
              </div>

              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-center gap-4 py-4 border-t">
                    <div className="space-y-2 w-[250px]">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                    <div className="flex gap-1 w-24">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <div className="space-y-1 w-16">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-2 w-full" />
                    </div>
                    <div className="w-20">
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex items-center w-24">
                      <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
