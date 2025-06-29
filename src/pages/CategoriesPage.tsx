import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { PageLayout } from "@/components/page-layout"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, LineChart, Lightbulb, Megaphone, Palette, PenTool } from "lucide-react"
import { categories } from "@/lib/courses"
import { motion } from "framer-motion"

const iconMap = {
  Code,
  Palette,
  Megaphone,
  LineChart,
  Lightbulb,
  PenTool,
}

// Placeholder categories data that matches your database schema
const PLACEHOLDER_CATEGORIES = [
  {
    id: "cat-1",
    name: "Development",
    slug: "development",
    description: "Web, mobile, and software development courses for all skill levels",
    icon: "Code",
    color: "from-sky-400 to-blue-600",
    created_at: new Date().toISOString(),
    course_count: 425
  },
  {
    id: "cat-2",
    name: "Design",
    slug: "design",
    description: "Graphic design, UI/UX, and creative courses to build your skills",
    icon: "Palette",
    color: "from-purple-400 to-indigo-600",
    created_at: new Date().toISOString(),
    course_count: 310
  },
  {
    id: "cat-3",
    name: "Marketing",
    slug: "marketing",
    description: "Digital marketing strategies to grow your business and audience",
    icon: "Megaphone",
    color: "from-amber-400 to-orange-600",
    created_at: new Date().toISOString(),
    course_count: 285
  },
  {
    id: "cat-4",
    name: "Data Science",
    slug: "data-science",
    description: "Learn to analyze data and build machine learning models",
    icon: "LineChart",
    color: "from-emerald-400 to-teal-600",
    created_at: new Date().toISOString(),
    course_count: 195
  },
  {
    id: "cat-5",
    name: "Business",
    slug: "business",
    description: "Entrepreneurship, management, and business strategy courses",
    icon: "Lightbulb",
    color: "from-red-400 to-rose-600",
    created_at: new Date().toISOString(),
    course_count: 350
  },
  {
    id: "cat-6",
    name: "Illustration",
    slug: "illustration",
    description: "Digital art, drawing, and creative illustration techniques",
    icon: "PenTool",
    color: "from-fuchsia-400 to-pink-600",
    created_at: new Date().toISOString(),
    course_count: 220
  }
]

export default function CategoriesPage() {
  const [allCategories, setAllCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const { data, error } = await categories.getCategories()
      if (data && data.length > 0) {
        // Add course counts and ensure proper structure
        const categoriesWithCounts = data.map(category => ({
          ...category,
          course_count: Math.floor(Math.random() * 400) + 100, // Random count for demo
          icon: category.icon || 'Code' // Default icon if not set
        }))
        setAllCategories(categoriesWithCounts)
      } else {
        // Fallback to placeholder data
        console.log('Using placeholder categories data')
        setAllCategories(PLACEHOLDER_CATEGORIES)
      }
    } catch (error) {
      console.error('Error loading categories, using placeholder:', error)
      // Fallback to placeholder data on error
      setAllCategories(PLACEHOLDER_CATEGORIES)
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
            <p>Loading categories...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header activeLink="Categories" />
      <main className="container py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Explore by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
              Category
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover courses across various fields and find the perfect learning path for your goals.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {allCategories.map((category, index) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Code
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/categories/${category.slug}`}>
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 group border-2 hover:border-rose-200 dark:hover:border-rose-800">
                    <CardContent className="p-8 text-center">
                      <div className="mb-6">
                        <div
                          className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${category.color} p-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <IconComponent className="h-10 w-10 text-white" />
                        </div>
                      </div>

                      <h3 className="font-bold text-2xl mb-3 group-hover:text-rose-600 transition-colors">
                        {category.name}
                      </h3>
                      
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {category.description}
                      </p>

                      <div className="text-sm font-medium text-muted-foreground mb-4">
                        {category.course_count}+ courses available
                      </div>

                      <Button 
                        variant="outline" 
                        className="group-hover:bg-gradient-to-r group-hover:from-rose-500 group-hover:to-orange-500 group-hover:text-white group-hover:border-transparent transition-all duration-300"
                      >
                        Explore Courses
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Popular Topics Section */}
        <div className="bg-muted rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Popular Learning Paths</h2>
            <p className="text-muted-foreground">
              Structured learning journeys to help you master specific skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Full-Stack Web Development",
                description: "Master both frontend and backend development",
                courses: "12 courses",
                duration: "6 months",
                level: "Beginner to Advanced",
                category: "Development"
              },
              {
                title: "Data Science & Analytics",
                description: "Learn to analyze data and build ML models",
                courses: "8 courses", 
                duration: "4 months",
                level: "Intermediate",
                category: "Data Science"
              },
              {
                title: "Digital Marketing Mastery",
                description: "Complete guide to modern marketing strategies",
                courses: "10 courses",
                duration: "3 months", 
                level: "Beginner",
                category: "Marketing"
              },
              {
                title: "UI/UX Design Professional",
                description: "From wireframes to prototypes and user testing",
                courses: "9 courses",
                duration: "5 months",
                level: "Beginner to Advanced",
                category: "Design"
              },
              {
                title: "Business Leadership",
                description: "Develop leadership and management skills",
                courses: "7 courses",
                duration: "3 months",
                level: "Intermediate",
                category: "Business"
              },
              {
                title: "Digital Art & Illustration",
                description: "Master digital drawing and illustration techniques",
                courses: "6 courses",
                duration: "4 months",
                level: "Beginner",
                category: "Illustration"
              }
            ].map((path, index) => (
              <Card key={index} className="bg-background">
                <CardContent className="p-6">
                  <div className="mb-3">
                    <span className="text-xs font-medium text-rose-600 bg-rose-100 dark:bg-rose-900/20 px-2 py-1 rounded-full">
                      {path.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{path.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{path.description}</p>
                  <div className="space-y-1 text-xs text-muted-foreground mb-4">
                    <div>📚 {path.courses}</div>
                    <div>⏱️ {path.duration}</div>
                    <div>📊 {path.level}</div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Start Learning Path
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}