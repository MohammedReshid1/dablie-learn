"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart, Calendar, Clock, Award, BookOpen, CheckCircle } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

// Mock data for demonstration
const enrolledCourses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    progress: 75,
    lastAccessed: "2023-04-15T10:30:00",
    completedLessons: 9,
    totalLessons: 12,
    quizScores: [85, 90, 78],
    category: "Development",
    instructor: "Jane Smith",
    certificateEligible: true,
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts",
    progress: 45,
    lastAccessed: "2023-04-14T14:20:00",
    completedLessons: 5,
    totalLessons: 15,
    quizScores: [92, 88],
    category: "Development",
    instructor: "John Doe",
    certificateEligible: false,
  },
  {
    id: 3,
    title: "UX Design Fundamentals",
    progress: 20,
    lastAccessed: "2023-04-10T09:15:00",
    completedLessons: 2,
    totalLessons: 10,
    quizScores: [75],
    category: "Design",
    instructor: "Sarah Johnson",
    certificateEligible: false,
  },
]

export default function ProgressPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Calculate overall statistics
  const overallProgress = enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length
  const totalCompletedLessons = enrolledCourses.reduce((sum, course) => sum + course.completedLessons, 0)
  const totalLessons = enrolledCourses.reduce((sum, course) => sum + course.totalLessons, 0)
  const averageQuizScore =
    enrolledCourses.reduce((sum, course) => {
      const courseAvg =
        course.quizScores.length > 0 ? course.quizScores.reduce((a, b) => a + b, 0) / course.quizScores.length : 0
      return sum + courseAvg
    }, 0) / enrolledCourses.length

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Learning Progress</h1>
          <p className="text-muted-foreground">Track your progress across all enrolled courses</p>
        </div>

        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="analytics" className="hidden md:block">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Overall Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{Math.round(overallProgress)}%</div>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Progress value={overallProgress} className="h-2 mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Completed Lessons</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">
                      {totalCompletedLessons}/{totalLessons}
                    </div>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Progress value={(totalCompletedLessons / totalLessons) * 100} className="h-2 mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Average Quiz Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{Math.round(averageQuizScore)}%</div>
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Progress value={averageQuizScore} className="h-2 mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Enrolled Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{enrolledCourses.length}</div>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your learning activity from the past 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enrolledCourses
                    .sort((a, b) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime())
                    .map((course) => (
                      <div key={course.id} className="flex items-start space-x-4 pb-4 border-b last:border-0">
                        <div className="rounded-md bg-primary/10 p-2">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">{course.title}</p>
                          <div className="flex items-center pt-1">
                            <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">
                              Last accessed {formatDate(course.lastAccessed)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Badge variant="outline">{course.progress}% complete</Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {enrolledCourses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{course.title}</CardTitle>
                      <Badge>{course.category}</Badge>
                    </div>
                    <CardDescription>Instructor: {course.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Completed Lessons</span>
                        <span className="font-medium">
                          {course.completedLessons}/{course.totalLessons}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Quiz Average</span>
                        <span className="font-medium">
                          {course.quizScores.length > 0
                            ? `${Math.round(course.quizScores.reduce((a, b) => a + b, 0) / course.quizScores.length)}%`
                            : "No quizzes taken"}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Last Accessed</span>
                        <span className="font-medium">{formatDate(course.lastAccessed)}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div>
                        {course.certificateEligible && (
                          <div className="flex items-center text-sm text-green-600 dark:text-green-500">
                            <Award className="h-4 w-4 mr-1" />
                            <span>Certificate eligible</span>
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <a
                          href={`/courses/${course.id}/learn`}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                        >
                          Continue Learning
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
                <CardDescription>Badges and certificates you've earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <div className="rounded-full bg-primary/10 p-3 mb-2">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-center">First Course Completed</h3>
                    <p className="text-xs text-muted-foreground text-center mt-1">Earned on Apr 10, 2023</p>
                  </div>

                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <div className="rounded-full bg-primary/10 p-3 mb-2">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-center">Perfect Quiz Score</h3>
                    <p className="text-xs text-muted-foreground text-center mt-1">Earned on Mar 22, 2023</p>
                  </div>

                  <div className="flex flex-col items-center p-4 border rounded-lg opacity-50">
                    <div className="rounded-full bg-muted p-3 mb-2">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium text-center">7-Day Streak</h3>
                    <p className="text-xs text-muted-foreground text-center mt-1">Not yet earned</p>
                  </div>

                  <div className="flex flex-col items-center p-4 border rounded-lg opacity-50">
                    <div className="rounded-full bg-muted p-3 mb-2">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium text-center">Course Creator</h3>
                    <p className="text-xs text-muted-foreground text-center mt-1">Not yet earned</p>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-medium mb-4">Your Certificates</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="rounded-md bg-primary/10 p-2">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Introduction to Web Development</p>
                          <p className="text-sm text-muted-foreground">Issued on Apr 10, 2023</p>
                        </div>
                      </div>
                      <button className="text-sm text-primary hover:underline">View</button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Analytics</CardTitle>
                <CardDescription>Detailed insights about your learning patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="font-medium mb-4">Weekly Learning Hours</h3>
                    <div className="h-[200px] w-full bg-muted/20 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Chart visualization would appear here</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Performance by Category</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Development</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Design</span>
                          <span>75%</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Business</span>
                          <span>60%</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Marketing</span>
                          <span>40%</span>
                        </div>
                        <Progress value={40} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Learning Habits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Most Active Day</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">Wednesday</p>
                          <p className="text-sm text-muted-foreground">2.5 hours on average</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Most Active Time</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">8:00 PM</p>
                          <p className="text-sm text-muted-foreground">Evening learner</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Average Session</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">45 min</p>
                          <p className="text-sm text-muted-foreground">Focused learning</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
