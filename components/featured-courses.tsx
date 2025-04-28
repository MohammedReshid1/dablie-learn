"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ChevronRight, Clock, Share2, Star, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

// Sample course data
const COURSES = [
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
    <section className="py-20 bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                Courses
              </span>
            </h2>
            <p className="mt-2 text-neutral-600 max-w-2xl">
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
                    : "hover:text-neutral-900 hover:bg-neutral-100"
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
              <Card className="h-full overflow-hidden group">
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {course.bestseller && (
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500">
                      Bestseller
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <Button className="w-full bg-white text-neutral-900 hover:bg-white/90">Preview Course</Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800">
                      {course.category}
                    </Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-neutral-500 text-sm mb-4">By {course.instructor}</p>
                  <div className="flex items-center gap-4 text-sm text-neutral-600">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.hours} hours
                    </div>
                    <div className="text-sm">{course.level}</div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex items-center justify-between">
                  <div className="font-bold text-xl">${course.price}</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-neutral-100">
                      <Share2 className="h-5 w-5" />
                    </Button>
                    <Button
                      asChild
                      className="rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                    >
                      <Link href={`/courses/${course.id}`}>Enroll Now</Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
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
