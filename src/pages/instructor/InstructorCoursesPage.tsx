import { useEffect, useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"
import { courses } from "@/lib/courses"
import { 
  Search, 
  Plus, 
  Edit, 
  Eye, 
  MoreHorizontal, 
  Users, 
  DollarSign,
  Star,
  TrendingUp,
  Settings
} from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function InstructorCoursesPage() {
  const { user } = useAuth()
  const [instructorCourses, setInstructorCourses] = useState<any[]>([])
  const [filteredCourses, setFilteredCourses] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadCourses()
    }
  }, [user])

  useEffect(() => {
    filterCourses()
  }, [instructorCourses, searchTerm, filterStatus])

  const loadCourses = async () => {
    if (!user) return
    
    try {
      const { data, error } = await courses.getInstructorCourses(user.id)
      if (data && !error) {
        // Add mock analytics data
        const coursesWithAnalytics = data.map((course: any) => ({
          ...course,
          students: Math.floor(Math.random() * 1000) + 50,
          revenue: Math.floor(Math.random() * 5000) + 200,
          rating: 4.0 + Math.random() * 1.0,
          reviews: Math.floor(Math.random() * 200) + 10,
          completionRate: Math.floor(Math.random() * 40) + 60
        }))
        setInstructorCourses(coursesWithAnalytics)
      }
    } catch (error) {
      console.error('Error loading courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterCourses = () => {
    let filtered = [...instructorCourses]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    switch (filterStatus) {
      case "published":
        filtered = filtered.filter(course => course.is_published)
        break
      case "draft":
        filtered = filtered.filter(course => !course.is_published)
        break
    }

    setFilteredCourses(filtered)
  }

  const getStatusBadge = (course: any) => {
    if (!course.is_published) {
      return <Badge variant="outline">Draft</Badge>
    }
    return <Badge className="bg-green-600">Published</Badge>
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

  return (
    <PageLayout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Courses</h1>
            <p className="text-muted-foreground mt-2">
              Manage your courses and track their performance
            </p>
          </div>
          <Button asChild className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600">
            <Link to="/instructor/courses/new">
              <Plus className="h-4 w-4 mr-2" />
              Create Course
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {instructorCourses.reduce((sum, course) => sum + (course.students || 0), 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/20">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    ${instructorCourses.reduce((sum, course) => sum + (course.revenue || 0), 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
                  <Star className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {instructorCourses.length > 0 
                      ? (instructorCourses.reduce((sum, course) => sum + (course.rating || 0), 0) / instructorCourses.length).toFixed(1)
                      : '0.0'
                    }
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/20">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{instructorCourses.length}</p>
                  <p className="text-sm text-muted-foreground">Total Courses</p>
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
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Plus className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Create your first course to get started'}
            </p>
            <Button asChild>
              <Link to="/instructor/courses/new">Create Your First Course</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={course.image_url || "/placeholder.svg?height=200&width=300"}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      {getStatusBadge(course)}
                    </div>
                    <div className="absolute top-3 right-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="bg-black/50 hover:bg-black/70 text-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/courses/${course.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Course
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/instructor/courses/${course.id}/edit`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Course
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/instructor/courses/${course.id}/settings`}>
                              <Settings className="h-4 w-4 mr-2" />
                              Settings
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-bold text-lg line-clamp-2 mb-2">
                          {course.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {course.description || 'No description available'}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Students</p>
                          <p className="font-medium">{course.students || 0}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Revenue</p>
                          <p className="font-medium">${course.revenue || 0}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Rating</p>
                          <p className="font-medium flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {course.rating ? course.rating.toFixed(1) : '0.0'}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Price</p>
                          <p className="font-medium">${course.price || 0}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button asChild variant="outline" size="sm" className="flex-1">
                          <Link to={`/instructor/courses/${course.id}/edit`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Link>
                        </Button>
                        <Button asChild size="sm" className="flex-1">
                          <Link to={`/courses/${course.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  )
}