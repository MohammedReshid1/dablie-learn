import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/AuthContext"
import { courses, categories } from "@/lib/courses"
import { 
  Upload, 
  Plus, 
  Trash2, 
  GripVertical, 
  Play, 
  FileText, 
  HelpCircle,
  Save,
  Eye,
  Settings
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

interface Lesson {
  id: string
  title: string
  type: 'video' | 'text' | 'quiz'
  content?: string
  videoFile?: File
  duration?: number
  order: number
}

interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
  order: number
}

export default function CreateCoursePage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [allCategories, setAllCategories] = useState<any[]>([])
  
  // Course basic info
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category_id: '',
    price: '',
    level: 'beginner',
    duration_hours: '',
    image_url: '',
    is_published: false
  })

  // Course content
  const [modules, setModules] = useState<Module[]>([
    {
      id: '1',
      title: 'Introduction',
      description: 'Course introduction and overview',
      lessons: [],
      order: 1
    }
  ])

  const [currentStep, setCurrentStep] = useState(1)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setCourseData(prev => ({ ...prev, [field]: value }))
  }

  const addModule = () => {
    const newModule: Module = {
      id: Date.now().toString(),
      title: `Module ${modules.length + 1}`,
      description: '',
      lessons: [],
      order: modules.length + 1
    }
    setModules([...modules, newModule])
  }

  const updateModule = (moduleId: string, field: string, value: string) => {
    setModules(modules.map(module => 
      module.id === moduleId ? { ...module, [field]: value } : module
    ))
  }

  const deleteModule = (moduleId: string) => {
    setModules(modules.filter(module => module.id !== moduleId))
  }

  const addLesson = (moduleId: string) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId)
    if (moduleIndex === -1) return

    const newLesson: Lesson = {
      id: Date.now().toString(),
      title: 'New Lesson',
      type: 'video',
      order: modules[moduleIndex].lessons.length + 1
    }

    const updatedModules = [...modules]
    updatedModules[moduleIndex].lessons.push(newLesson)
    setModules(updatedModules)
  }

  const updateLesson = (moduleId: string, lessonId: string, field: string, value: any) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? {
            ...module,
            lessons: module.lessons.map(lesson =>
              lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
            )
          }
        : module
    ))
  }

  const deleteLesson = (moduleId: string, lessonId: string) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? {
            ...module,
            lessons: module.lessons.filter(lesson => lesson.id !== lessonId)
          }
        : module
    ))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImageFile(file)
      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setCourseData(prev => ({ ...prev, image_url: previewUrl }))
    }
  }

  const handleVideoUpload = (moduleId: string, lessonId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      updateLesson(moduleId, lessonId, 'videoFile', file)
      // Mock duration calculation
      updateLesson(moduleId, lessonId, 'duration', Math.floor(Math.random() * 1800) + 300)
    }
  }

  const saveDraft = async () => {
    setLoading(true)
    try {
      // In a real app, this would save to the database
      console.log('Saving draft...', { courseData, modules })
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('Draft saved successfully!')
    } catch (error) {
      console.error('Error saving draft:', error)
      alert('Error saving draft')
    } finally {
      setLoading(false)
    }
  }

  const publishCourse = async () => {
    setLoading(true)
    try {
      // Validate required fields
      if (!courseData.title || !courseData.description || !courseData.category_id) {
        alert('Please fill in all required fields')
        return
      }

      // In a real app, this would create the course in the database
      console.log('Publishing course...', { courseData, modules })
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert('Course published successfully!')
      navigate('/instructor/courses')
    } catch (error) {
      console.error('Error publishing course:', error)
      alert('Error publishing course')
    } finally {
      setLoading(false)
    }
  }

  const getStepProgress = () => {
    switch (currentStep) {
      case 1: return 25
      case 2: return 50
      case 3: return 75
      case 4: return 100
      default: return 0
    }
  }

  const getTotalDuration = () => {
    return modules.reduce((total, module) => 
      total + module.lessons.reduce((lessonTotal, lesson) => 
        lessonTotal + (lesson.duration || 0), 0
      ), 0
    )
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  return (
    <PageLayout>
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Create New Course</h1>
              <p className="text-muted-foreground mt-2">
                Build and publish your course to start teaching students worldwide
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={saveDraft} disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={publishCourse} disabled={loading}>
                {loading ? 'Publishing...' : 'Publish Course'}
              </Button>
            </div>
          </div>

          {/* Progress */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Course Creation Progress</h3>
                <span className="text-sm text-muted-foreground">Step {currentStep} of 4</span>
              </div>
              <Progress value={getStepProgress()} className="mb-4" />
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className={`text-center ${currentStep >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                  Basic Info
                </div>
                <div className={`text-center ${currentStep >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                  Course Content
                </div>
                <div className={`text-center ${currentStep >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                  Pricing & Settings
                </div>
                <div className={`text-center ${currentStep >= 4 ? 'text-primary' : 'text-muted-foreground'}`}>
                  Review & Publish
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Creation Steps */}
          <Tabs value={currentStep.toString()} onValueChange={(value) => setCurrentStep(Number(value))}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="1">Basic Info</TabsTrigger>
              <TabsTrigger value="2">Content</TabsTrigger>
              <TabsTrigger value="3">Settings</TabsTrigger>
              <TabsTrigger value="4">Review</TabsTrigger>
            </TabsList>

            {/* Step 1: Basic Information */}
            <TabsContent value="1" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="title">Course Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter your course title"
                      value={courseData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Course Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what students will learn in this course"
                      rows={4}
                      value={courseData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <select
                        id="category"
                        className="w-full px-3 py-2 border rounded-md bg-background"
                        value={courseData.category_id}
                        onChange={(e) => handleInputChange('category_id', e.target.value)}
                      >
                        <option value="">Select a category</option>
                        <option value="development">Development</option>
                        <option value="design">Design</option>
                        <option value="marketing">Marketing</option>
                        <option value="business">Business</option>
                        <option value="data-science">Data Science</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="level">Difficulty Level</Label>
                      <select
                        id="level"
                        className="w-full px-3 py-2 border rounded-md bg-background"
                        value={courseData.level}
                        onChange={(e) => handleInputChange('level', e.target.value)}
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="image">Course Thumbnail</Label>
                    <div className="mt-2">
                      {courseData.image_url ? (
                        <div className="relative">
                          <img
                            src={courseData.image_url}
                            alt="Course thumbnail"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              setCourseData(prev => ({ ...prev, image_url: '' }))
                              setImageFile(null)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <p className="text-muted-foreground mb-4">
                            Upload a course thumbnail (recommended: 1280x720)
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                          />
                          <Button asChild variant="outline">
                            <label htmlFor="image-upload" className="cursor-pointer">
                              Choose Image
                            </label>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => setCurrentStep(2)}>
                      Next: Add Content
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 2: Course Content */}
            <TabsContent value="2" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Course Modules</CardTitle>
                    <Button onClick={addModule} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Module
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {modules.map((module, moduleIndex) => (
                        <motion.div
                          key={module.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border rounded-lg p-4"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Module title"
                              value={module.title}
                              onChange={(e) => updateModule(module.id, 'title', e.target.value)}
                              className="font-medium"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteModule(module.id)}
                              disabled={modules.length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <Textarea
                            placeholder="Module description"
                            value={module.description}
                            onChange={(e) => updateModule(module.id, 'description', e.target.value)}
                            className="mb-4"
                            rows={2}
                          />

                          {/* Lessons */}
                          <div className="space-y-3">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <div key={lesson.id} className="bg-muted/50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-3">
                                  <div className="p-1 rounded bg-background">
                                    {lesson.type === 'video' && <Play className="h-4 w-4" />}
                                    {lesson.type === 'text' && <FileText className="h-4 w-4" />}
                                    {lesson.type === 'quiz' && <HelpCircle className="h-4 w-4" />}
                                  </div>
                                  <Input
                                    placeholder="Lesson title"
                                    value={lesson.title}
                                    onChange={(e) => updateLesson(module.id, lesson.id, 'title', e.target.value)}
                                    className="flex-1"
                                  />
                                  <select
                                    value={lesson.type}
                                    onChange={(e) => updateLesson(module.id, lesson.id, 'type', e.target.value)}
                                    className="px-2 py-1 border rounded text-sm bg-background"
                                  >
                                    <option value="video">Video</option>
                                    <option value="text">Text</option>
                                    <option value="quiz">Quiz</option>
                                  </select>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => deleteLesson(module.id, lesson.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>

                                {lesson.type === 'video' && (
                                  <div>
                                    <input
                                      type="file"
                                      accept="video/*"
                                      onChange={(e) => handleVideoUpload(module.id, lesson.id, e)}
                                      className="hidden"
                                      id={`video-${lesson.id}`}
                                    />
                                    <Button asChild variant="outline" size="sm">
                                      <label htmlFor={`video-${lesson.id}`} className="cursor-pointer">
                                        <Upload className="h-4 w-4 mr-2" />
                                        {lesson.videoFile ? 'Change Video' : 'Upload Video'}
                                      </label>
                                    </Button>
                                    {lesson.videoFile && (
                                      <p className="text-sm text-muted-foreground mt-2">
                                        {lesson.videoFile.name} ({formatDuration(lesson.duration || 0)})
                                      </p>
                                    )}
                                  </div>
                                )}

                                {lesson.type === 'text' && (
                                  <Textarea
                                    placeholder="Lesson content"
                                    value={lesson.content || ''}
                                    onChange={(e) => updateLesson(module.id, lesson.id, 'content', e.target.value)}
                                    rows={3}
                                  />
                                )}

                                {lesson.type === 'quiz' && (
                                  <div className="text-sm text-muted-foreground">
                                    Quiz builder will be available after saving the lesson
                                  </div>
                                )}
                              </div>
                            ))}

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addLesson(module.id)}
                              className="w-full"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Lesson
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Previous
                  </Button>
                  <Button onClick={() => setCurrentStep(3)}>
                    Next: Settings
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Step 3: Pricing & Settings */}
            <TabsContent value="3" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Course Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="0.00"
                        value={courseData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Set to 0 for free course
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="duration">Estimated Duration (hours)</Label>
                      <Input
                        id="duration"
                        type="number"
                        placeholder="0"
                        value={courseData.duration_hours}
                        onChange={(e) => handleInputChange('duration_hours', e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Current content: {formatDuration(getTotalDuration())}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Course Features</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="certificate" defaultChecked />
                        <Label htmlFor="certificate">Certificate of completion</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="lifetime" defaultChecked />
                        <Label htmlFor="lifetime">Lifetime access</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="mobile" defaultChecked />
                        <Label htmlFor="mobile">Mobile access</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="resources" defaultChecked />
                        <Label htmlFor="resources">Downloadable resources</Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep(2)}>
                      Previous
                    </Button>
                    <Button onClick={() => setCurrentStep(4)}>
                      Next: Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 4: Review & Publish */}
            <TabsContent value="4" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Course</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">Course Overview</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Title:</span>
                          <span className="font-medium">{courseData.title || 'Not set'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Category:</span>
                          <span className="font-medium">{courseData.category_id || 'Not set'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Level:</span>
                          <span className="font-medium capitalize">{courseData.level}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Price:</span>
                          <span className="font-medium">
                            {courseData.price ? `$${courseData.price}` : 'Free'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Content Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Modules:</span>
                          <span className="font-medium">{modules.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Lessons:</span>
                          <span className="font-medium">
                            {modules.reduce((total, module) => total + module.lessons.length, 0)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Duration:</span>
                          <span className="font-medium">{formatDuration(getTotalDuration())}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Videos:</span>
                          <span className="font-medium">
                            {modules.reduce((total, module) => 
                              total + module.lessons.filter(lesson => lesson.type === 'video').length, 0
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {courseData.image_url && (
                    <div>
                      <h3 className="font-medium mb-3">Course Thumbnail</h3>
                      <img
                        src={courseData.image_url}
                        alt="Course thumbnail"
                        className="w-full max-w-md h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Ready to Publish?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Once published, your course will be available to students. You can always edit it later.
                    </p>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        className="rounded"
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the instructor terms and conditions
                      </Label>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep(3)}>
                      Previous
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={saveDraft} disabled={loading}>
                        Save as Draft
                      </Button>
                      <Button onClick={publishCourse} disabled={loading}>
                        {loading ? 'Publishing...' : 'Publish Course'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  )
}