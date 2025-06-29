import { useEffect, useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"
import { courses } from "@/lib/courses"
import { BookOpen, Clock, Award, TrendingUp, Play, Calendar, Target, Trophy, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earned: boolean
  earnedAt?: Date
}

interface RecentActivity {
  id: string
  type: 'video_watched' | 'quiz_completed' | 'assignment_submitted' | 'course_completed'
  title: string
  courseName: string
  timestamp: Date
  progress?: number
}

export default function DashboardPage() {
  const { user, profile } = useAuth()
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [upcomingDeadlines, setUpcomingDeadlines] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadDashboardData()
    }
  }, [user])

  const loadDashboardData = async () => {
    if (!user) return
    
    try {
      const { data, error } = await courses.getUserEnrollments(user.id)
      if (data && !error) {
        setEnrollments(data)
      }

      // Load recent activity (mock data for now)
      setRecentActivity([
        {
          id: '1',
          type: 'video_watched',
          title: 'Introduction to React Hooks',
          courseName: 'Complete Web Development Bootcamp',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          progress: 75
        },
        {
          id: '2',
          type: 'quiz_completed',
          title: 'JavaScript Fundamentals Quiz',
          courseName: 'Complete Web Development Bootcamp',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        },
        {
          id: '3',
          type: 'assignment_submitted',
          title: 'Build a Todo App',
          courseName: 'Complete Web Development Bootcamp',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        }
      ])

      // Load achievements (mock data)
      setAchievements([
        {
          id: '1',
          title: 'First Course',
          description: 'Enrolled in your first course',
          icon: '🎯',
          earned: true,
          earnedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        },
        {
          id: '2',
          title: 'Video Watcher',
          description: 'Watched 10 hours of video content',
          icon: '📺',
          earned: true,
          earnedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        },
        {
          id: '3',
          title: 'Quiz Master',
          description: 'Completed 5 quizzes with 90%+ score',
          icon: '🧠',
          earned: false
        },
        {
          id: '4',
          title: 'Course Completer',
          description: 'Complete your first course',
          icon: '🏆',
          earned: false
        }
      ])

      // Load upcoming deadlines (mock data)
      setUpcomingDeadlines([
        {
          id: '1',
          title: 'Final Project Submission',
          courseName: 'Complete Web Development Bootcamp',
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
          type: 'assignment'
        },
        {
          id: '2',
          title: 'Module 3 Quiz',
          courseName: 'UI/UX Design Masterclass',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          type: 'quiz'
        }
      ])

    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const completedCourses = enrollments.filter(e => e.progress === 100).length
  const inProgressCourses = enrollments.filter(e => e.progress > 0 && e.progress < 100).length
  const totalHours = enrollments.reduce((acc, e) => acc + (e.courses?.duration_hours || 0), 0)
  const earnedAchievements = achievements.filter(a => a.earned).length

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'video_watched': return <Play className="h-4 w-4" />
      case 'quiz_completed': return <Target className="h-4 w-4" />
      case 'assignment_submitted': return <BookOpen className="h-4 w-4" />
      case 'course_completed': return <Trophy className="h-4 w-4" />
      default: return <BookOpen className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'video_watched': return 'text-blue-600'
      case 'quiz_completed': return 'text-green-600'
      case 'assignment_submitted': return 'text-orange-600'
      case 'course_completed': return 'text-purple-600'
      default: return 'text-gray-600'
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

  const formatDaysUntil = (date: Date) => {
    const now = new Date()
    const diffInDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return 'Due today'
    if (diffInDays === 1) return 'Due tomorrow'
    return `Due in ${diffInDays} days`
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {profile?.full_name || user?.email}!</h1>
          <p className="text-muted-foreground mt-2">Continue your learning journey</p>
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
                <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{enrollments.length}</div>
                <p className="text-xs text-muted-foreground">
                  {inProgressCourses} in progress
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
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedCourses}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((completedCourses / Math.max(enrollments.length, 1)) * 100)}% completion rate
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
                <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalHours}</div>
                <p className="text-xs text-muted-foreground">
                  Total content hours
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
                <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{earnedAchievements}</div>
                <p className="text-xs text-muted-foreground">
                  {achievements.length - earnedAchievements} more to unlock
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <Card>
              <CardHeader>
                <CardTitle>Continue Learning</CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </CardHeader>
              <CardContent>
                {enrollments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">You haven't enrolled in any courses yet.</p>
                    <Button asChild>
                      <Link to="/courses">Browse Courses</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enrollments.slice(0, 3).map((enrollment, index) => (
                      <motion.div
                        key={enrollment.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={enrollment.courses?.image_url || "/placeholder.svg?height=60&width=60"}
                            alt={enrollment.courses?.title}
                            className="w-16 h-16 rounded object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium">{enrollment.courses?.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              by {enrollment.courses?.profiles?.full_name}
                            </p>
                            <div className="flex items-center mt-2 gap-2">
                              <Progress value={enrollment.progress} className="flex-1 max-w-[200px]" />
                              <span className="text-xs text-muted-foreground">{enrollment.progress}%</span>
                            </div>
                          </div>
                        </div>
                        <Button asChild size="sm">
                          <Link to={`/courses/${enrollment.courses?.id}/learn`}>
                            {enrollment.progress === 0 ? 'Start' : 'Continue'}
                          </Link>
                        </Button>
                      </motion.div>
                    ))}
                    {enrollments.length > 3 && (
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

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your learning activity over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                {recentActivity.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No recent activity</p>
                ) : (
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className={`p-2 rounded-full bg-muted ${getActivityColor(activity.type)}`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.courseName}</p>
                          <p className="text-xs text-muted-foreground">{formatTimeAgo(activity.timestamp)}</p>
                        </div>
                        {activity.progress && (
                          <Badge variant="outline">{activity.progress}%</Badge>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingDeadlines.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No upcoming deadlines</p>
                ) : (
                  <div className="space-y-3">
                    {upcomingDeadlines.map((deadline, index) => (
                      <motion.div
                        key={deadline.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-3 border rounded-lg"
                      >
                        <h4 className="font-medium text-sm">{deadline.title}</h4>
                        <p className="text-xs text-muted-foreground">{deadline.courseName}</p>
                        <Badge 
                          variant={deadline.dueDate.getTime() - Date.now() < 2 * 24 * 60 * 60 * 1000 ? "destructive" : "outline"}
                          className="mt-2"
                        >
                          {formatDaysUntil(deadline.dueDate)}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`p-3 border rounded-lg ${achievement.earned ? 'bg-muted/50' : 'opacity-50'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{achievement.title}</h4>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                          {achievement.earned && achievement.earnedAt && (
                            <p className="text-xs text-green-600 mt-1">
                              Earned {formatTimeAgo(achievement.earnedAt)}
                            </p>
                          )}
                        </div>
                        {achievement.earned && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Earned
                          </Badge>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/courses">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Browse Courses
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/dashboard/progress">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Progress
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/help-center">
                    <Star className="h-4 w-4 mr-2" />
                    Get Help
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}