import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoPlayer } from "@/components/VideoPlayer"
import { courses } from "@/lib/courses"
import { useAuth } from "@/contexts/AuthContext"
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  MessageCircle, 
  FileText, 
  Award,
  CheckCircle,
  Play,
  Lock,
  Download
} from "lucide-react"
import { motion } from "framer-motion"

interface Lesson {
  id: string
  title: string
  type: 'video' | 'text' | 'quiz' | 'assignment'
  duration: number
  videoUrl?: string
  content?: string
  completed: boolean
  locked: boolean
}

interface Module {
  id: string
  title: string
  lessons: Lesson[]
  completed: boolean
}

export default function CourseLearnPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [course, setCourse] = useState<any>(null)
  const [enrollment, setEnrollment] = useState<any>(null)
  const [modules, setModules] = useState<Module[]>([])
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    if (id && user) {
      loadCourseData()
    }
  }, [id, user])

  const loadCourseData = async () => {
    if (!id || !user) return

    try {
      // Load course data
      const courseResult = await courses.getCourseById(id)
      if (courseResult.data) {
        setCourse(courseResult.data)
      }

      // Load enrollment data
      const enrollmentResult = await courses.checkEnrollment(id, user.id)
      if (enrollmentResult.data) {
        setEnrollment(enrollmentResult.data)
      }

      // Load course modules and lessons (mock data for now)
      const mockModules: Module[] = [
        {
          id: '1',
          title: 'Getting Started',
          completed: false,
          lessons: [
            {
              id: '1-1',
              title: 'Course Introduction',
              type: 'video',
              duration: 300, // 5 minutes
              videoUrl: '/placeholder-video.mp4',
              completed: false,
              locked: false
            },
            {
              id: '1-2',
              title: 'Setting Up Your Environment',
              type: 'video',
              duration: 900, // 15 minutes
              videoUrl: '/placeholder-video.mp4',
              completed: false,
              locked: false
            },
            {
              id: '1-3',
              title: 'Course Resources',
              type: 'text',
              duration: 300,
              content: 'Welcome to the course! Here are the resources you\'ll need...',
              completed: false,
              locked: false
            }
          ]
        },
        {
          id: '2',
          title: 'Core Concepts',
          completed: false,
          lessons: [
            {
              id: '2-1',
              title: 'Understanding the Fundamentals',
              type: 'video',
              duration: 1500, // 25 minutes
              videoUrl: '/placeholder-video.mp4',
              completed: false,
              locked: true
            },
            {
              id: '2-2',
              title: 'Knowledge Check Quiz',
              type: 'quiz',
              duration: 600,
              completed: false,
              locked: true
            },
            {
              id: '2-3',
              title: 'Hands-on Practice',
              type: 'assignment',
              duration: 1800,
              completed: false,
              locked: true
            }
          ]
        },
        {
          id: '3',
          title: 'Advanced Topics',
          completed: false,
          lessons: [
            {
              id: '3-1',
              title: 'Advanced Techniques',
              type: 'video',
              duration: 2100, // 35 minutes
              videoUrl: '/placeholder-video.mp4',
              completed: false,
              locked: true
            },
            {
              id: '3-2',
              title: 'Final Project',
              type: 'assignment',
              duration: 2700,
              completed: false,
              locked: true
            }
          ]
        }
      ]

      setModules(mockModules)
      setCurrentLesson(mockModules[0].lessons[0])

    } catch (error) {
      console.error('Error loading course data:', error)
    } finally {
      setLoading(false)
    }
  }

  const markLessonComplete = (lessonId: string) => {
    setModules(prevModules => 
      prevModules.map(module => ({
        ...module,
        lessons: module.lessons.map(lesson => 
          lesson.id === lessonId ? { ...lesson, completed: true } : lesson
        )
      }))
    )

    // Unlock next lesson
    unlockNextLesson(lessonId)
  }

  const unlockNextLesson = (completedLessonId: string) => {
    setModules(prevModules => {
      const newModules = [...prevModules]
      let found = false
      
      for (let i = 0; i < newModules.length && !found; i++) {
        for (let j = 0; j < newModules[i].lessons.length; j++) {
          if (newModules[i].lessons[j].id === completedLessonId) {
            // Unlock next lesson
            if (j + 1 < newModules[i].lessons.length) {
              newModules[i].lessons[j + 1].locked = false
            } else if (i + 1 < newModules.length) {
              newModules[i + 1].lessons[0].locked = false
            }
            found = true
            break
          }
        }
      }
      
      return newModules
    })
  }

  const navigateToLesson = (moduleIndex: number, lessonIndex: number) => {
    const lesson = modules[moduleIndex]?.lessons[lessonIndex]
    if (lesson && !lesson.locked) {
      setCurrentLesson(lesson)
      setCurrentModuleIndex(moduleIndex)
      setCurrentLessonIndex(lessonIndex)
    }
  }

  const goToNextLesson = () => {
    const currentModule = modules[currentModuleIndex]
    if (currentLessonIndex + 1 < currentModule.lessons.length) {
      navigateToLesson(currentModuleIndex, currentLessonIndex + 1)
    } else if (currentModuleIndex + 1 < modules.length) {
      navigateToLesson(currentModuleIndex + 1, 0)
    }
  }

  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      navigateToLesson(currentModuleIndex, currentLessonIndex - 1)
    } else if (currentModuleIndex > 0) {
      const prevModule = modules[currentModuleIndex - 1]
      navigateToLesson(currentModuleIndex - 1, prevModule.lessons.length - 1)
    }
  }

  const getTotalLessons = () => {
    return modules.reduce((total, module) => total + module.lessons.length, 0)
  }

  const getCompletedLessons = () => {
    return modules.reduce((total, module) => 
      total + module.lessons.filter(lesson => lesson.completed).length, 0
    )
  }

  const getOverallProgress = () => {
    const total = getTotalLessons()
    const completed = getCompletedLessons()
    return total > 0 ? Math.round((completed / total) * 100) : 0
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    return `${minutes} min`
  }

  const getLessonIcon = (type: string, completed: boolean, locked: boolean) => {
    if (locked) return <Lock className="h-4 w-4 text-muted-foreground" />
    if (completed) return <CheckCircle className="h-4 w-4 text-green-600" />
    
    switch (type) {
      case 'video': return <Play className="h-4 w-4" />
      case 'text': return <FileText className="h-4 w-4" />
      case 'quiz': return <MessageCircle className="h-4 w-4" />
      case 'assignment': return <BookOpen className="h-4 w-4" />
      default: return <BookOpen className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    )
  }

  if (!course || !enrollment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-4">
            You don't have access to this course or it doesn't exist.
          </p>
          <Button asChild>
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden border-r bg-muted/30`}>
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg line-clamp-2">{course.title}</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{getOverallProgress()}%</span>
            </div>
            <Progress value={getOverallProgress()} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {getCompletedLessons()} of {getTotalLessons()} lessons completed
            </p>
          </div>
        </div>

        <div className="p-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          {modules.map((module, moduleIndex) => (
            <div key={module.id} className="space-y-2">
              <h3 className="font-medium text-sm">{module.title}</h3>
              <div className="space-y-1">
                {module.lessons.map((lesson, lessonIndex) => (
                  <button
                    key={lesson.id}
                    onClick={() => navigateToLesson(moduleIndex, lessonIndex)}
                    disabled={lesson.locked}
                    className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                      currentLesson?.id === lesson.id
                        ? 'bg-rose-100 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300'
                        : lesson.locked
                        ? 'text-muted-foreground cursor-not-allowed'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {getLessonIcon(lesson.type, lesson.completed, lesson.locked)}
                      <span className="flex-1 line-clamp-2">{lesson.title}</span>
                      <span className="text-xs">{formatDuration(lesson.duration)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
            <div>
              <h1 className="font-bold">{currentLesson?.title}</h1>
              <p className="text-sm text-muted-foreground">
                Module {currentModuleIndex + 1}, Lesson {currentLessonIndex + 1}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/courses/${course.id}`}>
                Course Details
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard">
                Dashboard
              </Link>
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">
          {currentLesson && (
            <div className="max-w-4xl mx-auto">
              {currentLesson.type === 'video' && currentLesson.videoUrl && (
                <VideoPlayer
                  videoUrl={currentLesson.videoUrl}
                  title={currentLesson.title}
                  duration={currentLesson.duration}
                  courseId={course.id}
                  lessonId={currentLesson.id}
                  onProgress={(progress) => {
                    if (progress >= 90 && !currentLesson.completed) {
                      markLessonComplete(currentLesson.id)
                    }
                  }}
                />
              )}

              {currentLesson.type === 'text' && (
                <Card>
                  <CardHeader>
                    <CardTitle>{currentLesson.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <p>{currentLesson.content}</p>
                    </div>
                    <div className="mt-6">
                      <Button onClick={() => markLessonComplete(currentLesson.id)}>
                        Mark as Complete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentLesson.type === 'quiz' && (
                <Card>
                  <CardHeader>
                    <CardTitle>{currentLesson.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      Test your knowledge with this quiz.
                    </p>
                    <Button>Start Quiz</Button>
                  </CardContent>
                </Card>
              )}

              {currentLesson.type === 'assignment' && (
                <Card>
                  <CardHeader>
                    <CardTitle>{currentLesson.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      Complete this assignment to practice what you've learned.
                    </p>
                    <div className="flex gap-2">
                      <Button>
                        <Download className="h-4 w-4 mr-2" />
                        Download Assignment
                      </Button>
                      <Button variant="outline">Submit Assignment</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={goToPreviousLesson}
                  disabled={currentModuleIndex === 0 && currentLessonIndex === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous Lesson
                </Button>
                <Button
                  onClick={goToNextLesson}
                  disabled={
                    currentModuleIndex === modules.length - 1 &&
                    currentLessonIndex === modules[currentModuleIndex]?.lessons.length - 1
                  }
                >
                  Next Lesson
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}