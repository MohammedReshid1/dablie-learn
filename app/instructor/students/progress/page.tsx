"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Search, ArrowUpDown, BarChart3, BookOpen, CheckCircle2, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Define interfaces for mock data
interface Course {
  id: number
  title: string
}

interface Student {
  id: number
  name: string
  email: string
  enrolledCourses: number[]
  progress: { [key: number]: number }
  quizScores: { [key: number]: number[] }
  lastActive: string
  completionRate: number
}

// Mock data for demonstration
const courses: Course[] = [
  { id: 1, title: "Introduction to Web Development" },
  { id: 2, title: "Advanced JavaScript Concepts" },
  { id: 3, title: "UX Design Fundamentals" },
]

const students: Student[] = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    enrolledCourses: [1, 2],
    progress: {
      1: 85, // course id: progress percentage
      2: 42,
    },
    quizScores: {
      1: [90, 85, 92],
      2: [78, 80],
    },
    lastActive: "2023-04-15T10:30:00",
    completionRate: 78,
  },
  {
    id: 2,
    name: "Jamie Smith",
    email: "jamie@example.com",
    enrolledCourses: [1, 3],
    progress: {
      1: 100,
      3: 35,
    },
    quizScores: {
      1: [95, 88, 90],
      3: [75],
    },
    lastActive: "2023-04-16T14:20:00",
    completionRate: 92,
  },
  {
    id: 3,
    name: "Taylor Brown",
    email: "taylor@example.com",
    enrolledCourses: [2],
    progress: {
      2: 68,
    },
    quizScores: {
      2: [82, 79],
    },
    lastActive: "2023-04-14T09:15:00",
    completionRate: 65,
  },
  {
    id: 4,
    name: "Morgan Wilson",
    email: "morgan@example.com",
    enrolledCourses: [1, 2, 3],
    progress: {
      1: 95,
      2: 60,
      3: 25,
    },
    quizScores: {
      1: [88, 92, 90],
      2: [75, 80],
      3: [70],
    },
    lastActive: "2023-04-16T11:45:00",
    completionRate: 85,
  },
  {
    id: 5,
    name: "Casey Davis",
    email: "casey@example.com",
    enrolledCourses: [3],
    progress: {
      3: 15,
    },
    quizScores: {
      3: [65],
    },
    lastActive: "2023-04-10T16:30:00",
    completionRate: 40,
  },
]

export default function InstructorStudentProgress() {
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Calculate overall statistics
  const calculateStats = () => {
    const totalStudents = students.length
    const averageCompletionRate = students.reduce((sum, student) => sum + student.completionRate, 0) / totalStudents

    const courseEnrollments: { [key: number]: number } = {}
    courses.forEach((course) => {
      courseEnrollments[course.id] = students.filter((student) => student.enrolledCourses.includes(course.id)).length
    })

    const averageQuizScore =
      students.reduce((sum, student: Student) => {
        let studentAvg = 0
        let quizCount = 0

        Object.keys(student.quizScores).forEach((courseId) => {
          const scores = student.quizScores[Number(courseId)]
          if (scores && scores.length > 0) {
            studentAvg += scores.reduce((a: number, b: number) => a + b, 0)
            quizCount += scores.length
          }
        })

        return sum + (quizCount > 0 ? studentAvg / quizCount : 0)
      }, 0) / totalStudents

    return {
      totalStudents,
      averageCompletionRate,
      courseEnrollments,
      averageQuizScore,
    }
  }

  const stats = calculateStats()

  // Filter and sort students
  const filteredStudents = students
    .filter((student) => {
      // Filter by course if selected
      if (selectedCourse !== "all" && !student.enrolledCourses.includes(Number.parseInt(selectedCourse))) {
        return false
      }

      // Filter by search query
      if (
        searchQuery &&
        !student.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !student.email.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      return true
    })
    .sort((a: Student, b: Student) => {
      // Sort by selected field
      let comparison = 0

      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "progress":
          const aProgress = selectedCourse !== "all" ? a.progress[Number(selectedCourse)] || 0 : a.completionRate
          const bProgress = selectedCourse !== "all" ? b.progress[Number(selectedCourse)] || 0 : b.completionRate
          comparison = aProgress - bProgress
          break
        case "lastActive":
          comparison = new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime()
          break
        default:
          comparison = 0
      }

      return sortOrder === "asc" ? comparison : -comparison
    })

  // Toggle sort order
  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  // Get average quiz score for a student in a specific course
  const getStudentCourseQuizAverage = (student: Student, courseId: number) => {
    const scores = student.quizScores[courseId]
    if (!scores || scores.length === 0) return "No quizzes"

    const avg = scores.reduce((a: number, b: number) => a + b, 0) / scores.length
    return `${Math.round(avg)}%`
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Student Progress</h1>
          <p className="text-muted-foreground">Monitor and analyze student performance across your courses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{stats.totalStudents}</div>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{Math.round(stats.averageCompletionRate)}%</div>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </div>
              <Progress value={stats.averageCompletionRate} className="h-2 mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Quiz Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{Math.round(stats.averageQuizScore)}%</div>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Most Popular Course</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-md font-medium truncate">
                  {(() => {
                    const enrollments = stats.courseEnrollments
                    const mostPopularId = Object.keys(enrollments).reduce((a, b) =>
                      enrollments[Number(a)] > enrollments[Number(b)] ? a : b,
                    )
                    const course = courses.find((c) => c.id === Number.parseInt(mostPopularId))
                    return course ? course.title : "None"
                  })()}
                </div>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search students..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id.toString()}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-sm text-muted-foreground">
                {filteredStudents.length} {filteredStudents.length === 1 ? "student" : "students"} found
              </span>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">
                    <Button
                      variant="ghost"
                      className="p-0 font-medium flex items-center"
                      onClick={() => toggleSort("name")}
                    >
                      Student
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Enrolled Courses</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="p-0 font-medium flex items-center"
                      onClick={() => toggleSort("progress")}
                    >
                      Progress
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Quiz Scores</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="p-0 font-medium flex items-center"
                      onClick={() => toggleSort("lastActive")}
                    >
                      Last Active
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No students found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        <div>
                          {student.name}
                          <div className="text-sm text-muted-foreground">{student.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {student.enrolledCourses.map((courseId) => {
                            const course = courses.find((c) => c.id === courseId)
                            return course ? (
                              <Badge key={courseId} variant="outline">
                                {course.title}
                              </Badge>
                            ) : null
                          })}
                        </div>
                      </TableCell>
                      <TableCell>
                        {selectedCourse !== "all" ? (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>{student.progress[Number(selectedCourse)] || 0}%</span>
                            </div>
                            <Progress value={student.progress[Number(selectedCourse)] || 0} className="h-2" />
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>{student.completionRate}%</span>
                            </div>
                            <Progress value={student.completionRate} className="h-2" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {selectedCourse !== "all" ? (
                          <div className="text-sm">
                            {getStudentCourseQuizAverage(student, Number.parseInt(selectedCourse))}
                          </div>
                        ) : (
                          <div className="space-y-1">
                            {student.enrolledCourses.map((courseId) => {
                              const course = courses.find((c) => c.id === courseId)
                              return course ? (
                                <div key={courseId} className="text-xs flex justify-between">
                                  <span className="text-muted-foreground truncate mr-2">{course.title}:</span>
                                  <span>{getStudentCourseQuizAverage(student, courseId)}</span>
                                </div>
                              ) : null
                            })}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(student.lastActive)}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
