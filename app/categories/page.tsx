import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Code, LineChart, Lightbulb, Megaphone, Palette, PenTool } from "lucide-react"
import { PageLayout } from "@/components/page-layout"

export default function CategoriesPage() {
  const CATEGORIES = [
    {
      name: "Development",
      icon: Code,
      color: "from-sky-400 to-blue-600",
      courses: 425,
      description: "Web, mobile, and software development courses for all skill levels",
      popular: ["JavaScript", "React", "Python", "Node.js"],
    },
    {
      name: "Design",
      icon: Palette,
      color: "from-purple-400 to-indigo-600",
      courses: 310,
      description: "Graphic design, UI/UX, and creative courses to build your skills",
      popular: ["UI/UX", "Figma", "Adobe XD", "Graphic Design"],
    },
    {
      name: "Marketing",
      icon: Megaphone,
      color: "from-amber-400 to-orange-600",
      courses: 285,
      description: "Digital marketing strategies to grow your business and audience",
      popular: ["SEO", "Social Media", "Content Marketing", "Analytics"],
    },
    {
      name: "Data Science",
      icon: LineChart,
      color: "from-emerald-400 to-teal-600",
      courses: 195,
      description: "Learn to analyze data and build machine learning models",
      popular: ["Python", "Machine Learning", "SQL", "Data Visualization"],
    },
    {
      name: "Business",
      icon: Lightbulb,
      color: "from-red-400 to-rose-600",
      courses: 350,
      description: "Entrepreneurship, management, and business strategy courses",
      popular: ["Entrepreneurship", "Finance", "Management", "Strategy"],
    },
    {
      name: "Illustration",
      icon: PenTool,
      color: "from-fuchsia-400 to-pink-600",
      courses: 220,
      description: "Digital art, drawing, and creative illustration techniques",
      popular: ["Digital Art", "Character Design", "Procreate", "Digital Painting"],
    },
  ]

  return (
    <PageLayout>
      <main className="flex-1">
        <section className="py-12 bg-gradient-to-r from-rose-50 to-orange-50 dark:from-neutral-900 dark:to-neutral-800">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
                Browse All{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                  Categories
                </span>
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-8">
                Explore our diverse range of categories to find the perfect courses for your learning journey.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES.map((category) => (
                <Link key={category.name} href={`/categories/${category.name.toLowerCase()}`}>
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow group bg-card border-border">
                    <CardContent className="p-6">
                      <div className="mb-6">
                        <div
                          className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} p-3 shadow-lg`}
                        >
                          <category.icon className="h-8 w-8 text-white" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-xl text-foreground">{category.name}</h3>
                          <span className="text-sm font-medium text-muted-foreground">{category.courses} courses</span>
                        </div>

                        <p className="text-muted-foreground line-clamp-2">{category.description}</p>

                        <div className="pt-4">
                          <h4 className="text-sm font-medium text-foreground mb-2">Popular Topics:</h4>
                          <div className="flex flex-wrap gap-2">
                            {category.popular.map((topic) => (
                              <span
                                key={topic}
                                className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground group-hover:bg-secondary/80 transition-colors"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
