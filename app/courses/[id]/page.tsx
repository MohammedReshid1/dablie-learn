import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Clock, Download, Globe, PlayCircle, Share2, ShieldCheck, Star, Users } from "lucide-react"
import Link from "next/link"

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch course data based on the ID
  // For this example, we'll use mock data
  const course = {
    id: params.id,
    title: "Complete Web Development Bootcamp",
    subtitle: "Learn HTML, CSS, JavaScript, React, Node.js and more with practical projects",
    description:
      "This comprehensive web development course is designed to take you from beginner to professional developer. You'll learn front-end and back-end technologies through hands-on projects that simulate real-world scenarios.",
    price: 89.99,
    discountPrice: 14.99,
    discountEnds: "Apr 30, 2023",
    rating: 4.8,
    reviewCount: 15234,
    studentCount: 156897,
    lastUpdated: "March 2023",
    language: "English",
    level: "Beginner to Advanced",
    duration: "42 hours",
    lectures: 345,
    instructor: {
      name: "Sarah Johnson",
      title: "Senior Web Developer & Instructor",
      bio: "Sarah has over 10 years of experience in web development and has worked with companies like Google and Facebook. She's passionate about teaching and has helped thousands of students launch their web development careers.",
      image: "/placeholder.svg?height=200&width=200",
      courses: 12,
      reviews: 4.9,
      students: 250000,
    },
    image: "/placeholder.svg?height=600&width=1000",
    whatYouWillLearn: [
      "Build 25+ websites, apps, and games using HTML, CSS, JavaScript, React, Node.js, and more",
      "Create a professional portfolio website to showcase your projects to potential employers",
      "Learn modern ES6+ JavaScript from basics to advanced topics",
      "Build RESTful APIs and full-stack applications with user authentication",
      "Implement responsive design principles for all device sizes",
      "Deploy your applications to the web using various hosting platforms",
      "Understand how to use Git and GitHub for version control and collaboration",
      "Learn best practices for clean, maintainable code and debugging techniques",
    ],
    curriculum: [
      {
        title: "Introduction to Web Development",
        lectures: 15,
        duration: "2 hours",
        content: [
          { title: "Course Overview", duration: "10 min", preview: true },
          { title: "How the Internet Works", duration: "15 min", preview: true },
          { title: "Setting Up Your Development Environment", duration: "20 min", preview: false },
          // More lectures...
        ],
      },
      {
        title: "HTML Fundamentals",
        lectures: 25,
        duration: "4 hours",
        content: [
          { title: "HTML Document Structure", duration: "15 min", preview: false },
          { title: "Text Elements and Formatting", duration: "25 min", preview: false },
          { title: "Links, Images, and Media", duration: "20 min", preview: false },
          // More lectures...
        ],
      },
      {
        title: "CSS Styling",
        lectures: 30,
        duration: "5 hours",
        content: [
          { title: "CSS Selectors and Properties", duration: "30 min", preview: false },
          { title: "The Box Model", duration: "25 min", preview: false },
          { title: "Flexbox and Grid Layout", duration: "45 min", preview: false },
          // More lectures...
        ],
      },
      {
        title: "JavaScript Basics",
        lectures: 40,
        duration: "8 hours",
        content: [
          { title: "Variables and Data Types", duration: "25 min", preview: false },
          { title: "Control Flow and Loops", duration: "35 min", preview: false },
          { title: "Functions and Scope", duration: "40 min", preview: false },
          // More lectures...
        ],
      },
      {
        title: "Advanced JavaScript",
        lectures: 35,
        duration: "7 hours",
        content: [
          { title: "DOM Manipulation", duration: "45 min", preview: false },
          { title: "Events and Event Handling", duration: "35 min", preview: false },
          { title: "Asynchronous JavaScript", duration: "50 min", preview: false },
          // More lectures...
        ],
      },
      // More sections...
    ],
    requirements: [
      "Basic computer skills and familiarity with using the internet",
      "A computer with internet access (Windows, Mac, or Linux)",
      "No prior programming knowledge required - we'll start from the basics",
    ],
    targetAudience: [
      "Beginners with no coding experience looking to learn web development",
      "Students who want to learn modern web technologies and frameworks",
      "Professionals looking to switch careers to web development",
      "Entrepreneurs who want to build their own websites and web applications",
      "Anyone interested in learning how to create and deploy websites",
    ],
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/80 border-b border-neutral-200">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-fuchsia-500 to-orange-500">
              <span className="font-bold text-white text-xl">D</span>
            </div>
            <span className="font-bold text-xl">DablieLearn</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/courses" className="text-sm font-medium text-rose-600">
              Explore
            </Link>
            <Link
              href="/categories"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/teach"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
            >
              Teach
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block text-sm font-medium text-neutral-700 hover:text-neutral-900">
              Log in
            </Link>
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        <section className="py-12 bg-gradient-to-b from-neutral-50 to-white">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div>
                <Badge className="mb-4 bg-rose-100 text-rose-800 hover:bg-rose-200">Web Development</Badge>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-4">{course.title}</h1>
                <p className="text-xl text-neutral-600 mb-6">{course.subtitle}</p>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <span className="ml-1 font-bold">{course.rating}</span>
                    <span className="ml-1 text-neutral-600">({course.reviewCount.toLocaleString()} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-neutral-500" />
                    <span className="ml-1 text-neutral-600">{course.studentCount.toLocaleString()} students</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-8">
                  <div className="h-12 w-12 rounded-full overflow-hidden">
                    <img
                      src={course.instructor.image || "/placeholder.svg"}
                      alt={course.instructor.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">
                      Created by{" "}
                      <Link href="#instructor" className="text-rose-600 hover:underline">
                        {course.instructor.name}
                      </Link>
                    </div>
                    <div className="text-sm text-neutral-500">
                      Last updated {course.lastUpdated} • {course.language}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Card className="overflow-hidden shadow-xl border-0">
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <button className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors">
                        <PlayCircle className="h-12 w-12 text-white fill-white" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                      Preview this course
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="flex items-baseline mb-2">
                        <span className="text-3xl font-bold">${course.discountPrice}</span>
                        <span className="text-lg line-through text-neutral-500 ml-2">${course.price}</span>
                        <span className="text-sm text-green-600 font-medium ml-2">83% off</span>
                      </div>
                      <div className="text-sm text-neutral-600">
                        <span className="font-medium">Sale ends in 2 days!</span> Full lifetime access
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <Button className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600">
                        Enroll Now
                      </Button>
                      <Button variant="outline" className="w-full">
                        Try For Free
                      </Button>
                    </div>

                    <div className="space-y-4 text-sm">
                      <div className="text-center font-medium">This course includes:</div>

                      <div className="grid gap-3">
                        <div className="flex items-start">
                          <Clock className="h-5 w-5 text-neutral-500 mr-3 shrink-0" />
                          <div>{course.duration} on-demand video</div>
                        </div>
                        <div className="flex items-start">
                          <Download className="h-5 w-5 text-neutral-500 mr-3 shrink-0" />
                          <div>25 downloadable resources</div>
                        </div>
                        <div className="flex items-start">
                          <Globe className="h-5 w-5 text-neutral-500 mr-3 shrink-0" />
                          <div>Full lifetime access</div>
                        </div>
                        <div className="flex items-start">
                          <ShieldCheck className="h-5 w-5 text-neutral-500 mr-3 shrink-0" />
                          <div>Certificate of completion</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-4">
                      <Button variant="ghost" size="sm" className="text-neutral-600">
                        <Share2 className="h-4 w-4 mr-2" /> Share
                      </Button>
                      <Button variant="ghost" size="sm" className="text-neutral-600">
                        Gift this course
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full md:w-auto grid-cols-4 md:flex md:space-x-2">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-orange-500 data-[state=active]:text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="curriculum"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-orange-500 data-[state=active]:text-white"
                >
                  Curriculum
                </TabsTrigger>
                <TabsTrigger
                  value="instructor"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-orange-500 data-[state=active]:text-white"
                >
                  Instructor
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-orange-500 data-[state=active]:text-white"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="max-w-4xl">
                  <div className="prose prose-lg max-w-none">
                    <h2>Course Description</h2>
                    <p>{course.description}</p>

                    <h3>What You'll Learn</h3>
                    <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                      {course.whatYouWillLearn.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <h3>Requirements</h3>
                    <ul>
                      {course.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>

                    <h3>Who This Course is For</h3>
                    <ul>
                      {course.targetAudience.map((audience, index) => (
                        <li key={index}>{audience}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="curriculum" className="mt-6">
                <div className="space-y-6 max-w-4xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">Course Content</h2>
                      <p className="text-neutral-600">
                        {course.curriculum.reduce((acc, section) => acc + section.lectures, 0)} lectures •{" "}
                        {course.duration} total length
                      </p>
                    </div>
                    <Button variant="link" className="text-rose-600">
                      Expand All Sections
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {course.curriculum.map((section, idx) => (
                      <div key={idx} className="border rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between bg-neutral-50 p-4">
                          <div className="font-medium">{section.title}</div>
                          <div className="text-sm text-neutral-500">
                            {section.lectures} lectures • {section.duration}
                          </div>
                        </div>

                        <div className="divide-y">
                          {section.content.map((lecture, lectureIdx) => (
                            <div key={lectureIdx} className="flex items-center justify-between p-4">
                              <div className="flex items-center">
                                <PlayCircle className="h-5 w-5 text-neutral-500 mr-3" />
                                <span>{lecture.title}</span>
                                {lecture.preview && (
                                  <Badge variant="outline" className="ml-3 text-xs">
                                    Preview
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-neutral-500">{lecture.duration}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="instructor" className="mt-6" id="instructor">
                <div className="max-w-4xl">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <div className="aspect-square rounded-xl overflow-hidden">
                        <img
                          src={course.instructor.image || "/placeholder.svg"}
                          alt={course.instructor.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="md:w-2/3">
                      <h2 className="text-2xl font-bold mb-2">{course.instructor.name}</h2>
                      <p className="text-neutral-600 mb-4">{course.instructor.title}</p>

                      <div className="flex flex-wrap gap-6 mb-6">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-amber-400 mr-2" />
                          <div>
                            <div className="font-medium">{course.instructor.reviews} Instructor Rating</div>
                            <div className="text-sm text-neutral-500">Reviews</div>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <Users className="h-5 w-5 text-neutral-500 mr-2" />
                          <div>
                            <div className="font-medium">{(course.instructor.students / 1000).toFixed(1)}k</div>
                            <div className="text-sm text-neutral-500">Students</div>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <PlayCircle className="h-5 w-5 text-neutral-500 mr-2" />
                          <div>
                            <div className="font-medium">{course.instructor.courses}</div>
                            <div className="text-sm text-neutral-500">Courses</div>
                          </div>
                        </div>
                      </div>

                      <div className="prose max-w-none">
                        <p>{course.instructor.bio}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="max-w-4xl space-y-8">
                  <div className="flex flex-col md:flex-row md:items-center gap-8">
                    <div className="md:w-1/3 flex flex-col items-center">
                      <div className="text-6xl font-bold mb-2">{course.rating}</div>
                      <div className="flex items-center mb-2">
                        {Array(5)
                          .fill(null)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-6 w-6 ${i < Math.floor(course.rating) ? "text-amber-400 fill-amber-400" : "text-neutral-300"}`}
                            />
                          ))}
                      </div>
                      <div className="text-neutral-600">Course Rating</div>
                    </div>

                    <div className="md:w-2/3 space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        // Calculate percentage (higher for 5 and 4, lower for others)
                        const percentage =
                          rating === 5 ? 78 : rating === 4 ? 15 : rating === 3 ? 5 : rating === 2 ? 1 : 1

                        return (
                          <div key={rating} className="flex items-center gap-4">
                            <div className="flex items-center w-24">
                              <span className="mr-1">{rating}</span>
                              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                            </div>
                            <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-400 rounded-full" style={{ width: `${percentage}%` }} />
                            </div>
                            <div className="w-16 text-sm text-neutral-600">{percentage}%</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold">Reviews</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Most Relevant
                        </Button>
                        <Button variant="outline" size="sm">
                          Most Recent
                        </Button>
                      </div>
                    </div>

                    {/* Mock reviews */}
                    {Array(3)
                      .fill(null)
                      .map((_, i) => (
                        <div key={i} className="border-b pb-6">
                          <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white font-bold">
                              {["JD", "MK", "TP"][i]}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{["John Doe", "Mary Kim", "Tom Parker"][i]}</div>
                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {Array(5)
                                    .fill(null)
                                    .map((_, j) => (
                                      <Star
                                        key={j}
                                        className={`h-4 w-4 ${j < (i === 1 ? 4 : 5) ? "text-amber-400 fill-amber-400" : "text-neutral-300"}`}
                                      />
                                    ))}
                                </div>
                                <span className="text-sm text-neutral-500">1 month ago</span>
                              </div>
                              <p className="mt-2 text-neutral-700">
                                {i === 0 &&
                                  "This course is amazing! The instructor explains everything clearly and the projects are fun and practical. I've learned so much in just a few weeks."}
                                {i === 1 &&
                                  "Great course overall. Some sections could be more detailed, but I still learned a lot and feel much more confident with my web development skills."}
                                {i === 2 &&
                                  "Exactly what I needed to jumpstart my career change. The instructor is knowledgeable and the content is up-to-date with the latest technologies."}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}

                    <div className="flex justify-center">
                      <Button variant="outline">Show More Reviews</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="py-12 bg-neutral-50">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8 text-center">Similar Courses You May Like</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array(4)
                .fill(null)
                .map((_, i) => (
                  <div
                    key={i}
                    className="group h-full overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src="/placeholder.svg?height=400&width=600"
                        alt="Course thumbnail"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {i === 0 && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                          Bestseller
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">
                        <Link href="#" className="hover:text-rose-600 transition-colors">
                          {
                            [
                              "JavaScript Mastery: Zero to Expert",
                              "React & Redux for Beginners",
                              "Node.js: The Complete Guide",
                              "Full-Stack Web Development Boot Camp",
                            ][i]
                          }
                        </Link>
                      </h3>
                      <p className="text-neutral-500 text-sm mb-4">
                        By {["Alex Rivera", "Emma Phillips", "Michael Chen", "David Kumar"][i]}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                          <span className="text-sm font-medium ml-1">{[4.9, 4.6, 4.7, 4.8][i]}</span>
                        </div>
                        <div className="font-bold">${[19.99, 14.99, 16.99, 12.99][i]}</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-fuchsia-500 to-orange-500">
                  <span className="font-bold text-white text-xl">D</span>
                </div>
                <span className="font-bold text-xl text-white">DablieLearn</span>
              </Link>
              <p className="text-neutral-400 max-w-md mb-6">
                DablieLearn is an e-learning platform that helps you acquire new skills and knowledge through
                high-quality courses taught by industry experts.
              </p>
            </div>

            {/* Footer sections from the footer component */}
          </div>

          <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-neutral-500 text-sm">
              © {new Date().getFullYear()} DablieLearn. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
