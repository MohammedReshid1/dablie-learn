import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Users, Clock, Globe, Award, Play, Download, Share2, Heart, CheckCircle } from "lucide-react"
import { courses } from "@/lib/courses"
import { useAuth } from "@/contexts/AuthContext"
import { motion } from "framer-motion"

export default function CourseDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [course, setCourse] = useState<any>(null)
  const [enrollment, setEnrollment] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)

  useEffect(() => {
    if (id) {
      loadCourseData()
    }
  }, [id, user])

  const loadCourseData = async () => {
    if (!id) return

    try {
      const courseResult = await courses.getCourseById(id)
      if (courseResult.data) {
        setCourse(courseResult.data)
        
        // Check if user is enrolled
        if (user) {
          const enrollmentResult = await courses.checkEnrollment(id, user.id)
          if (enrollmentResult.data) {
            setEnrollment(enrollmentResult.data)
          }
        }
      }
    } catch (error) {
      console.error('Error loading course:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = async () => {
    if (!user || !course) return

    setEnrolling(true)
    try {
      const { data, error } = await courses.enrollInCourse(course.id, user.id)
      if (data && !error) {
        setEnrollment(data)
      }
    } catch (error) {
      console.error('Error enrolling:', error)
    } finally {
      setEnrolling(false)
    }
  }

  if (loading) {
    return (
      <PageLayout>
        <div className="container py-8">
          <div className="text-center">Loading course...</div>
        </div>
      </PageLayout>
    )
  }

  if (!course) {
    return (
      <PageLayout>
        <div className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
            <Button asChild>
              <Link to="/courses">Back to Courses</Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    )
  }

  const curriculum = [
    {
      title: "Getting Started",
      lessons: [
        { title: "Course Introduction", duration: "5 min", type: "video" },
        { title: "Setting Up Your Environment", duration: "15 min", type: "video" },
        { title: "Your First Project", duration: "20 min", type: "video" }
      ]
    },
    {
      title: "Core Concepts",
      lessons: [
        { title: "Understanding the Fundamentals", duration: "25 min", type: "video" },
        { title: "Hands-on Practice", duration: "30 min", type: "exercise" },
        { title: "Common Patterns", duration: "20 min", type: "video" }
      ]
    },
    {
      title: "Advanced Topics",
      lessons: [
        { title: "Advanced Techniques", duration: "35 min", type: "video" },
        { title: "Real-world Project", duration: "45 min", type: "project" },
        { title: "Best Practices", duration: "15 min", type: "video" }
      ]
    }
  ]

  const reviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Excellent course! The instructor explains everything clearly and the projects are very practical.",
      date: "2 weeks ago"
    },
    {
      name: "Mike Chen",
      rating: 5,
      comment: "This course helped me land my dream job. Highly recommended!",
      date: "1 month ago"
    },
    {
      name: "Emily Davis",
      rating: 4,
      comment: "Great content and well-structured. Would love to see more advanced topics covered.",
      date: "3 weeks ago"
    }
  ]

  return (
    <PageLayout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-rose-50 to-orange-50 dark:from-neutral-900 dark:to-neutral-800 py-12">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="mb-4">
                  <Badge variant="outline" className="mb-2">
                    {course.categories?.name}
                  </Badge>
                  {course.is_bestseller && (
                    <Badge className="ml-2 bg-gradient-to-r from-amber-500 to-orange-500 border-none">
                      Bestseller
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
                
                <p className="text-lg text-muted-foreground mb-6">
                  {course.description || "Master the skills you need to succeed in this comprehensive course designed for all skill levels."}
                </p>

                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400 mr-1" />
                    <span className="font-medium mr-1">4.8</span>
                    <span className="text-muted-foreground">(1,234 reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-muted-foreground mr-1" />
                    <span>15,234 students</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-muted-foreground mr-1" />
                    <span>{course.duration_hours} hours</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-muted-foreground mr-1" />
                    <span>English</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={course.profiles?.avatar_url || "/placeholder.svg?height=50&width=50"}
                    alt={course.profiles?.full_name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{course.profiles?.full_name}</div>
                    <div className="text-sm text-muted-foreground">Course Instructor</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardContent className="p-6">
                    <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={course.image_url || "/placeholder.svg?height=400&width=600"}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="text-3xl font-bold mb-4">${course.price}</div>
                    
                    {enrollment ? (
                      <div className="space-y-3">
                        <div className="flex items-center text-green-600 mb-2">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          <span className="font-medium">You're enrolled!</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2 mb-2">
                          <div
                            className="bg-gradient-to-r from-rose-500 to-orange-500 h-2 rounded-full"
                            style={{ width: `${enrollment.progress}%` }}
                          />
                        </div>
                        <div className="text-sm text-muted-foreground mb-4">
                          Progress: {enrollment.progress}%
                        </div>
                        <Button asChild className="w-full">
                          <Link to={`/courses/${course.id}/learn`}>
                            {enrollment.progress === 0 ? 'Start Learning' : 'Continue Learning'}
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {user ? (
                          <Button
                            onClick={handleEnroll}
                            disabled={enrolling}
                            className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                          >
                            {enrolling ? 'Enrolling...' : 'Enroll Now'}
                          </Button>
                        ) : (
                          <Button asChild className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600">
                            <Link to="/login">Sign in to Enroll</Link>
                          </Button>
                        )}
                        <Button variant="outline" className="w-full">
                          Add to Wishlist
                        </Button>
                      </div>
                    )}

                    <div className="mt-6 space-y-3 text-sm">
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Certificate of completion</span>
                      </div>
                      <div className="flex items-center">
                        <Download className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Downloadable resources</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Lifetime access</span>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Course Content */}
        <section className="py-12">
          <div className="container">
            <div className="max-w-4xl">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-8">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          "Master the fundamentals and advanced concepts",
                          "Build real-world projects from scratch",
                          "Learn industry best practices and standards",
                          "Develop problem-solving skills",
                          "Understand modern development workflows",
                          "Create a professional portfolio"
                        ].map((item, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                      <ul className="space-y-2">
                        <li>• Basic computer skills</li>
                        <li>• No prior experience required</li>
                        <li>• A computer with internet connection</li>
                        <li>• Willingness to learn and practice</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold mb-4">Description</h2>
                      <div className="prose max-w-none">
                        <p>
                          This comprehensive course is designed to take you from beginner to advanced level. 
                          You'll learn through hands-on projects, real-world examples, and expert guidance.
                        </p>
                        <p>
                          Our structured approach ensures you build a solid foundation before moving to 
                          advanced topics. Each section includes practical exercises and projects to 
                          reinforce your learning.
                        </p>
                        <p>
                          By the end of this course, you'll have the skills and confidence to tackle 
                          real-world challenges and advance your career.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="curriculum" className="mt-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">Course Curriculum</h2>
                      <div className="text-sm text-muted-foreground">
                        {curriculum.reduce((acc, section) => acc + section.lessons.length, 0)} lessons • 
                        {course.duration_hours} hours total
                      </div>
                    </div>

                    <div className="space-y-4">
                      {curriculum.map((section, sectionIndex) => (
                        <Card key={sectionIndex}>
                          <CardHeader>
                            <CardTitle className="text-lg">
                              Section {sectionIndex + 1}: {section.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {section.lessons.map((lesson, lessonIndex) => (
                                <div key={lessonIndex} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
                                  <div className="flex items-center">
                                    <Play className="h-4 w-4 mr-3 text-muted-foreground" />
                                    <span>{lesson.title}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-xs">
                                      {lesson.type}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">
                                      {lesson.duration}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="instructor" className="mt-8">
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <img
                          src={course.profiles?.avatar_url || "/placeholder.svg?height=100&width=100"}
                          alt={course.profiles?.full_name}
                          className="w-24 h-24 rounded-full"
                        />
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-2">{course.profiles?.full_name}</h3>
                          <p className="text-muted-foreground mb-4">Senior Developer & Instructor</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="text-center">
                              <div className="font-bold text-lg">4.8</div>
                              <div className="text-sm text-muted-foreground">Instructor Rating</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-lg">2,345</div>
                              <div className="text-sm text-muted-foreground">Reviews</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-lg">25,678</div>
                              <div className="text-sm text-muted-foreground">Students</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-lg">12</div>
                              <div className="text-sm text-muted-foreground">Courses</div>
                            </div>
                          </div>

                          <div className="prose max-w-none">
                            <p>
                              With over 10 years of industry experience, I'm passionate about teaching 
                              and helping students achieve their goals. I've worked with leading tech 
                              companies and have trained thousands of developers worldwide.
                            </p>
                            <p>
                              My teaching philosophy focuses on practical, hands-on learning that 
                              prepares you for real-world challenges.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="mt-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">Student Reviews</h2>
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        <span className="font-bold">4.8</span>
                        <span className="text-muted-foreground">(1,234 reviews)</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {reviews.map((review, index) => (
                        <Card key={index}>
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 flex items-center justify-center text-white font-medium">
                                  {review.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="font-medium">{review.name}</div>
                                  <div className="text-sm text-muted-foreground">{review.date}</div>
                                </div>
                              </div>
                              <div className="flex">
                                {Array(review.rating).fill(null).map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-muted-foreground">{review.comment}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="text-center">
                      <Button variant="outline">Load More Reviews</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}