"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { InstructorShell } from "@/components/instructor-shell"
import { ArrowLeft, ArrowRight, Check, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useMediaQuery } from "@/hooks/use-media-query"
import { CourseBasics } from "@/components/course-wizard/course-basics"
import { CourseCurriculum } from "@/components/course-wizard/course-curriculum"
import CourseAssessments from "@/components/course-wizard/course-assessments"
import { CourseMedia } from "@/components/course-wizard/course-media"
import CourseSettings from "@/components/course-wizard/course-settings"

const steps = [
  { id: "basics", label: "Course Basics" },
  { id: "curriculum", label: "Curriculum" },
  { id: "assessments", label: "Assessments" },
  { id: "media", label: "Media" },
  { id: "settings", label: "Settings" },
]

export default function CreateCoursePage() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(20)
  const [activeTab, setActiveTab] = useState(steps[0].id)
  const isMobile = useMediaQuery("(max-width: 640px)")

  const [courseData, setCourseData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    level: "",
    price: 0,
    curriculum: { sections: [] },
    assessments: { quizzes: [], assignments: [] },
    media: {
      thumbnail: null,
      previewVideo: null,
    },
    settings: {
      isPublished: false,
      allowComments: true,
      requireCompletionInOrder: true,
    },
  })

  const handleNext = () => {
    const nextStep = currentStep + 1
    if (nextStep < steps.length) {
      setCurrentStep(nextStep)
      setActiveTab(steps[nextStep].id)
      setProgress((nextStep + 1) * (100 / steps.length))
    }
  }

  const handlePrevious = () => {
    const prevStep = currentStep - 1
    if (prevStep >= 0) {
      setCurrentStep(prevStep)
      setActiveTab(steps[prevStep].id)
      setProgress((prevStep + 1) * (100 / steps.length))
    }
  }

  const handleSaveDraft = () => {
    toast({
      title: "Course draft saved",
      description: "Your course has been saved as a draft.",
    })
  }

  const handlePublish = () => {
    toast({
      title: "Course published",
      description: "Your course has been published successfully!",
    })
  }

  const updateCourseData = (stepId: string, data: any) => {
    setCourseData((prev) => ({
      ...prev,
      [stepId]: data,
    }))
  }

  return (
    <InstructorShell>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create New Course</h1>
            <p className="text-muted-foreground">Complete all steps to create and publish your course</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button
              onClick={handlePublish}
              className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
            >
              <Check className="mr-2 h-4 w-4" />
              Publish Course
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              {!isMobile && (
                <TabsList className="grid grid-cols-5 w-full">
                  {steps.map((step, index) => (
                    <TabsTrigger
                      key={step.id}
                      value={step.id}
                      disabled={index > currentStep}
                      onClick={() => {
                        setCurrentStep(index)
                        setProgress((index + 1) * (100 / steps.length))
                      }}
                    >
                      {step.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              )}

              <TabsContent value="basics" className="space-y-6 mt-0">
                <CourseBasics formData={courseData} updateFormData={(data) => updateCourseData("basics", data)} />
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-6 mt-0">
                <CourseCurriculum
                  formData={courseData.curriculum}
                  updateFormData={(data) => updateCourseData("curriculum", data)}
                />
              </TabsContent>

              <TabsContent value="assessments" className="space-y-6 mt-0">
                <CourseAssessments
                  formData={courseData.assessments}
                  updateFormData={(data) => updateCourseData("assessments", data)}
                />
              </TabsContent>

              <TabsContent value="media" className="space-y-6 mt-0">
                <CourseMedia formData={courseData.media} updateFormData={(data) => updateCourseData("media", data)} />
              </TabsContent>

              <TabsContent value="settings" className="space-y-6 mt-0">
                <CourseSettings data={courseData.settings} updateData={(data: any) => updateCourseData("settings", data)} />
              </TabsContent>
            </Tabs>

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handlePublish}
                  className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Complete & Publish
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </InstructorShell>
  )
}
