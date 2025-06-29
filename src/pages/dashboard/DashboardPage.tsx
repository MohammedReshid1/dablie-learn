import { useEffect, useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { courses } from "@/lib/courses"
import { BookOpen, Clock, Award, TrendingUp } from "lucide-react"
import { Link } from "react-router-dom"

export default function DashboardPage() {
  const { user, profile } = useAuth()
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadEnrollments()
    }
  }, [user])

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

  const completedCourses = enrollments.filter(e => e.progress === 100).length
  const inProgressCourses = enrollments.filter(e => e.progress > 0 && e.progress < 100).length
  const totalHours = enrollments.reduce((acc, e) => acc + (e.courses?.duration_hours || 0), 0)

  return (
    <PageLayout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {profile?.full_name || user?.email}!</h1>
          <p className="text-muted-foreground mt-2">Continue your learning journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enrollments.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressCourses}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCourses}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHours}</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Courses */}
        <Card>
          <CardHeader>
            <CardTitle>Your Courses</CardTitle>
            <CardDescription>Continue where you left off</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading your courses...</div>
            ) : enrollments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">You haven't enrolled in any courses yet.</p>
                <Button asChild>
                  <Link to="/courses">Browse Courses</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {enrollments.slice(0, 5).map((enrollment) => (
                  <div key={enrollment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img
                        src={enrollment.courses?.image_url || "/placeholder.svg?height=60&width=60"}
                        alt={enrollment.courses?.title}
                        className="w-15 h-15 rounded object-cover"
                      />
                      <div>
                        <h3 className="font-medium">{enrollment.courses?.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          by {enrollment.courses?.profiles?.full_name}
                        </p>
                        <div className="flex items-center mt-1">
                          <div className="w-32 bg-secondary rounded-full h-2 mr-2">
                            <div
                              className="bg-gradient-to-r from-rose-500 to-orange-500 h-2 rounded-full"
                              style={{ width: `${enrollment.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{enrollment.progress}%</span>
                        </div>
                      </div>
                    </div>
                    <Button asChild size="sm">
                      <Link to={`/courses/${enrollment.courses?.id}/learn`}>
                        {enrollment.progress === 0 ? 'Start' : 'Continue'}
                      </Link>
                    </Button>
                  </div>
                ))}
                {enrollments.length > 5 && (
                  <div className="text-center pt-4">
                    <Button variant="outline" asChild>
                      <Link to="/dashboard/my-courses">View All Courses</Link>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}