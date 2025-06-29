"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export function LandingHero() {
  return (
    <section
      className="relative pt-4 pb-16 md:pt-8 overflow-hidden bg-gradient-to-b from-background to-secondary/30 min-h-[calc(100vh-theme(space.16))] flex items-center"
    >
      {/* Background blur divs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[40%] -left-[10%] h-[80%] w-[60%] rounded-full bg-gradient-to-br from-rose-100/30 to-fuchsia-100/30 dark:from-rose-900/10 dark:to-fuchsia-900/10 blur-3xl" />
        <div className="absolute -bottom-[30%] -right-[10%] h-[70%] w-[60%] rounded-full bg-gradient-to-br from-orange-100/30 to-amber-100/30 dark:from-orange-900/10 dark:to-amber-900/10 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
              <span className="flex h-2 w-2 rounded-full bg-rose-500 mr-2"></span>
              Over{" "}
              <span className="font-bold mx-1">
                10,000
              </span>{" "}
              students worldwide
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-foreground">
              Master new skills with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-fuchsia-500 to-orange-500">
                {" "}
                DablieLearn
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-lg">
              Access thousands of expert-led courses in design, development, business, and more. Learn at your own pace,
              anytime, anywhere.
            </p>

            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="What do you want to learn today?"
                className="pl-10 py-6 rounded-full border-input shadow-sm text-base"
              />
              <Button className="absolute right-1 top-1 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600">
                Search
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>Popular:</span>
              {["Web Development", "UI/UX Design", "Data Science", "Marketing"].map((topic) => (
                <Link
                  key={topic}
                  to={`/courses?topic=${topic.toLowerCase().replace(/\s/g, "-")}`}
                  className="inline-flex items-center rounded-full border border-border px-3 py-1 text-sm hover:bg-secondary transition-colors"
                >
                  {topic}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative aspect-[4/3] lg:aspect-[5/4] lg:order-last mb-12 lg:mb-0"
          >
            <div className="absolute top-[10%] left-[10%] h-[80%] w-[80%] rounded-2xl bg-gradient-to-br from-rose-500 via-fuchsia-500 to-orange-500 blur-md opacity-20" />
            <div className="relative h-full w-full rounded-2xl overflow-hidden border-8 border-background shadow-xl">
              <img
                src="/placeholder.svg?height=800&width=800"
                alt="DablieLearn Learning Experience"
                className="h-full w-full object-cover"
              />

              <div className="absolute top-4 left-4 right-4 rounded-xl bg-background/90 backdrop-blur-sm p-4 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
                    <span className="text-white font-bold">JS</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">JavaScript Mastery</h3>
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {Array(5)
                          .fill(null)
                          .map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className={`w-4 h-4 ${i < 4 ? "text-amber-400" : "text-muted"}`}
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ))}
                      </div>
                      <span className="text-xs text-muted-foreground">(4.8) • 15,234 students</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-background/90 backdrop-blur-sm p-3 shadow-lg">
                  <div className="text-xs text-muted-foreground">Current Progress</div>
                  <div className="mt-1 h-2 w-full rounded-full bg-secondary">
                    <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-rose-500 to-orange-500" />
                  </div>
                  <div className="mt-1 text-sm font-medium">65% Completed</div>
                </div>
                <div className="rounded-xl bg-background/90 backdrop-blur-sm p-3 shadow-lg">
                  <div className="text-xs text-muted-foreground">Next Lesson</div>
                  <div className="font-medium truncate">Advanced DOM Manipulation</div>
                  <div className="text-xs text-muted-foreground">25 min remaining</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Downward Arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer animate-bounce">
        <a href="#featured-courses"> {/* Link to the next section's ID */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors"
          >
            <path
              d="M12 5V19M12 19L19 12M12 19L5 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  )
}