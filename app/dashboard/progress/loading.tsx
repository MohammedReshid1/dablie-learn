import { Skeleton } from "@/components/ui/skeleton"

export default function ProgressLoading() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div>
          <Skeleton className="h-10 w-[250px] mb-2" />
          <Skeleton className="h-4 w-[350px]" />
        </div>

        <div className="flex gap-2 mb-6">
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-[100px] hidden md:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="p-6 border rounded-lg">
                <Skeleton className="h-4 w-[100px] mb-4" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-8 w-[60px]" />
                  <Skeleton className="h-4 w-4 rounded-full" />
                </div>
                <Skeleton className="h-2 w-full mt-2" />
              </div>
            ))}
        </div>

        <div className="border rounded-lg p-6">
          <Skeleton className="h-6 w-[150px] mb-2" />
          <Skeleton className="h-4 w-[250px] mb-6" />

          <div className="space-y-6">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-start space-x-4 pb-4 border-b last:border-0">
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-3 w-[150px]" />
                  </div>
                  <Skeleton className="h-6 w-[100px] rounded-full" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
