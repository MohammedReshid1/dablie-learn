import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, SlidersHorizontal, LayoutGrid, List } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Course } from "@/lib/types"
import { CourseCard } from "@/components/course-card"
import { PageLayout } from "@/components/page-layout"

// Sample course data - Restore specific image placeholder
const COURSES: Course[] = Array(12)
  .fill(null)
  .map((_, i) => ({
    id: `course-${i + 1}`,
    title: [
      "Complete Web Development Bootcamp",
      "UI/UX Design Masterclass",
      "Data Science & Machine Learning",
      "Digital Marketing Strategy",
      "Full-Stack Mobile App Development",
      "Business Finance & Accounting",
    ][i % 6],
    instructor: ["Sarah Johnson", "Michael Chen", "Alex Rivera", "Emma Phillips", "David Kumar", "Lisa Wong"][i % 6],
    image: "/placeholder.svg?height=400&width=600",
    price: [89.99, 79.99, 94.99, 69.99, 99.99, 74.99][i % 6],
    rating: [4.8, 4.7, 4.9, 4.6, 4.8, 4.5][i % 6],
    students: [15234, 8562, 12750, 7456, 9321, 6235][i % 6],
    hours: [42, 38, 56, 32, 48, 35][i % 6],
    level: [
      "Beginner to Advanced",
      "Intermediate",
      "Advanced",
      "Beginner",
      "Intermediate to Advanced",
      "Beginner to Intermediate",
    ][i % 6],
    category: ["Development", "Design", "Data Science", "Marketing", "Development", "Business"][i % 6],
    bestseller: i % 3 === 0,
  }))

export default function CoursesPage() {
  return (
    <PageLayout>
      <main className="flex-1">
        <section className="py-12 bg-gradient-to-r from-rose-50 to-orange-50 dark:from-neutral-900 dark:to-neutral-800">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
                Explore Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                  Courses
                </span>
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-8">
                Browse through our extensive collection of courses across various categories.
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-3 h-5 w-5 text-neutral-500" />
                <Input
                  placeholder="Search for any course, topic or instructor"
                  className="pl-10 py-6 rounded-full border-neutral-300 shadow-sm text-base"
                />
                <Button className="absolute right-1 top-1 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-64 shrink-0">
                <div className="sticky top-24 bg-white dark:bg-neutral-900 p-6 rounded-xl border dark:border-neutral-800 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-foreground">Filters</h2>
                    <Button variant="ghost" size="sm" className="text-rose-600 hover:text-rose-700">
                      Reset
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3 text-foreground">Categories</h3>
                      <div className="space-y-2">
                        {[
                          "All Categories",
                          "Development",
                          "Design",
                          "Marketing",
                          "Business",
                          "Data Science",
                          "Illustration",
                        ].map((category) => (
                          <div key={category} className="flex items-center">
                            <input
                              type="checkbox"
                              id={category}
                              className="h-4 w-4 rounded border-neutral-300 dark:border-neutral-700 text-rose-600 focus:ring-rose-600 dark:bg-neutral-800 dark:focus:ring-offset-neutral-900"
                              defaultChecked={category === "All Categories"}
                            />
                            <label htmlFor={category} className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3 text-foreground">Price Range</h3>
                      <Slider defaultValue={[0, 100]} max={200} step={1} className="py-4" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">$0</span>
                        <span className="text-sm font-medium text-foreground">$200</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3 text-foreground">Rating</h3>
                      <div className="space-y-2">
                        {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                          <div key={rating} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`rating-${rating}`}
                              className="h-4 w-4 rounded border-neutral-300 dark:border-neutral-700 text-rose-600 focus:ring-rose-600 dark:bg-neutral-800 dark:focus:ring-offset-neutral-900"
                            />
                            <label
                              htmlFor={`rating-${rating}`}
                              className="ml-2 text-sm text-neutral-600 dark:text-neutral-400 flex items-center"
                            >
                              {rating}+
                              <div className="flex ml-1">
                                {/* Removed inline star SVG - Use lucide-react Star if needed, although this specific style isn't easily replicated without more complex logic */}
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3 text-foreground">Level</h3>
                      <div className="space-y-2">
                        {["Beginner", "Intermediate", "Advanced", "All Levels"].map((level) => (
                          <div key={level} className="flex items-center">
                            <input
                              type="checkbox"
                              id={level}
                              className="h-4 w-4 rounded border-neutral-300 dark:border-neutral-700 text-rose-600 focus:ring-rose-600 dark:bg-neutral-800 dark:focus:ring-offset-neutral-900"
                            />
                            <label htmlFor={level} className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">
                              {level}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600">
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">All Courses</h2>
                    <p className="text-neutral-500 dark:text-neutral-400">Showing {COURSES.length} results</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center">
                      <Tabs defaultValue="grid" className="w-full">
                        <TabsList className="bg-neutral-100 dark:bg-neutral-800">
                          <TabsTrigger value="grid" className="data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900">
                            <LayoutGrid className="h-4 w-4" />
                          </TabsTrigger>
                          <TabsTrigger value="list" className="data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900">
                            <List className="h-4 w-4" />
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>

                    <div className="flex items-center">
                      <Select defaultValue="relevance">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relevance">Most Relevant</SelectItem>
                          <SelectItem value="newest">Newest</SelectItem>
                          <SelectItem value="popular">Most Popular</SelectItem>
                          <SelectItem value="price-low">Price: Low to High</SelectItem>
                          <SelectItem value="price-high">Price: High to Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button variant="outline" className="sm:hidden w-full flex items-center gap-2">
                      <SlidersHorizontal className="h-4 w-4" /> Filters
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {COURSES.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>

                <div className="flex justify-center mt-12">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </Button>

                    {[1, 2, 3, 4, 5].map((page) => (
                      <Button
                        key={page}
                        variant={page === 1 ? "default" : "outline"}
                        className={`w-10 h-10 rounded-full ${
                          page === 1
                            ? "bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white"
                            : ""
                        }`}
                      >
                        {page}
                      </Button>
                    ))}

                    <Button variant="outline" size="icon" className="rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
