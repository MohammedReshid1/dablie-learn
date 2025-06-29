"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Code, LineChart, Lightbulb, Megaphone, Palette, PenTool } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

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

export function Categories() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const scrollAmount = container.clientWidth * 0.8

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <section className="py-20 bg-muted">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Browse by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                Category
              </span>
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              Explore our diverse range of categories to find the perfect courses for your learning journey.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="icon" className="rounded-full" onClick={() => scroll("left")}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" onClick={() => scroll("right")}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-6 pb-6 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide"
        >
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] snap-start"
            >
              <Link to={`/categories/${category.name.toLowerCase()}`}>
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow group">
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
                        <h3 className="font-bold text-xl">{category.name}</h3>
                        <span className="text-sm font-medium text-muted-foreground">{category.courses} courses</span>
                      </div>

                      <p className="text-muted-foreground line-clamp-2">{category.description}</p>

                      <div className="pt-4">
                        <h4 className="text-sm font-medium text-foreground mb-2">Popular Topics:</h4>
                        <div className="flex flex-wrap gap-2">
                          {category.popular.map((topic) => (
                            <span
                              key={topic}
                              className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground group-hover:bg-secondary/80 transition-colors"
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
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
          >
            <Link to="/categories">Explore All Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}