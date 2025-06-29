import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { PageLayout } from "@/components/page-layout"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Clock, Share2, Code, Palette, Megaphone, LineChart, Lightbulb, PenTool } from "lucide-react"
import { courses, categories } from "@/lib/courses"
import { motion } from "framer-motion"

const iconMap = {
  Code,
  Palette,
  Megaphone,
  LineChart,
  Lightbulb,
  PenTool,
}

// Placeholder data for when database is not available
const PLACEHOLDER_CATEGORY_COURSES = {
  development: [
    {
      id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      title: "Complete Web Development Bootcamp",
      slug: "complete-web-development-bootcamp",
      description: "Master web development from scratch with HTML, CSS, JavaScript, React, Node.js, and more.",
      price: 89.99,
      level: "beginner",
      duration_hours: 42,
      image_url: "/placeholder.svg?height=400&width=600",
      is_published: true,
      is_bestseller: true,
      profiles: { full_name: "Sarah Johnson" }
    },
    {
      id: "e5f6g7h8-i9j0-1234-5678-901234efghij",
      title: "Full-Stack Mobile App Development",
      slug: "full-stack-mobile-app-development",
      description: "Build cross-platform mobile apps with React Native.",
      price: 99.99,
      level: "intermediate",
      duration_hours: 48,
      image_url: "/placeholder.svg?height=400&width=600",
      is_published: true,
      is_bestseller: true,
      profiles: { full_name: "David Kumar" }
    },
    {
      id: "g7h8i9j0-k1l2-3456-7890-123456ghijkl",
      title: "Advanced React Development",
      slug: "advanced-react-development",
      description: "Deep dive into React ecosystem with hooks, context, and performance optimization.",
      price: 84.99,
      level: "advanced",
      duration_hours: 40,
      image_url: "/placeholder.svg?height=400&width=600",
      is_published: true,
      is_bestseller: false,
      profiles: { full_name: "Sarah Johnson" }
    }
  ],
  design: [
    {
      id: "b2c3d4e5-f6g7-8901-2345-678901bcdefg",
      title: "UI/UX Design Masterclass",
      slug: "ui-ux-design-masterclass",
      description: "Learn user interface and user experience design from industry experts.",
      price: 79.99,
      level: "intermediate",
      duration_hours: 38,
      image_url: "/placeholder.svg?height=400&width=600",
      is_published: true,
      is_bestseller: false,
      profiles: { full_name: "Michael Chen" }
    },
    {
      id: "h8i9j0k1-l2m3-4567-8901-234567hijklm",
      title: "Graphic Design Fundamentals",
      slug: "graphic-design-fundamentals",
      description: "Learn the principles of graphic design, typography, and color theory.",
      price: 59.99,
      level: "beginner",
      duration_hours: 28,
      image_url: "/placeholder.svg?height=400&width=600",
      is_published: true,
      is_bestseller: false,
      profiles: { full_name: "Emily Rodriguez" }
    }
  ],
  marketing: [
    {
      id: "d4e5f6g7-h8i9-0123-4567-890123defghi",
      title: "Digital Marketing Strategy",
      slug: "digital-marketing-strategy",
      description: "Learn modern digital marketing techniques including SEO and social media.",
      price: 69.99,
      level: "beginner",
      duration_hours: 32,
      image_url: "/placeholder.svg?height=400&width=600",
      is_published: true,
      is_bestseller: false,
      profiles: { full_name: "Emma Phillips" }
    },
    {
      id: "j0k1l2m3-n4o5-6789-0123-456789jklmno",
      title: "Social Media Marketing Mastery",
      slug: "social-media-marketing-mastery",
      description: "Complete guide to social media marketing across all platforms.",
      price: 54.99,
      level: "intermediate",
      duration_hours: 25,
      image_url: "/placeholder.svg?height=400&width=600",
      is_published: true,
      is_bestseller: false,
      profiles: { full_name: "Maria Garcia" }
    }
  ],
  "data-science": [
    {
      id: "c3d4e5f6-g7h8-9012-3456-789012cdefgh",
      title: "Data Science & Machine Learning",
      slug: "data-science-machine-learning",
      description: "Comprehensive course covering Python, pandas, and machine learning algorithms.",
      price: 94.99,
      level: "advanced",
      duration_hours: 56,
      image_url: "/placeholder.svg?height=400&width=600",
      is_published: true,
      is_bestseller: true,
      profiles: { full_name: "Alex Rivera" }
    },
    {
      id: "i9j0k1l2-m3n4-5678-9012-345678ijklmn",
      title: "Python for Data Analysis",
      slug: "python-data-analysis",
      description: "Master Python programming for data analysis with pandas and NumPy.",
      price: 64.99,
      level: "beginner",
      duration_hours: 30,
      image_url: "/placeholder.svg?height=400&width=600",
      is_published: true,
      is_bestseller: false,
      profiles: { full_name: "Dr. James Wilson" }
    }
  ],
  business: [
    {
      id: "f6g7h8i9-j0k1-2345-6789-012345fghijk",
      title: "Business Finance & Accounting",
      slug: "business-finance-accounting",
      description: "Master business finance fundamentals and accounting principles.",
      price: 74.99,
      level: "beginner",
      duration_hours: 35,
      image_url: "/placeholder.svg?height=400&width=600",
      is_published: true,
      is_bestseller: false,
      profiles: { full_name: "Lisa Wong" }
    },
    {
      id: "k1l2m3n4-o5p6-7890-1234-567890klmnop",
      title: "Entrepreneurship Essentials",
      slug: "entrepreneurship-essentials",
      description: "Learn how to start and grow a successful business.",
      price: 79.99,
      level: "beginner",
      duration_hours: 36,
      image_url: "/placeholder.svg?height=400&width=600",
      is_published: true,
      is_bestseller: false,
      profiles: { full_name: "Robert Chen" }
    }
  ],
  illustration: [
    {
      id: "l2m3n4o5-p6q7-8901-2345-678901lmnopq",
      title: "Digital Illustration with Procreate",
      slug: "digital-illustration-procreate",
      description: "Create stunning digital artwork on iPad with Procreate.",
      price: 49.99,
      level: "beginner",
      duration_hours: 22,
      image_url: "/placeholder.svg?height=400&width=600",
      is_published: true,
      is_bestseller: false,
      profiles: { full_name: "Anna Kim" }
    }
  ]
}

const PLACEHOLDER_CATEGORIES = {
  development: {
    id: "cat-1",
    name: "Development",
    slug: "development",
    description: "Web, mobile, and software development courses for all skill levels",
    icon: "Code",
    color: "from-sky-400 to-blue-600"
  },
  design: {
    id: "cat-2",
    name: "Design",
    slug: "design",
    description: "Graphic design, UI/UX, and creative courses to build your skills",
    icon: "Palette",
    color: "from-purple-400 to-indigo-600"
  },
  marketing: {
    id: "cat-3",
    name: "Marketing",
    slug: "marketing",
    description: "Digital marketing strategies to grow your business and audience",
    icon: "Megaphone",
    color: "from-amber-400 to-orange-600"
  },
  "data-science": {
    id: "cat-4",
    name: "Data Science",
    slug: "data-science",
    description: "Learn to analyze data and build machine learning models",
    icon: "LineChart",
    color: "from-emerald-400 to-teal-600"
  },
  business: {
    id: "cat-5",
    name: "Business",
    slug: "business",
    description: "Entrepreneurship, management, and business strategy courses",
    icon: "Lightbulb",
    color: "from-red-400 to-rose-600"
  },
  illustration: {
    id: "cat-6",
    name: "Illustration",
    slug: "illustration",
    description: "Digital art, drawing, and creative illustration techniques",
    icon: "PenTool",
    color: "from-fuchsia-400 to-pink-600"
  }
}

export default function CategoryDetailPage() {
  const { slug } = useParams()
  const [category, setCategory] = useState<any>(null)
  const [categoryCourses, setCategoryCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      loadCategoryData()
    }
  }, [slug])

  const loadCategoryData = async () => {
    if (!slug) return

    try {
      const [categoryResult, coursesResult] = await Promise.all([
        categories.getCategoryBySlug(slug),
        courses.getCoursesByCategory(slug)
      ])

      if (categoryResult.data) {
        setCategory(categoryResult.data)
      } else {
        // Fallback to placeholder data
        const placeholderCategory = PLACEHOLDER_CATEGORIES[slug as keyof typeof PLACEHOLDER_CATEGORIES]
        if (placeholderCategory) {
          setCategory(placeholderCategory)
        }
      }

      if (coursesResult.data && coursesResult.data.length > 0) {
        setCategoryCourses(coursesResult.data)
      } else {
        // Fallback to placeholder data
        const placeholderCourses = PLACEHOLDER_CATEGORY_COURSES[slug as keyof typeof PLACEHOLDER_CATEGORY_COURSES]
        if (placeholderCourses) {
          setCategoryCourses(placeholderCourses)
        } else {
          setCategoryCourses([])
        }
      }
    } catch (error) {
      console.error('Error loading category data, using placeholder:', error)
      // Fallback to placeholder data on error
      const placeholderCategory = PLACEHOLDER_CATEGORIES[slug as keyof typeof PLACEHOLDER_CATEGORIES]
      const placeholderCourses = PLACEHOLDER_CATEGORY_COURSES[slug as keyof typeof PLACEHOLDER_CATEGORY_COURSES]
      
      if (placeholderCategory) {
        setCategory(placeholderCategory)
      }
      if (placeholderCourses) {
        setCategoryCourses(placeholderCourses)
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header activeLink="Categories" />
        <div className="container py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
            <p>Loading category...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header activeLink="Categories" />
        <div className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
            <Button asChild>
              <Link to="/categories">Back to Categories</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Code

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header activeLink="Categories" />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-rose-50 to-orange-50 dark:from-neutral-900 dark:to-neutral-800 py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <div
                  className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br ${category.color} p-6 shadow-lg`}
                >
                  <IconComponent className="h-12 w-12 text-white" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {category.name} Courses
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                {category.description}
              </p>

              <div className="flex flex-wrap justify-center gap-8 text-sm">
                <div className="text-center">
                  <div className="font-bold text-2xl">{categoryCourses.length}</div>
                  <div className="text-muted-foreground">Courses</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl">50+</div>
                  <div className="text-muted-foreground">Instructors</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl">10k+</div>
                  <div className="text-muted-foreground">Students</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Available Courses</h2>
                <p className="text-muted-foreground">
                  {categoryCourses.length} courses to help you master {category.name.toLowerCase()}
                </p>
              </div>
              
              <div className="flex gap-2">
                <select className="px-3 py-2 border rounded-md bg-background text-sm">
                  <option>All Levels</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
                <select className="px-3 py-2 border rounded-md bg-background text-sm">
                  <option>Sort by: Newest</option>
                  <option>Sort by: Popular</option>
                  <option>Sort by: Price</option>
                </select>
              </div>
            </div>

            {categoryCourses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No courses available in this category yet.
                </p>
                <Button asChild>
                  <Link to="/courses">Browse All Courses</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryCourses.map((course, index) => (
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
                          <Badge variant="outline" className="text-xs capitalize">
                            {course.level}
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
          </div>
        </section>

        {/* Learning Path Section */}
        <section className="py-16 bg-muted">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Recommended Learning Path for {category.name}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Follow this structured path to master {category.name.toLowerCase()} from beginner to advanced level.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    step: "1",
                    title: "Foundation",
                    description: "Start with the basics and build a solid foundation",
                    duration: "2-4 weeks",
                    courses: "3-5 courses"
                  },
                  {
                    step: "2", 
                    title: "Intermediate",
                    description: "Dive deeper into advanced concepts and techniques",
                    duration: "4-6 weeks",
                    courses: "4-6 courses"
                  },
                  {
                    step: "3",
                    title: "Advanced",
                    description: "Master expert-level skills and real-world projects",
                    duration: "6-8 weeks", 
                    courses: "3-4 courses"
                  }
                ].map((phase, index) => (
                  <Card key={index} className="relative">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                        {phase.step}
                      </div>
                      <h3 className="font-bold text-lg mb-2">{phase.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{phase.description}</p>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div>{phase.duration}</div>
                        <div>{phase.courses}</div>
                      </div>
                    </CardContent>
                    {index < 2 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-6 bg-background border-2 border-muted rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full"></div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600">
                  Start Learning Path
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}