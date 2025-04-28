"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const TESTIMONIALS = [
  {
    id: "1",
    name: "Jessica Thomson",
    role: "UI/UX Designer",
    company: "Creative Agency",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "DablieLearn completely transformed my career. The UI/UX design courses were comprehensive and taught me practical skills I use every day in my job. The instructors were incredibly knowledgeable and supportive.",
  },
  {
    id: "2",
    name: "Marcus Reynolds",
    role: "Frontend Developer",
    company: "Tech Startup",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "After completing the Complete Web Development Bootcamp, I landed my dream job at a startup. The course content was up-to-date with the latest technologies and the projects helped build my portfolio.",
  },
  {
    id: "3",
    name: "Sophia Chen",
    role: "Data Scientist",
    company: "Finance Corp",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "The Data Science courses on DablieLearn offered the perfect balance of theory and practice. The instructors explained complex concepts clearly, and the hands-on projects gave me valuable experience working with real-world data.",
  },
  {
    id: "4",
    name: "Jamal Washington",
    role: "Marketing Manager",
    company: "E-commerce Brand",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "DablieLearn's digital marketing courses helped me stay ahead in this rapidly changing field. I've implemented the strategies I learned and have seen measurable results in our company's marketing campaigns.",
  },
  {
    id: "5",
    name: "Emily Rodriguez",
    role: "Freelance Illustrator",
    company: "Self-employed",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "As a self-taught artist, DablieLearn's illustration courses filled in the gaps in my knowledge and helped me refine my technique. I now have a thriving freelance business and a style that sets me apart.",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  // Get the current testimonial and the ones before/after for the carousel
  const currentTestimonial = TESTIMONIALS[currentIndex]
  const nextIndex = (currentIndex + 1) % TESTIMONIALS.length
  const prevIndex = (currentIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">Students</span>{" "}
            Say
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Join thousands of satisfied learners who have transformed their careers with DablieLearn.
          </p>
        </div>

        <div className="relative">
          <div className="flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl"
              >
                <Card className="bg-white border-0 shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-5">
                      <div className="md:col-span-2 bg-gradient-to-br from-rose-500 to-orange-500 p-8 flex flex-col justify-between text-white">
                        <Quote className="h-12 w-12 opacity-20" />
                        <div className="mt-8">
                          <div className="flex items-center gap-3">
                            <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-white">
                              <img
                                src={currentTestimonial.image || "/placeholder.svg"}
                                alt={currentTestimonial.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-bold text-lg">{currentTestimonial.name}</div>
                              <div className="text-sm opacity-90">
                                {currentTestimonial.role}, {currentTestimonial.company}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-3 p-8 flex items-center">
                        <blockquote className="text-lg italic text-neutral-700">
                          "{currentTestimonial.content}"
                        </blockquote>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute top-1/2 transform -translate-y-1/2 left-4 lg:-left-4">
            <Button
              onClick={prevTestimonial}
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md hover:bg-neutral-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute top-1/2 transform -translate-y-1/2 right-4 lg:-right-4">
            <Button
              onClick={nextTestimonial}
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md hover:bg-neutral-100"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 mx-1 rounded-full transition-colors ${
                index === currentIndex
                  ? "bg-gradient-to-r from-rose-500 to-orange-500"
                  : "bg-neutral-300 hover:bg-neutral-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
