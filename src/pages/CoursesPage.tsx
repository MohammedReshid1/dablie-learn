import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { PageLayout } from "@/components/page-layout"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Star, Users, Clock, Share2 } from "lucide-react"
import { courses, categories } from "@/lib/courses"
import { motion } from "framer-motion"

export default function CoursesPage() {
  const [allCourses, setAllCourses] = useState<any[]>([])
  const [filteredCourses, setFilteredCourses] = useState<any[]>([])
  const [allCategories, setAllCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    filterCourses()
  }, [allCourses, searchTerm, selectedCategory, selectedLevel, sortBy])

  const loadData = async () => {
    try {
      const [coursesResult, categoriesResult] = await Promise.all([
        courses.getPublishedCourses(),
        categories.getCategories()
      ])

      if (coursesResult.data) setAllCourses(coursesResult.data)
      if (categoriesResult.data) setAllCategories(categoriesResult.data)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterCourses = () => {
    let filtered = [...allCourses]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(course => course.categories?.slug === selectedCategory)
    }

    // Level filter
    if (selectedLevel !== "all") {
      filtered = filtered.filter(course => course.level === selectedLevel)
    }

    // Sort
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case "price-low":
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0))
        break
      case "price-high":
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0))
        break
      case "duration":
        filtered.sort((a, b) => (b.duration_hours || 0) - (a.duration_hours || 0))
        break
    }

    setFilteredCourses(filtered)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header activeLink="Explore" />
        <div className="container py-8">
          <div className="text-center">Loading courses...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header activeLink="Explore" />
      <main className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Explore Courses</h1>
          <p className="text-muted-foreground">Discover thousands of courses to advance your skills</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="all">All Categories</option>
              {allCategories.map(category => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="duration">Duration</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            Showing {filteredCourses.length} of {allCourses.length} courses
          </p>
        </div>

        {/* Course Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No courses found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden group flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={course.image_url || "/placeholder.svg?height=400&width=600"}
                      alt={course.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {course.is_bestseller && (
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 border-none">
                        Bestseller
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-5 flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {course.categories?.name}
                      </Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                        <span className="text-sm font-medium">4.8</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">
                      <Link to={`/courses/${course.id}`} className="hover:text-rose-600 transition-colors">
                        {course.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      By {course.profiles?.full_name}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        1,234 students
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {course.duration_hours} hours
                      </div>
                      <div className="line-clamp-1 capitalize">{course.level}</div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-5 pt-0 flex items-center justify-between">
                    <div className="font-bold text-xl">${course.price}</div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary">
                        <Share2 className="h-5 w-5" />
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        className="rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                      >
                        <Link to={`/courses/${course.id}`}>View Course</Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}