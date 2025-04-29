import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, Users, Clock } from "lucide-react"
import { use } from "react"
import { Badge } from "@/components/ui/badge"

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap params using React.use()
  const resolvedParams = use(params)

  // In a real app, you would fetch courses based on the category slug
  const categoryName = resolvedParams.slug.charAt(0).toUpperCase() + resolvedParams.slug.slice(1)

  // Sample course data for this category
  const COURSES = Array(9)
    .fill(null)
    .map((_, i) => ({
      id: `course-${i + 1}`,
      title: [
        `Complete ${categoryName} Bootcamp`,
        `${categoryName} Masterclass`,
        `Advanced ${categoryName} Techniques`,
        `${categoryName} for Beginners`,
        `Professional ${categoryName} Skills`,
        `${categoryName} Certification Course`,
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
      bestseller: i % 3 === 0,
    }))

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-fuchsia-500 to-orange-500">
              <span className="font-bold text-primary-foreground text-xl">D</span>
            </div>
            <span className="font-bold text-xl text-foreground">DablieLearn</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/courses"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Explore
            </Link>
            <Link href="/categories" className="text-sm font-medium text-primary">
              Categories
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/teach"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Teach
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground">
              Log in
            </Link>
            <Button asChild className="rounded-full">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        <section className="py-12 bg-gradient-to-r from-primary/10 via-background to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
                {categoryName}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
                  Courses
                </span>
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Master {categoryName.toLowerCase()} skills with our expert-led courses. From beginner to advanced
                levels.
              </p>
              <div className="relative max-w-xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder={`Search for ${categoryName.toLowerCase()} courses...`}
                  className="pl-10 py-3 h-12 rounded-full border-border shadow-sm text-base bg-input text-foreground placeholder:text-muted-foreground"
                />
                <Button className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full h-9 px-4">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-background">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-64 shrink-0">
                <div className="sticky top-24 bg-card p-6 rounded-xl border border-border shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-foreground">Filters</h2>
                    <Button variant="link" size="sm" className="text-primary p-0 h-auto">
                      Reset
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3 text-foreground">Price Range</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">$0</span>
                        <span className="text-sm font-medium text-muted-foreground">$200</span>
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
                              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                            />
                            <label
                              htmlFor={`rating-${rating}`}
                              className="ml-2 text-sm text-muted-foreground flex items-center"
                            >
                              {rating}+
                              <div className="flex ml-1">
                                {Array(5)
                                  .fill(null)
                                  .map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3 h-3 ${i < Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-muted-foreground/50"}`}
                                    />
                                  ))}
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
                              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                            />
                            <label htmlFor={level} className="ml-2 text-sm text-muted-foreground">
                              {level}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full">
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">{categoryName} Courses</h2>
                    <p className="text-muted-foreground">Showing {COURSES.length} results</p>
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {COURSES.map((course) => (
                    <div key={course.id}>
                      <div className="group h-full overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          {course.bestseller && (
                            <Badge className="absolute top-3 left-3">Bestseller</Badge>
                          )}
                        </div>
                        <div className="p-5">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-medium text-muted-foreground">{categoryName}</div>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                              <span className="text-sm font-medium text-foreground ml-1">{course.rating}</span>
                            </div>
                          </div>

                          <h3 className="font-bold text-lg mb-2 line-clamp-2">
                            <Link href={`/courses/${course.id}`} className="text-foreground hover:text-primary transition-colors">
                              {course.title}
                            </Link>
                          </h3>

                          <p className="text-muted-foreground text-sm mb-4">By {course.instructor}</p>

                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {course.hours} hours
                            </div>
                            <div>{course.level}</div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {course.students.toLocaleString()}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="font-bold text-lg text-foreground">${course.price}</div>
                            <Button size="sm" className="rounded-full">
                              Enroll Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted text-muted-foreground pt-16 pb-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-fuchsia-500 to-orange-500">
                  <span className="font-bold text-primary-foreground text-xl">D</span>
                </div>
                <span className="font-bold text-xl text-foreground">DablieLearn</span>
              </Link>
              <p className="text-muted-foreground max-w-md mb-6">
                DablieLearn is an e-learning platform that helps you acquire new skills and knowledge through
                high-quality courses taught by industry experts.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-foreground mb-4">Categories</h3>
              <ul className="space-y-3">
                {["Development", "Design", "Marketing", "Business", "Data Science", "Illustration"].map((category) => (
                  <li key={category}>
                    <Link
                      href={`/categories/${category.toLowerCase()}`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-foreground mb-4">Company</h3>
              <ul className="space-y-3">
                {["About Us", "Careers", "Press", "Blog", "Affiliates", "Partnerships"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-foreground mb-4">Support</h3>
              <ul className="space-y-3">
                {[
                  "Help Center",
                  "Contact Us",
                  "Terms of Service",
                  "Privacy Policy",
                  "Accessibility",
                  "Cookie Settings",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} DablieLearn. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
