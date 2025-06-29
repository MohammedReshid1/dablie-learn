import { useEffect, useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"
import { courses } from "@/lib/courses"
import { 
  BookOpen, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Eye, 
  Star, 
  MessageCircle,
  Award,
  Plus,
  BarChart3
} from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

interface CourseAnalytics {
  courseId: string
  title: string
  students: number
  revenue: number
  rating: number
  completionRate: number
  recentEnrollments: number
}

export default function InstructorDashboardPage() {
  const { user, profile } = useAuth()
  const [instructorCourses, setInstructorCourses] = useState<any[]>([])
  const [analytics, setAnalytics] = useState<CourseAnalytics[]>([])
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadInstructorData()
    }
  }, [user])

  const loadInstructorData = async () => {
    if (!user) return
    
    try {
      const { data, error } = await courses.getInstructorCourses(user.id)
      if (data && !error) {
        setInstructorCourses(data)
        
        // Generate mock analytics for each course
        const mockAnalytics: CourseAnalytics[] = data.map((course: any) => ({
          courseId: course.id,
          title: course.title,
          students: Math.floor(Math.random() * 1000) + 100,
          revenue: Math.floor(Math.random() * 5000) + 500,
          rating: 4.2 + Math.random() * 0.7,
          completionRate: Math.floor(Math.random() * 40) + 60,
          recentEnrollments: Math.floor(Math.random() * 20) + 5
        }))
        setAnalytics(mockAnalytics)
      }

      // Load recent activity (mock data)
      setRecentActivity([
        {
          id: '1',
          type: 'new_enrollment',
          message: 'New student enrolled in "Complete Web Development Bootcamp"',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          courseTitle: 'Complete Web Development Bootcamp'
        },
        {
          id: '2',
          type: 'review',
          message: 'New 5-star review on "UI/UX Design Masterclass"',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
          courseTitle: 'UI/UX Design Masterclass'
        },
        {
          id: '3',
          type: 'completion',
          message: '15 students completed "Data Science Fundamentals"',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          courseTitle: 'Data Science Fundamentals'
        },
        {
          id: '4',
          type: 'payout',
          message: 'Monthly payout of $2,450 processed',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        }
      ])

    } catch (error) {
      console.error('Error loading instructor data:', error)
    } finally {
      setLoading(false)
    }
  }

  const totalStudents = analytics.reduce((sum, course) => sum + course.students, 0)
  const totalRevenue = analytics.reduce((sum, course) => sum + course.revenue, 0)
  const averageRating = analytics.length > 0 
    ? analytics.reduce((sum, course) => sum + course.rating, 0) / analytics.length 
    : 0
  const averageCompletion = analytics.length > 0
    ? analytics.reduce((sum, course) => sum + course.completionRate, 0) / analytics.length
    : 0

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'new_enrollment': return <Users className="h-4 w-4 text-blue-600" />
      case 'review': return <Star className="h-4 w-4 text-yellow-600" />
      case 'completion': return <Award className="h-4 w-4 text-green-600" />
      case 'payout': return <DollarSign className="h-4 w-4 text-purple-600" />
      default: return <MessageCircle className="h-4 w-4" />
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
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
            <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back, {profile?.full_name || user?.email}!
            </p>
          </div>
          <Button asChild className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600">
            <Link to="/instructor/courses/new">
              <Plus className="h-4 w-4 mr-2" />
              Create Course
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStudents.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Across {instructorCourses.length} courses
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  This month: +12%
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
                <p className="text-xs text-muted-foreground">
                  Based on student reviews
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageCompletion.toFixed(0)}%</div>
                <p className="text-xs text-muted-foreground">
                  Average across courses
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Course Performance</CardTitle>
                <CardDescription>Overview of your course analytics</CardDescription>
              </CardHeader>
              <CardContent>
                {instructorCourses.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">You haven't created any courses yet.</p>
                    <Button asChild>
                      <Link to="/instructor/courses/new">Create Your First Course</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {analytics.slice(0, 5).map((course, index) => (
                      <motion.div
                        key={course.courseId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium">{course.title}</h3>
                          <Badge variant="outline">
                            {course.recentEnrollments} new this week
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Students</p>
                            <p className="font-medium">{course.students}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Revenue</p>
                            <p className="font-medium">${course.revenue}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Rating</p>
                            <p className="font-medium flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              {course.rating.toFixed(1)}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Completion</p>
                            <p className="font-medium">{course.completionRate}%</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <Progress value={course.completionRate} className="h-2" />
                        </div>
                      </motion.div>
                    ))}
                    <div className="text-center pt-4">
                      <Button variant="outline" asChild>
                        <Link to="/instructor/courses">View All Courses</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="p-2 rounded-full bg-muted">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatTimeAgo(activity.timestamp)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/instructor/courses/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Course
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/instructor/courses">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Manage Courses
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/instructor/students/progress">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Student Analytics
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/instructor/revenue">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Revenue Reports
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Monthly Earnings */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      ${(totalRevenue * 0.7).toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground">This month</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Course Sales</span>
                      <span>${(totalRevenue * 0.6).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Bonuses</span>
                      <span>${(totalRevenue * 0.1).toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-medium">
                        <span>Total Earnings</span>
                        <span>${(totalRevenue * 0.7).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    View Detailed Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Course */}
            {analytics.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Course</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const topCourse = analytics.reduce((prev, current) => 
                      prev.revenue > current.revenue ? prev : current
                    )
                    return (
                      <div className="space-y-3">
                        <h3 className="font-medium">{topCourse.title}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Students</span>
                            <span>{topCourse.students}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Revenue</span>
                            <span>${topCourse.revenue}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Rating</span>
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              {topCourse.rating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          View Details
                        </Button>
                      </div>
                    )
                  })()}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}