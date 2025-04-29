import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Calendar, BadgeIcon as Certificate, ChevronRight, Heart, PlayCircle, Search, Star } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

// Sample course data
const ENROLLED_COURSES = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    image: "/placeholder.svg?height=400&width=600",
    progress: 65,
    lastAccessed: "2 days ago",
    totalLectures: 345,
    completedLectures: 224,
    nextLesson: "Advanced DOM Manipulation",
    category: "Development",
  },
  {
    id: "2",
    title: "UI/UX Design Masterclass",
    instructor: "Michael Chen",
    image: "/placeholder.svg?height=400&width=600",
    progress: 32,
    lastAccessed: "1 week ago",
    totalLectures: 280,
    completedLectures: 89,
    nextLesson: "User Research Methods",
    category: "Design",
  },
  {
    id: "3",
    title: "Data Science & Machine Learning",
    instructor: "Alex Rivera",
    image: "/placeholder.svg?height=400&width=600",
    progress: 12,
    lastAccessed: "3 days ago",
    totalLectures: 320,
    completedLectures: 38,
    nextLesson: "Introduction to NumPy",
    category: "Data Science",
  },
]

const WISHLIST_COURSES = [
  {
    id: "4",
    title: "Digital Marketing Strategy",
    instructor: "Emma Phillips",
    image: "/placeholder.svg?height=400&width=600",
    price: 69.99,
    rating: 4.6,
    students: 7456,
    category: "Marketing",
  },
  {
    id: "5",
    title: "Full-Stack Mobile App Development",
    instructor: "David Kumar",
    image: "/placeholder.svg?height=400&width=600",
    price: 99.99,
    rating: 4.8,
    students: 9321,
    category: "Development",
  },
]

const UPCOMING_EVENTS = [
  {
    id: "1",
    title: "Live Q&A: Web Development Career Paths",
    date: "May 15, 2023",
    time: "2:00 PM - 3:30 PM EST",
    instructor: "Sarah Johnson",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "2",
    title: "Workshop: Building Your First React App",
    date: "May 22, 2023",
    time: "1:00 PM - 4:00 PM EST",
    instructor: "David Kumar",
    image: "/placeholder.svg?height=200&width=200",
  },
]

const CERTIFICATES = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    issueDate: "March 15, 2023",
    instructor: "Sarah Johnson",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Welcome back! Track your progress and continue learning.">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
          >
            Continue Learning
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-8">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Continue Learning</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/my-courses">
                View All Courses <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6">
            {ENROLLED_COURSES.slice(0, 1).map((course) => (
              <Card key={course.id} className="overflow-hidden bg-card border-border">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-3">
                    <div className="relative aspect-video md:aspect-auto">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <Button size="lg" className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
                          <PlayCircle className="h-8 w-8 text-white fill-white" />
                        </Button>
                      </div>
                    </div>
                    <div className="md:col-span-2 p-6">
                      <div className="flex flex-col h-full">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-medium text-muted-foreground">{course.category}</div>
                            <div className="text-sm text-muted-foreground">Last accessed: {course.lastAccessed}</div>
                          </div>
                          <h3 className="text-xl font-bold mb-2 text-foreground">{course.title}</h3>
                          <p className="text-muted-foreground text-sm mb-4">By {course.instructor}</p>
                        </div>

                        <div className="mt-auto space-y-4">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm text-foreground">
                              <span>Progress</span>
                              <span className="font-medium">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                            <div className="text-xs text-muted-foreground">
                              {course.completedLectures} of {course.totalLectures} lectures completed
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 bg-secondary rounded-lg p-3">
                              <div className="text-xs text-muted-foreground mb-1">Next Lesson</div>
                              <div className="font-medium text-secondary-foreground">{course.nextLesson}</div>
                            </div>
                            <Button
                              className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                              asChild
                            >
                              <Link href={`/courses/${course.id}/learn`}>Continue Learning</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Tabs defaultValue="enrolled" className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <TabsList>
                    <TabsTrigger value="enrolled">My Courses</TabsTrigger>
                    <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                  </TabsList>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="search"
                      placeholder="Search courses..."
                      className="pl-8 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>

                <TabsContent value="enrolled" className="space-y-4">
                  {ENROLLED_COURSES.map((course) => (
                    <Card key={course.id} className="overflow-hidden bg-card border-border">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-48 relative aspect-video sm:aspect-square">
                            <img
                              src={course.image || "/placeholder.svg"}
                              alt={course.title}
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                              {course.progress}%
                            </div>
                          </div>
                          <div className="flex-1 p-4">
                            <h3 className="font-bold mb-1 text-foreground">{course.title}</h3>
                            <p className="text-muted-foreground text-sm mb-2">By {course.instructor}</p>

                            <div className="space-y-2 mb-3">
                              <Progress value={course.progress} className="h-1.5" />
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>
                                  {course.completedLectures} / {course.totalLectures} lectures
                                </span>
                                <span>Last accessed: {course.lastAccessed}</span>
                              </div>
                            </div>

                            <div className="flex justify-end">
                              <Button size="sm" asChild>
                                <Link href={`/courses/${course.id}/learn`}>Continue</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="wishlist" className="space-y-4">
                  {WISHLIST_COURSES.map((course) => (
                    <Card key={course.id} className="overflow-hidden bg-card border-border">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-48 relative aspect-video sm:aspect-square">
                            <img
                              src={course.image || "/placeholder.svg"}
                              alt={course.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-4">
                            <h3 className="font-bold mb-1 text-foreground">{course.title}</h3>
                            <p className="text-muted-foreground text-sm mb-2">By {course.instructor}</p>

                            <div className="flex items-center gap-4 text-sm mb-3">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-amber-400 fill-amber-400 mr-1" />
                                <span>{course.rating}</span>
                              </div>
                              <div>{course.students.toLocaleString()} students</div>
                              <div className="font-bold">${course.price}</div>
                            </div>

                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="outline">
                                <Heart className="h-4 w-4 mr-1" /> Remove
                              </Button>
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                              >
                                Enroll Now
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
                  <h3 className="font-bold mb-4 text-foreground">Upcoming Events</h3>
                  {UPCOMING_EVENTS.length > 0 ? (
                    <div className="space-y-4">
                      {UPCOMING_EVENTS.map((event) => (
                        <div key={event.id} className="flex gap-3">
                          <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                            <img
                              src={event.image || "/placeholder.svg"}
                              alt={event.instructor}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-foreground">{event.title}</h4>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <Calendar className="h-3 w-3 mr-1" />
                              {event.date}, {event.time}
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="w-full">
                        View All Events
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Calendar className="h-10 w-10 text-neutral-300 dark:text-neutral-700 mx-auto mb-2" />
                      <h4 className="font-medium text-foreground">No upcoming events</h4>
                      <p className="text-sm text-muted-foreground mb-4">Check back later for new events</p>
                      <Button variant="outline" size="sm">
                        Browse Events
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-5">
                  <h3 className="font-bold mb-4 text-foreground">My Certificates</h3>
                  {CERTIFICATES.length > 0 ? (
                    <div className="space-y-4">
                      {CERTIFICATES.map((certificate) => (
                        <div key={certificate.id} className="border dark:border-neutral-700 rounded-lg overflow-hidden">
                          <img
                            src={certificate.image || "/placeholder.svg"}
                            alt={certificate.title}
                            className="w-full aspect-[3/2] object-cover"
                          />
                          <div className="p-3 bg-background">
                            <h4 className="font-medium text-sm text-foreground">{certificate.title}</h4>
                            <div className="text-xs text-muted-foreground mt-1">Issued on {certificate.issueDate}</div>
                            <Button variant="link" size="sm" className="px-0 h-auto text-rose-600">
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="w-full">
                        View All Certificates
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Certificate className="h-10 w-10 text-neutral-300 dark:text-neutral-700 mx-auto mb-2" />
                      <h4 className="font-medium text-foreground">No certificates yet</h4>
                      <p className="text-sm text-muted-foreground mb-4">Complete a course to earn your first certificate</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Recommended For You</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/courses">
                Browse All Courses <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <Card key={i} className="overflow-hidden bg-card border-border">
                  <CardContent className="p-0">
                    <div className="relative aspect-video">
                      <img
                        src="/placeholder.svg?height=400&width=600"
                        alt="Course thumbnail"
                        className="h-full w-full object-cover"
                      />
                      {i === 0 && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                          Bestseller
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-1 line-clamp-2 text-foreground">
                        {
                          [
                            "JavaScript Mastery: Zero to Expert",
                            "React & Redux for Beginners",
                            "Node.js: The Complete Guide",
                            "Full-Stack Web Development Boot Camp",
                          ][i]
                        }
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        By {["Alex Rivera", "Emma Phillips", "Michael Chen", "David Kumar"][i]}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                          <span className="text-sm font-medium ml-1 text-foreground">{[4.9, 4.6, 4.7, 4.8][i]}</span>
                        </div>
                        <div className="font-bold text-foreground">${[19.99, 14.99, 16.99, 12.99][i]}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>
      </div>
    </DashboardShell>
  )
}
