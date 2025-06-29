import { useEffect, useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/AuthContext"
import { courses } from "@/lib/courses"
import { Search, Filter, BookOpen, Clock, Award, Play, Download, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function MyCoursesPage() {
  const { user } = useAuth()
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [filteredEnrollments, setFilteredEnrollments] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadEnrollments()
    }
  }, [user])

  useEffect(() => {
    filterCourses()
  }, [enrollments, searchTerm, filterStatus])

  const loadEnrollments = async () => {
    if (!user) return
    
    try {
      const { data, error } = await courses.getUserEnrollments(user.id)
      if (data && !error) {
        setEnrollments(data)
      }
    } catch (error) {
      console.error('Error loading enrollments:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterCourses = () => {
    let filtered = [...enrollments]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(enrollment =>
        enrollment.courses?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.courses?.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    switch (filterStatus) {
      case "in-progress":
        filtered = filtered.filter(e => e.progress > 0 && e.progress < 100)
        break
      case "completed":
        filtered = filtered.filter(e => e.progress === 100)
        break
      case "not-started":
        filtered = filtered.filter(e => e.progress === 0)
        break
    }

    setFilteredEnrollments(filtered)
  }

  const getStatusBadge = (progress: number) => {
    if (progress === 0) return <Badge variant="outline">Not Started</Badge>
    if (progress === 100) return <Badge className="bg-green-600">Completed</Badge>
    return <Badge variant="secondary">In Progress</Badge>
  }

  const getLastWatched = (enrollmentId: string) => {
    // Mock data - in real app, this would come from the database
    const lastWatched = localStorage.getItem(`last-watched-${enrollmentId}`)
    return lastWatched ? new Date(lastWatched) : null
  }

  if (loading) {
    return (
      <PageLayout>
        <div className="container py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
          </div>
        </div>
      </PageLayout>
    )
  }

  const inProgressCourses = enrollments.filter(e => e.progress > 0 && e.progress < 100)
  const completedCourses = enrollments.filter(e => e.progress === 100)
  const notStartedCourses = enrollments.filter(e => e.progress === 0)

  return (
    <PageLayout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Courses</h1>
          <p className="text-muted-foreground">Manage and continue your learning journey</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{enrollments.length}</p>
                  <p className="text-sm text-muted-foreground">Total Courses</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">{inProgressCourses.length}</p>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{completedCourses.length}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {Math.round((completedCourses.length / Math.max(enrollments.length, 1)) * 100)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="all">All Courses</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="not-started">Not Started</option>
          </select>
        </div>

        {/* Course Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({enrollments.length})</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress ({inProgressCourses.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedCourses.length})</TabsTrigger>
            <TabsTrigger value="not-started">Not Started ({notStartedCourses.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <CourseGrid courses={filteredEnrollments} />
          </TabsContent>

          <TabsContent value="in-progress" className="mt-6">
            <CourseGrid courses={inProgressCourses.filter(course => 
              !searchTerm || course.courses?.title.toLowerCase().includes(searchTerm.toLowerCase())
            )} />
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <CourseGrid courses={completedCourses.filter(course => 
              !searchTerm || course.courses?.title.toLowerCase().includes(searchTerm.toLowerCase())
            )} />
          </TabsContent>

          <TabsContent value="not-started" className="mt-6">
            <CourseGrid courses={notStartedCourses.filter(course => 
              !searchTerm || course.courses?.title.toLowerCase().includes(searchTerm.toLowerCase())
            )} />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}

function CourseGrid({ courses }: { courses: any[] }) {
  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No courses found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((enrollment, index) => (
        <motion.div
          key={enrollment.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="h-full overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="relative aspect-video overflow-hidden">
              <img
                src={enrollment.courses?.image_url || "/placeholder.svg?height=200&width=300"}
                alt={enrollment.courses?.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button asChild size="sm" className="bg-white text-black hover:bg-white/90">
                  <Link to={`/courses/${enrollment.courses?.id}/learn`}>
                    <Play className="h-4 w-4 mr-2" />
                    {enrollment.progress === 0 ? 'Start Learning' : 'Continue'}
                  </Link>
                </Button>
              </div>
              <div className="absolute top-3 right-3">
                {getStatusBadge(enrollment.progress)}
              </div>
            </div>

            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg line-clamp-2 mb-2">
                    {enrollment.courses?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    by {enrollment.courses?.profiles?.full_name}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{enrollment.progress}%</span>
                  </div>
                  <Progress value={enrollment.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{enrollment.courses?.duration_hours}h</span>
                  </div>
                  <div>
                    Enrolled {new Date(enrollment.enrolled_at).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button asChild className="flex-1" size="sm">
                    <Link to={`/courses/${enrollment.courses?.id}/learn`}>
                      {enrollment.progress === 0 ? 'Start' : 'Continue'}
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                {enrollment.progress === 100 && (
                  <Button variant="outline" size="sm" className="w-full">
                    <Award className="h-4 w-4 mr-2" />
                    Download Certificate
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

function getStatusBadge(progress: number) {
  if (progress === 0) return <Badge variant="outline">Not Started</Badge>
  if (progress === 100) return <Badge className="bg-green-600">Completed</Badge>
  return <Badge variant="secondary">In Progress</Badge>
}