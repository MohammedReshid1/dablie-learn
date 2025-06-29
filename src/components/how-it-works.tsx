"use client"

import { Laptop, PlayCircle, BookOpen, Award } from "lucide-react"
import { motion } from "framer-motion"

const STEPS = [
  {
    icon: BookOpen,
    title: "Browse Courses",
    description: "Explore thousands of courses in various categories taught by expert instructors.",
    color: "bg-gradient-to-br from-sky-400 to-blue-600",
  },
  {
    icon: PlayCircle,
    title: "Learn On-Demand",
    description: "Access course content anytime, anywhere. Learn at your own pace with lifetime access.",
    color: "bg-gradient-to-br from-purple-400 to-indigo-600",
  },
  {
    icon: Laptop,
    title: "Practice & Apply",
    description: "Complete hands-on projects and assignments to reinforce your learning.",
    color: "bg-gradient-to-br from-emerald-400 to-teal-600",
  },
  {
    icon: Award,
    title: "Get Certified",
    description: "Earn certificates upon course completion to showcase your skills to employers.",
    color: "bg-gradient-to-br from-amber-400 to-orange-600",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            How{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
              DablieLearn
            </span>{" "}
            Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our platform makes learning new skills simple and effective with a proven four-step process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className={`flex items-center justify-center w-20 h-20 rounded-full ${step.color} mb-6 shadow-lg`}>
                <step.icon className="h-10 w-10 text-white" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              {index < STEPS.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 5L16 12L9 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground/30"
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-muted dark:bg-neutral-800/50 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Ready to start learning?</h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of students who are already learning and growing with DablieLearn. Get unlimited access
                to all courses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 p-[2px]"
                >
                  <div className="bg-background rounded-[10px] p-6">
                    <div className="font-bold text-lg mb-1">Monthly</div>
                    <div className="flex items-baseline mb-4">
                      <span className="text-3xl font-bold">$19</span>
                      <span className="text-muted-foreground ml-1">/month</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center text-sm">
                        <svg
                          className="w-4 h-4 mr-2 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Unlimited access to all courses
                      </li>
                      <li className="flex items-center text-sm">
                        <svg
                          className="w-4 h-4 mr-2 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        New courses every month
                      </li>
                      <li className="flex items-center text-sm">
                        <svg
                          className="w-4 h-4 mr-2 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Cancel anytime
                      </li>
                    </ul>
                    <button className="w-full py-3 rounded-lg bg-neutral-100 font-medium hover:bg-neutral-200 transition-colors">
                      Get Started
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 p-[2px]"
                >
                  <div className="bg-gradient-to-br from-rose-500 to-orange-500 rounded-[10px] p-6 text-white">
                    <div className="font-bold text-lg mb-1">Annual</div>
                    <div className="flex items-baseline mb-4">
                      <span className="text-3xl font-bold">$199</span>
                      <span className="text-white/80 ml-1">/year</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center text-sm">
                        <svg className="w-4 h-4 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Everything in Monthly
                      </li>
                      <li className="flex items-center text-sm">
                        <svg className="w-4 h-4 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Save $29 (two months free)
                      </li>
                      <li className="flex items-center text-sm">
                        <svg className="w-4 h-4 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Priority support
                      </li>
                    </ul>
                    <button className="w-full py-3 rounded-lg bg-white font-medium text-neutral-900 hover:bg-neutral-100 transition-colors">
                      Save with Annual
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square relative">
                <img
                  src="/placeholder.svg?height=500&width=500"
                  alt="Student learning"
                  className="rounded-xl object-cover h-full w-full"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-card rounded-xl p-4 shadow-lg border dark:border-neutral-700">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-10 w-10 rounded-full border-2 border-white dark:border-neutral-700 overflow-hidden">
                        <img
                         src={`/placeholder.svg?height=40&width=40`}
                         alt={`Student ${i}`}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Join 10,000+ students</div>
                    <div className="text-sm text-muted-foreground">Learning new skills daily</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}