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

// Placeholder courses data that matches your database schema
const PLACEHOLDER_COURSES = [
  {
    id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    title: "Complete Web Development Bootcamp",
    slug: "complete-web-development-bootcamp",
    description: "Master web development from scratch with HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and become a full-stack developer.",
    price: 89.99,
    level: "beginner",
    duration_hours: 42,
    image_url: "/placeholder.svg?height=400&width=600",
    is_published: true,
    is_bestseller: true,
    categories: { name: "Development", slug: "development", color: "from-sky-400 to-blue-600" },
    profiles: { full_name: "Sarah Johnson", avatar_url: null },
    created_at: new Date().toISOString()
  },
  {
    id: "b2c3d4e5-f6g7-8901-2345-678901bcdefg",
    title: "UI/UX Design Masterclass",
    slug: "ui-ux-design-masterclass",
    description: "Learn user interface and user experience design from industry experts. Master Figma, design systems, and create stunning user experiences.",
    price: 79.99,
    level: "intermediate",
    duration_hours: 38,
    image_url: "/placeholder.svg?height=400&width=600",
    is_published: true,
    is_bestseller: false,
    categories: { name: "Design", slug: "design", color: "from-purple-400 to-indigo-600" },
    profiles: { full_name: "Michael Chen", avatar_url: null },
    created_at: new Date().toISOString()
  },
  {
    id: "c3d4e5f6-g7h8-9012-3456-789012cdefgh",
    title: "Data Science & Machine Learning",
    slug: "data-science-machine-learning",
    description: "Comprehensive course covering Python, pandas, scikit-learn, and machine learning algorithms. Build predictive models and analyze data.",
    price: 94.99,
    level: "advanced",
    duration_hours: 56,
    image_url: "/placeholder.svg?height=400&width=600",
    is_published: true,
    is_bestseller: true,
    categories: { name: "Data Science", slug: "data-science", color: "from-emerald-400 to-teal-600" },
    profiles: { full_name: "Alex Rivera", avatar_url: null },
    created_at: new Date().toISOString()
  },
  {
    id: "d4e5f6g7-h8i9-0123-4567-890123defghi",
    title: "Digital Marketing Strategy",
    slug: "digital-marketing-strategy",
    description: "Learn modern digital marketing techniques including SEO, social media marketing, content marketing, and paid advertising strategies.",
    price: 69.99,
    level: "beginner",
    duration_hours: 32,
    image_url: "/placeholder.svg?height=400&width=600",
    is_published: true,
    is_bestseller: false,
    categories: { name: "Marketing", slug: "marketing", color: "from-amber-400 to-orange-600" },
    profiles: { full_name: "Emma Phillips", avatar_url: null },
    created_at: new Date().toISOString()
  },
  {
    id: "e5f6g7h8-i9j0-1234-5678-901234efghij",
    title: "Full-Stack Mobile App Development",
    slug: "full-stack-mobile-app-development",
    description: "Build cross-platform mobile apps with React Native. Learn backend development, API integration, and app store deployment.",
    price: 99.99,
    level: "intermediate",
    duration_hours: 48,
    image_url: "/placeholder.svg?height=400&width=600",
    is_published: true,
    is_bestseller: true,
    categories: { name: "Development", slug: "development", color: "from-sky-400 to-blue-600" },
    profiles: { full_name: "David Kumar", avatar_url: null },
    created_at: new Date().toISOString()
  },
  {
    id: "f6g7h8i9-j0k1-2345-6789-012345fghijk",
    title: "Business Finance & Accounting",
    slug: "business-finance-accounting",
    description: "Master business finance fundamentals, accounting principles, financial analysis, and budgeting for entrepreneurs and professionals.",
    price: 74.99,
    level: "beginner",
    duration_hours: 35,
    image_url: "/placeholder.svg?height=400&width=600",
    is_published: true,
    is_bestseller: false,
    categories: { name: "Business", slug: "business", color: "from-red-400 to-rose-600" },
    profiles: { full_name: "Lisa Wong", avatar_url: null },
    created_at: new Date().toISOString()
  },
  {
    id: "g7h8i9j0-k1l2-3456-7890-123456ghijkl",
    title: "Advanced React Development",
    slug: "advanced-react-development",
    description: "Deep dive into React ecosystem with hooks, context, performance optimization, testing, and modern development patterns.",
    price: 84.99,
    level: "advanced",
    duration_hours: 40,
    image_url: "/placeholder.svg?height=400&width=600",
    is_published: true,
    is_bestseller: false,
    categories: { name: "Development", slug: "development", color: "from-sky-400 to-blue-600" },
    profiles: { full_name: "Sarah Johnson", avatar_url: null },
    created_at: new Date().toISOString()
  },
  {
    id: "h8i9j0k1-l2m3-4567-8901-234567hijklm",
    title: "Graphic Design Fundamentals",
    slug: "graphic-design-fundamentals",
    description: "Learn the principles of graphic design, typography, color theory, and master Adobe Creative Suite for professional design work.",
    price: 59.99,
    level: "beginner",
    duration_hours: 28,
    image_url: "/placeholder.svg?height=400&width=600",
    is_published: true,
    is_bestseller: false,
    categories: { name: "Design", slug: "design", color: "from-purple-400 to-indigo-600" },
    profiles: { full_name: "Emily Rodriguez", avatar_url: null },
    created_at: new Date().toISOString()
  },
  {
    id: "i9j0k1l2-m3n4-5678-9012-345678ijklmn",
    title: "Python for Data Analysis",
    slug: "python-data-analysis",
    description: "Master Python programming for data analysis with pandas, NumPy, matplotlib, and Jupyter notebooks. Perfect for beginners.",
    price: 64.99,
    level: "beginner",
    duration_hours: 30,
    image_url: "/placeholder.svg?height=400&width=600",
    is_published: true,
    is_bestseller: false,
    categories: { name: "Data Science", slug: "data-science", color: "from-emerald-400 to-teal-600" },
    profiles: { full_name: "Dr. James Wilson", avatar_url: null },
    created_at: new Date().toISOString()
  },
  {
    id: "j0k1l2m3-n4o5-6789-0123-456789jklmno",
    title: "Social Media Marketing Mastery",
    slug: "social-media-marketing-mastery",
    description: "Complete guide to social media marketing across all platforms. Learn content creation, audience building, and conversion strategies.",
    price: 54.99,
    level: "intermediate",
    duration_hours: 25,
    image_url: "/placeholder.svg?height=400&width=600",
    is_published: true,
    is_bestseller: false,
    categories: { name: "Marketing", slug: "marketing", color: "from-amber-400 to-orange-600" },
    profiles: { full_name: "Maria Garcia", avatar_url: null },
    created_at: new Date().toISOString()
  },
  {
    id: "k1l2m3n4-o5p6-7890-1234-567890klmnop",
    title: "Entrepreneurship Essentials",
    slug: "entrepreneurship-essentials",
    description: "Learn how to start and grow a successful business. Covers business planning, funding, marketing, and scaling strategies.",
    price: 79.99,
    level: "beginner",
    duration_hours: 36,
    image_url: "/placeholder.svg?height=400&width=600",
    is_published: true,
    is_bestseller: false,
    categories: { name: "Business", slug: "business", color: "from-red-400 to-rose-600" },
    profiles: { full_name: "Robert Chen", avatar_url: null },
    created_at: new Date().toISOString()
  },
  {
    id: "l2m3n4o5-p6q7-8901-2345-678901lmnopq",
    title: "Digital Illustration with Procreate",
    slug: "digital-illustration-procreate",
    description: "Create stunning digital artwork on iPad with Procreate. Learn drawing techniques, character design, and digital painting.",
    price: 49.99,
    level: "beginner",
    duration_hours: 22,
    image_url: "/placeholder.svg?height=400&width=600",
    is_published: true,
    is_bestseller: false,
    categories: { name: "Illustration", slug: "illustration", color: "from-fuchsia-400 to-pink-600" },
    profiles: { full_name: "Anna Kim", avatar_url: null },
    created_at: new Date().toISOString()
  }
]

const PLACEHOLDER_CATEGORIES = [
  { id: "1", name: "Development", slug: "development" },
  { id: "2", name: "Design", slug: "design" },
  { id: "3", name: "Marketing", slug: "marketing" },
  { id: "4", name: "Data Science", slug: "data-science" },
  { id: "5", name: "Business", slug: "business" },
  { id: "6", name: "Illustration", slug: "illustration" }
]

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
      // Try to load from Supabase first
      const [coursesResult, categoriesResult] = await Promise.all([
        courses.getPublishedCourses(),
        categories.getCategories()
      ])

      if (coursesResult.data && coursesResult.data.length > 0) {
        setAllCourses(coursesResult.data)
      } else {
        // Fallback to placeholder data
        console.log('Using placeholder courses data')
        setAllCourses(PLACEHOLDER_COURSES)
      }

      if (categoriesResult.data && categoriesResult.data.length > 0) {
        setAllCategories(categoriesResult.data)
      } else {
        // Fallback to placeholder data
        console.log('Using placeholder categories data')
        setAllCategories(PLACEHOLDER_CATEGORIES)
      }
    } catch (error) {
      console.error('Error loading data, using placeholder:', error)
      // Fallback to placeholder data on error
      setAllCourses(PLACEHOLDER_COURSES)
      setAllCategories(PLACEHOLDER_CATEGORIES)
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
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
            <p>Loading courses...</p>
          </div>
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
                        {Math.floor(Math.random() * 5000) + 1000} students
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