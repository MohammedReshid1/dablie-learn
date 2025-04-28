import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, SlidersHorizontal, LayoutGrid, List } from "lucide-react"
import Link from "next/link"

// Sample course data
const COURSES = Array(12)
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
    <div className="flex flex-col min-h-screen bg-white">
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/80 border-b border-neutral-200">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-fuchsia-500 to-orange-500">
              <span className="font-bold text-white text-xl">D</span>
            </div>
            <span className="font-bold text-xl">DablieLearn</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/courses" className="text-sm font-medium text-rose-600">
              Explore
            </Link>
            <Link
              href="/categories"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/teach"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
            >
              Teach
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block text-sm font-medium text-neutral-700 hover:text-neutral-900">
              Log in
            </Link>
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        <section className="py-12 bg-gradient-to-r from-rose-50 to-orange-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-4">
                Explore Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                  Courses
                </span>
              </h1>
              <p className="text-neutral-600 text-lg mb-8">
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
                <div className="sticky top-24 bg-white p-6 rounded-xl border shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold">Filters</h2>
                    <Button variant="ghost" size="sm" className="text-rose-600">
                      Reset
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Categories</h3>
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
                              className="h-4 w-4 rounded border-neutral-300 text-rose-600 focus:ring-rose-600"
                              defaultChecked={category === "All Categories"}
                            />
                            <label htmlFor={category} className="ml-2 text-sm text-neutral-600">
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Price Range</h3>
                      <Slider defaultValue={[0, 100]} max={200} step={1} className="py-4" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">$0</span>
                        <span className="text-sm font-medium">$200</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Rating</h3>
                      <div className="space-y-2">
                        {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                          <div key={rating} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`rating-${rating}`}
                              className="h-4 w-4 rounded border-neutral-300 text-rose-600 focus:ring-rose-600"
                            />
                            <label
                              htmlFor={`rating-${rating}`}
                              className="ml-2 text-sm text-neutral-600 flex items-center"
                            >
                              {rating}+
                              <div className="flex ml-1">
                                {Array(5)
                                  .fill(null)
                                  .map((_, i) => (
                                    <svg
                                      key={i}
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                      className={`w-3 h-3 ${i < Math.floor(rating) ? "text-amber-400" : "text-neutral-300"}`}
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  ))}
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Level</h3>
                      <div className="space-y-2">
                        {["Beginner", "Intermediate", "Advanced", "All Levels"].map((level) => (
                          <div key={level} className="flex items-center">
                            <input
                              type="checkbox"
                              id={level}
                              className="h-4 w-4 rounded border-neutral-300 text-rose-600 focus:ring-rose-600"
                            />
                            <label htmlFor={level} className="ml-2 text-sm text-neutral-600">
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
                    <h2 className="text-2xl font-bold tracking-tight text-neutral-900">All Courses</h2>
                    <p className="text-neutral-500">Showing {COURSES.length} results</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center">
                      <Tabs defaultValue="grid" className="w-full">
                        <TabsList className="bg-neutral-100">
                          <TabsTrigger value="grid" className="data-[state=active]:bg-white">
                            <LayoutGrid className="h-4 w-4" />
                          </TabsTrigger>
                          <TabsTrigger value="list" className="data-[state=active]:bg-white">
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
                    <div key={course.id}>
                      <div className="group h-full overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          {course.bestseller && (
                            <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                              Bestseller
                            </div>
                          )}
                        </div>
                        <div className="p-5">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-medium text-neutral-500">{course.category}</div>
                            <div className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 h-4 text-amber-400"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-sm font-medium ml-1">{course.rating}</span>
                            </div>
                          </div>

                          <h3 className="font-bold text-lg mb-2 line-clamp-2">
                            <Link href={`/courses/${course.id}`} className="hover:text-rose-600 transition-colors">
                              {course.title}
                            </Link>
                          </h3>

                          <p className="text-neutral-500 text-sm mb-4">By {course.instructor}</p>

                          <div className="flex items-center gap-4 text-xs text-neutral-600 mb-4">
                            <div>{course.hours} hours</div>
                            <div>{course.level}</div>
                            <div>{course.students.toLocaleString()} students</div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="font-bold text-lg">${course.price}</div>
                            <Button
                              size="sm"
                              className="rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                            >
                              Enroll Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
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
                            ? "bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
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

      <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-fuchsia-500 to-orange-500">
                  <span className="font-bold text-white text-xl">D</span>
                </div>
                <span className="font-bold text-xl text-white">DablieLearn</span>
              </Link>
              <p className="text-neutral-400 max-w-md mb-6">
                DablieLearn is an e-learning platform that helps you acquire new skills and knowledge through
                high-quality courses taught by industry experts.
              </p>
              <div className="flex space-x-4">{/* Social icons - similar to the footer component */}</div>
            </div>

            {/* Other footer sections - similar to the footer component */}
          </div>
        </div>
      </footer>
    </div>
  )
}
