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

export default function CategoriesPage() {
  const [allCategories, setAllCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const { data, error } = await categories.getCategories()
      if (data && !error) {
        setAllCategories(data)
      }
    } catch (error) {
      console.error('Error loading categories:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header activeLink="Categories" />
        <div className="container py-8">
          <div className="text-center">Loading categories...</div>
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
                        150+ courses available
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
                level: "Beginner to Advanced"
              },
              {
                title: "Data Science & Analytics",
                description: "Learn to analyze data and build ML models",
                courses: "8 courses", 
                duration: "4 months",
                level: "Intermediate"
              },
              {
                title: "Digital Marketing Mastery",
                description: "Complete guide to modern marketing strategies",
                courses: "10 courses",
                duration: "3 months", 
                level: "Beginner"
              }
            ].map((path, index) => (
              <Card key={index} className="bg-background">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{path.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{path.description}</p>
                  <div className="space-y-1 text-xs text-muted-foreground mb-4">
                    <div>{path.courses}</div>
                    <div>{path.duration}</div>
                    <div>{path.level}</div>
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