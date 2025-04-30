"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Clock, Share2, Star, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import type { Course } from "@/lib/types"
import { CourseCard } from "@/components/course-card"

// Sample course data - Restore specific image placeholders
const COURSES: Course[] = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    image: "/placeholder.svg?height=400&width=600",
    price: 89.99,
    rating: 4.8,
    students: 15234,
    hours: 42,
    level: "Beginner to Advanced",
    category: "Development",
    bestseller: true,
  },
  {
    id: "2",
    title: "UI/UX Design Masterclass",
    instructor: "Michael Chen",
    image: "/placeholder.svg?height=400&width=600",
    price: 79.99,
    rating: 4.7,
    students: 8562,
    hours: 38,
    level: "Intermediate",
    category: "Design",
    bestseller: false,
  },
  {
    id: "3",
    title: "Data Science & Machine Learning",
    instructor: "Alex Rivera",
    image: "/placeholder.svg?height=400&width=600",
    price: 94.99,
    rating: 4.9,
    students: 12750,
    hours: 56,
    level: "Advanced",
    category: "Data Science",
    bestseller: true,
  },
  {
    id: "4",
    title: "Digital Marketing Strategy",
    instructor: "Emma Phillips",
    image: "/placeholder.svg?height=400&width=600",
    price: 69.99,
    rating: 4.6,
    students: 7456,
    hours: 32,
    level: "Beginner",
    category: "Marketing",
    bestseller: false,
  },
  {
    id: "5",
    title: "Full-Stack Mobile App Development",
    instructor: "David Kumar",
    image: "/placeholder.svg?height=400&width=600",
    price: 99.99,
    rating: 4.8,
    students: 9321,
    hours: 48,
    level: "Intermediate to Advanced",
    category: "Development",
    bestseller: true,
  },
  {
    id: "6",
    title: "Business Finance & Accounting",
    instructor: "Lisa Wong",
    image: "/placeholder.svg?height=400&width=600",
    price: 74.99,
    rating: 4.5,
    students: 6235,
    hours: 35,
    level: "Beginner to Intermediate",
    category: "Business",
    bestseller: false,
  },
]

export function FeaturedCourses() {
  const [activeCategory, setActiveCategory] = useState("All")

  // Categories derived from course data
  const categories = ["All", ...new Set(COURSES.map((course) => course.category))]

  // Filter courses based on active category
  const filteredCourses =
    activeCategory === "All" ? COURSES : COURSES.filter((course) => course.category === activeCategory)

  return (
    <section id="featured-courses" className="py-20 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                Courses
              </span>
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              Discover our most popular courses across various categories, designed to help you achieve your goals.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className={`rounded-full ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                    : "hover:text-foreground hover:bg-secondary"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/courses">
              View All Courses
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
