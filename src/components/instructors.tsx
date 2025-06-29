"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Star, Users } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const INSTRUCTORS = [
  {
    name: "Dr. Sarah Johnson",
    title: "Web Development Expert",
    image: "/placeholder.svg?height=300&width=300",
    courses: 12,
    students: 25430,
    rating: 4.8,
    specialty: "JavaScript & React",
  },
  {
    name: "Michael Chen",
    title: "UI/UX Design Professional",
    image: "/placeholder.svg?height=300&width=300",
    courses: 8,
    students: 18920,
    rating: 4.7,
    specialty: "Product Design",
  },
  {
    name: "Alex Rivera",
    title: "Data Science Instructor",
    image: "/placeholder.svg?height=300&width=300",
    courses: 15,
    students: 32150,
    rating: 4.9,
    specialty: "Machine Learning",
  },
  {
    name: "Emma Phillips",
    title: "Digital Marketing Strategist",
    image: "/placeholder.svg?height=300&width=300",
    courses: 9,
    students: 21340,
    rating: 4.6,
    specialty: "Growth Marketing",
  },
]

export function Instructors() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Learn from{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                Industry Experts
              </span>
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              Our instructors are passionate professionals with years of real-world experience.
            </p>
          </div>

          <Button asChild variant="outline" className="rounded-full self-start md:self-auto">
            <Link to="/instructors">View All Instructors</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTRUCTORS.map((instructor, index) => (
            <motion.div
              key={instructor.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group border-0 dark:border shadow-md hover:shadow-xl transition-shadow bg-card">
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={instructor.image || "/placeholder.svg"}
                      alt={instructor.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="font-bold text-xl">{instructor.name}</h3>
                      <p className="text-white/80">{instructor.title}</p>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        <span className="font-medium text-foreground">{instructor.rating}</span>
                      </div>
                      <div className="text-muted-foreground text-sm">{instructor.specialty}</div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Globe className="h-4 w-4" />
                        <span>{instructor.courses} courses</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{(instructor.students / 1000).toFixed(1)}k students</span>
                      </div>
                    </div>

                    <Button
                      asChild
                      className="w-full rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                    >
                      <Link to={`/instructors/${instructor.name.toLowerCase().replace(/\s+/g, "-")}`}>
                        View Profile
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}