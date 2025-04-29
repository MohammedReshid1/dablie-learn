import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  BookOpen,
  ChevronRight,
  DollarSign,
  Download,
  FileText,
  MessageSquare,
  PlusCircle,
  Star,
  Trash2,
  Users,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { InstructorShell } from "@/components/instructor-shell"

// Sample course data
const INSTRUCTOR_COURSES = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    image: "/placeholder.svg?height=400&width=600",
    students: 15234,
    rating: 4.8,
    reviews: 1245,
    revenue: 45702.89,
    status: "published",
    lastUpdated: "2 months ago",
  },
  {
    id: "2",
    title: "Advanced JavaScript: From Fundamentals to Functional JS",
    image: "/placeholder.svg?height=400&width=600",
    students: 8562,
    rating: 4.7,
    reviews: 876,
    revenue: 25641.32,
    status: "published",
    lastUpdated: "3 months ago",
  },
  {
    id: "3",
    title: "React & Redux: Building Modern Web Applications",
    image: "/placeholder.svg?height=400&width=600",
    students: 0,
    rating: 0,
    reviews: 0,
    revenue: 0,
    status: "draft",
    lastUpdated: "1 week ago",
  },
]

const RECENT_REVIEWS = [
  {
    id: "1",
    courseId: "1",
    courseName: "Complete Web Development Bootcamp",
    studentName: "John Doe",
    rating: 5,
    comment:
      "This course is amazing! The instructor explains everything clearly and the projects are fun and practical.",
    date: "2 days ago",
  },
  {
    id: "2",
    courseId: "1",
    courseName: "Complete Web Development Bootcamp",
    studentName: "Mary Kim",
    rating: 4,
    comment: "Great course overall. Some sections could be more detailed, but I still learned a lot.",
    date: "1 week ago",
  },
  {
    id: "3",
    courseId: "2",
    courseName: "Advanced JavaScript: From Fundamentals to Functional JS",
    studentName: "Tom Parker",
    rating: 5,
    comment:
      "Exactly what I needed to level up my JavaScript skills. The functional programming section was particularly helpful.",
    date: "2 weeks ago",
  },
]

export default function InstructorDashboardPage() {
  return (
    <InstructorShell>
      <DashboardHeader heading="Instructor Dashboard" text="Manage your courses and track your performance.">
        <Button
          asChild
          className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
        >
          <Link href="/instructor/courses/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Course
          </Link>
        </Button>
      </DashboardHeader>

      <div className="grid gap-8">
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                    <h3 className="text-2xl font-bold mt-1 text-foreground">23,796</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-rose-100 dark:bg-secondary flex items-center justify-center">
                    <Users className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                  </div>
                </div>
                <div className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3 h-3 mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                      clipRule="evenodd"
                    />
                  </svg>
                  +12.5% from last month
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <h3 className="text-2xl font-bold mt-1 text-foreground">$71,344.21</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-secondary flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3 h-3 mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                      clipRule="evenodd"
                    />
                  </svg>
                  +8.2% from last month
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Course Rating</p>
                    <h3 className="text-2xl font-bold mt-1 text-foreground">4.8</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-secondary flex items-center justify-center">
                    <Star className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
                <div className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3 h-3 mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                      clipRule="evenodd"
                    />
                  </svg>
                  +0.2 from last month
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                    <h3 className="text-2xl font-bold mt-1 text-foreground">3</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-secondary flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-2">2 published, 1 draft</div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-foreground">Revenue Overview</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Monthly
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
              <div className="h-64 flex items-end justify-between gap-2">
                {Array(12)
                  .fill(null)
                  .map((_, i) => {
                    const height = Math.floor(Math.random() * 80) + 20
                    return (
                      <div key={i} className="flex flex-col items-center">
                        <div
                          className="w-12 bg-gradient-to-t from-rose-500 to-orange-500 rounded-t-md"
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className="text-xs text-muted-foreground mt-2">
                          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i]}
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Tabs defaultValue="courses" className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <TabsList>
                    <TabsTrigger value="courses">My Courses</TabsTrigger>
                    <TabsTrigger value="reviews">Recent Reviews</TabsTrigger>
                  </TabsList>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/instructor/courses">
                      View All <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <TabsContent value="courses" className="space-y-4">
                  {INSTRUCTOR_COURSES.map((course) => (
                    <Card key={course.id} className="overflow-hidden bg-card border-border">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-48 relative aspect-video sm:aspect-square">
                            <img
                              src={course.image || "/placeholder.svg"}
                              alt={course.title}
                              className="h-full w-full object-cover"
                            />
                            <div
                              className={`absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded-full ${
                                course.status === "published"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {course.status === "published" ? "Published" : "Draft"}
                            </div>
                          </div>
                          <div className="flex-1 p-4">
                            <h3 className="font-bold mb-1 text-foreground">{course.title}</h3>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm mb-3 text-muted-foreground">
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                <span>{course.students.toLocaleString()} students</span>
                              </div>
                              {course.status === "published" && (
                                <>
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 text-amber-400 fill-amber-400 mr-1" />
                                    <span>
                                      {course.rating} ({course.reviews} reviews)
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400 mr-1" />
                                    <span>${course.revenue.toLocaleString()}</span>
                                  </div>
                                </>
                              )}
                              <div className="text-muted-foreground">Last updated: {course.lastUpdated}</div>
                            </div>

                            <div className="flex flex-wrap justify-end gap-2">
                              {course.status === "draft" && (
                                <Button size="sm" variant="destructive">
                                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                                </Button>
                              )}
                              <Button size="sm" variant="outline" asChild>
                                <Link href={`/instructor/courses/${course.id}`}>
                                  {course.status === "published" ? "Manage" : "Continue Editing"}
                                </Link>
                              </Button>
                              {course.status === "published" && (
                                <Button size="sm" asChild>
                                  <Link href={`/courses/${course.id}`}>View Course</Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="reviews" className="space-y-4">
                  {RECENT_REVIEWS.map((review) => (
                    <Card key={review.id} className="bg-card border-border">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white font-bold">
                            {review.studentName.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-foreground">{review.studentName}</div>
                                <div className="text-sm text-muted-foreground">
                                  {review.courseName} • {review.date}
                                </div>
                              </div>
                              <div className="flex">
                                {Array(5)
                                  .fill(null)
                                  .map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating ? "text-amber-400 fill-amber-400" : "text-neutral-300"
                                      }`}
                                    />
                                  ))}
                              </div>
                            </div>
                            <p className="mt-2 text-foreground">{review.comment}</p>
                            <div className="mt-2 flex justify-end">
                              <Button variant="ghost" size="sm">
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card className="bg-card border-border">
                <CardContent className="p-5">
                  <h3 className="font-bold mb-4 text-foreground">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-foreground">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-secondary flex items-center justify-center mr-3">
                          <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span>Pending Q&A</span>
                      </div>
                      <span className="font-bold">12</span>
                    </div>
                    <div className="flex items-center justify-between text-foreground">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-secondary flex items-center justify-center mr-3">
                          <Star className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        </div>
                        <span>New Reviews</span>
                      </div>
                      <span className="font-bold">8</span>
                    </div>
                    <div className="flex items-center justify-between text-foreground">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-secondary flex items-center justify-center mr-3">
                          <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <span>New Students</span>
                      </div>
                      <span className="font-bold">24</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      View All Notifications
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-5">
                  <h3 className="font-bold mb-4 text-foreground">To-Do List</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-rose-100 dark:bg-secondary flex items-center justify-center flex-shrink-0">
                        <FileText className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-foreground">Complete course outline</h4>
                        <div className="text-xs text-muted-foreground mt-1">
                          React & Redux: Building Modern Web Applications
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-rose-100 dark:bg-secondary flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-foreground">Review monthly analytics</h4>
                        <div className="text-xs text-muted-foreground mt-1">Check performance across all courses</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-rose-100 dark:bg-secondary flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-foreground">Respond to student questions</h4>
                        <div className="text-xs text-muted-foreground mt-1">12 questions awaiting response</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      View All Tasks
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </InstructorShell>
  )
}
